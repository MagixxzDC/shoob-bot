@echo off
cd /d "C:\Users\dalto\Downloads\DiscordBotTesting"

echo ===== DEPLOY START =====
node deploy-commands.js
echo Deploy exit code: %errorlevel%

echo.
echo ===== DEV START =====
npm run dev
echo Dev exit code: %errorlevel%

echo.
pause