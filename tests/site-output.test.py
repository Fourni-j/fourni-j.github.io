"""Check the built site's public URLs, metadata, and dependency loading.

Usage: python3 tests/site-output.test.py _site
Uses only Python's standard library; run after a production Jekyll build.
"""

import json
import sys
import unittest
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse


ROOT = Path(sys.argv.pop(1) if len(sys.argv) > 1 else "_site").resolve()
ORIGIN = "https://cafournier.com"


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.path = path
        self.titles = []
        self.descriptions = []
        self.canonicals = []
        self.alternates = {}
        self.schemas = []
        self.references = []
        self.scripts = []
        self.classes = []
        self.robots = ""
        self.refresh = ""
        self.h1_count = 0
        self.capture = None
        self.feed(path.read_text(encoding="utf-8"))

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if tag == "body":
            self.classes = attrs.get("class", "").split()
        if tag == "h1":
            self.h1_count += 1
        if tag == "title":
            self.capture = ("title", [])
        if tag == "meta":
            if attrs.get("name") == "description":
                self.descriptions.append(attrs.get("content", ""))
            if attrs.get("name") == "robots":
                self.robots = attrs.get("content", "")
            if attrs.get("http-equiv", "").lower() == "refresh":
                self.refresh = attrs.get("content", "")
        if tag == "link":
            if attrs.get("rel") == "canonical":
                self.canonicals.append(attrs.get("href", ""))
            if attrs.get("hreflang"):
                self.alternates[attrs["hreflang"]] = attrs.get("href", "")
        if tag == "script":
            if attrs.get("src"):
                self.scripts.append(attrs["src"])
            if attrs.get("type") == "application/ld+json":
                self.capture = ("script", [])
        if tag in ("a", "link", "img", "script"):
            reference = attrs.get("href", attrs.get("src", ""))
            if reference:
                self.references.append(reference)

    def handle_data(self, data):
        if self.capture:
            self.capture[1].append(data)

    def handle_endtag(self, tag):
        if self.capture and self.capture[0] == tag:
            value = "".join(self.capture[1]).strip()
            (self.titles if tag == "title" else self.schemas).append(value)
            self.capture = None


class SiteOutputTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        if not (ROOT / "index.html").is_file():
            raise RuntimeError(f"Build the site first: no index.html in {ROOT}")
        cls.pages = [Page(path) for path in sorted(ROOT.rglob("*.html"))]
        sitemap = ET.parse(ROOT / "sitemap.xml")
        cls.locations = {
            item.text for item in sitemap.findall(
                ".//{http://www.sitemaps.org/schemas/sitemap/0.9}loc"
            )
        }

    def test_private_files_are_not_published(self):
        for name in ("AGENTS", "CLAUDE"):
            for extension in ("md", "html"):
                self.assertEqual(list(ROOT.rglob(f"{name}.{extension}")), [])

    def test_local_links_and_assets_resolve(self):
        for page in self.pages:
            for reference in page.references:
                url = urlparse(reference)
                if url.scheme not in ("", "http", "https"):
                    continue
                if url.netloc and url.netloc != "cafournier.com":
                    continue
                if not url.path:
                    continue
                path = unquote(url.path)
                with self.subTest(page=page.path.relative_to(ROOT), url=reference):
                    if "/tag/" in "/" + path.lstrip("/"):
                        self.assertFalse(any(char.isspace() for char in path))
                    target = ROOT / path.lstrip("/") if path.startswith("/") else page.path.parent / path
                    # GitHub Pages also serves .html files at extensionless URLs.
                    candidates = (target, target / "index.html", Path(str(target) + ".html"))
                    self.assertTrue(any(candidate.is_file() for candidate in candidates))

    def test_app_metadata_is_static_and_canonical(self):
        for page in self.pages:
            with self.subTest(page=page.path.relative_to(ROOT)):
                for schema in page.schemas:
                    self.assertIsInstance(json.loads(schema), (dict, list))
                if "modern-layout" not in page.classes:
                    continue
                self.assertEqual(len(page.titles), 1)
                self.assertTrue(page.titles[0])
                self.assertEqual(len(page.descriptions), 1)
                self.assertTrue(page.descriptions[0].strip())
                self.assertEqual(len(page.canonicals), 1)
                self.assertIn(page.canonicals[0], self.locations)
                self.assertTrue(page.canonicals[0].startswith(ORIGIN + "/"))

    def test_fridgebuddy_translations_are_reciprocal(self):
        pages = [page for page in self.pages if page.path.is_relative_to(ROOT / "fridgebuddy")]
        self.assertGreaterEqual(len(pages), 24)
        canonical_pages = {page.canonicals[0]: page for page in pages}
        self.assertEqual(len(canonical_pages), len(pages))
        self.assertEqual(len({page.titles[0] for page in pages}), len(pages))
        for page in pages:
            with self.subTest(page=page.path.relative_to(ROOT)):
                self.assertEqual(page.h1_count, 1)
                self.assertTrue(page.schemas)
                self.assertEqual(set(page.alternates), {"en", "fr", "de", "x-default"})
                self.assertEqual(page.alternates["x-default"], page.alternates["en"])
                self.assertIn(page.canonicals[0], page.alternates.values())
                for alternate in page.alternates.values():
                    self.assertIn(alternate, canonical_pages)
                    self.assertEqual(canonical_pages[alternate].alternates, page.alternates)

    def test_redirects_have_fallbacks_and_are_not_indexed(self):
        redirects = [page for page in self.pages if page.refresh]
        self.assertTrue(redirects)
        for page in redirects:
            with self.subTest(page=page.path.relative_to(ROOT)):
                self.assertIn("noindex", page.robots)
                self.assertEqual(len(page.canonicals), 1)
                destination = page.canonicals[0]
                self.assertTrue(destination.startswith("https://apps.apple.com/app/id") or destination == ORIGIN + "/apps/")
                self.assertIn(destination, page.references)
                self.assertEqual(page.refresh, "0; url=" + destination)
                source_url = ORIGIN + "/" + page.path.relative_to(ROOT).as_posix().removesuffix("index.html")
                self.assertNotIn(source_url, self.locations)

    def test_jquery_is_current_and_loaded_once(self):
        for page in self.pages:
            scripts = [src for src in page.scripts if "jquery" in src.lower()]
            with self.subTest(page=page.path.relative_to(ROOT)):
                self.assertLessEqual(len(scripts), 1)
                for src in scripts:
                    self.assertEqual(src, "/assets/js/jquery-4.0.0.min.js")
                if page.path.is_relative_to(ROOT / "fridgebuddy"):
                    self.assertEqual(scripts, [])


if __name__ == "__main__":
    unittest.main()
