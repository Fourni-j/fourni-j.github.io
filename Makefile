new-app:
	@echo "Creating new app page..."
	@read -p "App Name: " app_name; \
	read -p "App ID (from App Store): " app_id; \
	read -p "Create app page? (y/n): " create_app; \
	read -p "Create privacy policy? (y/n): " create_privacy; \
	read -p "Create terms? (y/n): " create_terms; \
	read -p "Create changelog? (y/n): " create_changelog; \
	if [ "$$create_app" = "y" ]; then \
		read -p "Show Hero section? (y/n): " show_hero; \
		read -p "Show Features section? (y/n): " show_features; \
		read -p "Show Testimonials section? (y/n): " show_testimonials; \
		read -p "Show Screenshots section? (y/n): " show_screenshots; \
		read -p "Show FAQ section? (y/n): " show_faq; \
	fi; \
	app_dir="_apps-pages/$$app_name"; \
	mkdir -p "$$app_dir"; \
	if [ "$$create_app" = "y" ]; then \
		cp _template/app-page/index.md "$$app_dir/index.md"; \
		sed -i '' "s/app_name: /app_name: $$app_name/" "$$app_dir/index.md"; \
		sed -i '' "s/ios_app_id: /ios_app_id: $$app_id/" "$$app_dir/index.md"; \
		if [ "$$create_privacy" = "y" ]; then \
			sed -i '' "s/privacypolicy: false/privacypolicy: true/" "$$app_dir/index.md"; \
		fi; \
		if [ "$$create_terms" = "y" ]; then \
			sed -i '' "s/terms: false/terms: true/" "$$app_dir/index.md"; \
		fi; \
		if [ "$$create_changelog" = "y" ]; then \
			sed -i '' "s/changelog: false/changelog: true/" "$$app_dir/index.md"; \
		fi; \
		if [ "$$show_hero" = "y" ]; then \
			sed -i '' "s/show_hero: true/show_hero: true/" "$$app_dir/index.md"; \
		else \
			sed -i '' "s/show_hero: true/show_hero: false/" "$$app_dir/index.md"; \
		fi; \
		if [ "$$show_features" = "y" ]; then \
			sed -i '' "s/show_features: true/show_features: true/" "$$app_dir/index.md"; \
		else \
			sed -i '' "s/show_features: true/show_features: false/" "$$app_dir/index.md"; \
		fi; \
		if [ "$$show_testimonials" = "y" ]; then \
			sed -i '' "s/show_testimonials: false/show_testimonials: true/" "$$app_dir/index.md"; \
		fi; \
		if [ "$$show_screenshots" = "y" ]; then \
			sed -i '' "s/show_screenshots: false/show_screenshots: true/" "$$app_dir/index.md"; \
		fi; \
		if [ "$$show_faq" = "y" ]; then \
			sed -i '' "s/show_faq: false/show_faq: true/" "$$app_dir/index.md"; \
		fi; \
	else \
		cp _template/app-page/redirect-index.md "$$app_dir/index.md"; \
		sed -i '' "s/APP_NAME/$$app_name/g" "$$app_dir/index.md"; \
	fi; \
	if [ "$$create_privacy" = "y" ]; then \
		cp _template/app-page/privacypolicy.md "$$app_dir/privacypolicy.md"; \
		sed -i '' "s/ios_app_id: /ios_app_id: $$app_id/" "$$app_dir/privacypolicy.md"; \
	fi; \
	if [ "$$create_terms" = "y" ]; then \
		cp _template/app-page/terms.md "$$app_dir/terms.md"; \
		sed -i '' "s/ios_app_id: /ios_app_id: $$app_id/" "$$app_dir/terms.md"; \
		sed -i '' "s/app_name: /app_name: $$app_name/" "$$app_dir/terms.md"; \
		sed -i '' "s/\[APP_NAME\]/$$app_name/g" "$$app_dir/terms.md"; \
	fi; \
	if [ "$$create_changelog" = "y" ]; then \
		cp _template/app-page/changelog.md "$$app_dir/changelog.md"; \
		sed -i '' "s/ios_app_id: /ios_app_id: $$app_id/" "$$app_dir/changelog.md"; \
	fi; \
	echo "App page created successfully in $$app_dir"
