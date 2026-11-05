@echo off
title Escape Room: Full Stack Application Launcher
echo ==================================================
echo   Starting Escape Room Backend API & Frontend...
echo ==================================================
echo.

echo [INFO] Starting Backend API Server (Node.js + Express + MySQL on Port 5000)...
start "Escape Room Backend API" cmd /k "cd /d %~dp0backend && npm start"

timeout /t 2 /nobreak >nul

echo [INFO] Starting Frontend Game Server (Port 3000)...
start "Escape Room Game UI" cmd /k "cd /d %~dp0 && node server.js"

echo.
echo ==================================================
echo 🚀 Both Backend API (Port 5000) & Frontend UI (Port 3000) are running!
echo 👉 Open http://localhost:3000/ in your browser.
echo ==================================================
echo.
pause
