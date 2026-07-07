@echo off
cd /d %~dp0
start "Tea More PWA" http://localhost:4173
py -m http.server 4173
