@echo off
setlocal enabledelayedexpansion
title Ember - Burnout Assessment
color 0A

cd /d "%~dp0"

echo.
echo  ================================
echo   Ember: Burnout Assessment
echo  ================================
echo.

node --version >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo  [ERROR] Node.js is not installed.
    echo.
    echo  Download it from: https://nodejs.org/en/download
    echo  Then relaunch this file.
    echo.
    pause
    exit /b 1
)

for /f %%i in ('node --version') do set NODE_VER=%%i
echo  Node.js %NODE_VER% found.
echo.

if not exist "node_modules" (
    echo  Installing dependencies for the first time...
    echo  This takes 1-2 minutes. Please wait.
    echo.
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo  [ERROR] npm install failed. Check your internet connection.
        echo.
        pause
        exit /b 1
    )
    echo.
    echo  Done! Dependencies installed.
    echo.
)

echo  Launching Ember...
echo  Opening http://localhost:3000 in your browser shortly.
echo.
echo  To stop: close this window or press Ctrl+C
echo.

start "" cmd /c "timeout /t 4 /nobreak >nul && start http://localhost:3000"

call npm run dev

pause
