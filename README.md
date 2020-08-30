# About

Repository of [cafournier.com](https://cafournier.com)

## Generate new app page

Use the makefile to generate a new app page

```bash
APP_NAME=test make new-app
```

## Optimize video assets for app pages

```
ffmpeg -i input.mp4 -vcodec h264 -acodec mp2 output.mp4
```