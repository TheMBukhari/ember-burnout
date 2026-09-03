#!/bin/bash
GREEN='\033[0;32m'
CYAN='\033[0;36m'
RED='\033[0;31m'
RESET='\033[0m'

cd "$(dirname "$0")"

echo ""
echo -e "${CYAN} ================================"
echo -e "   Ember: Burnout Assessment"
echo -e " ================================${RESET}"
echo ""

if ! command -v node &> /dev/null; then
    echo -e "${RED} [ERROR] Node.js is not installed.${RESET}"
    echo " Download it from: https://nodejs.org"
    exit 1
fi

echo -e " Node.js $(node --version) found."
echo ""

if [ ! -d "node_modules" ]; then
    echo " Installing dependencies (first run only)..."
    npm install
    echo -e "${GREEN} Done!${RESET}"
    echo ""
fi

echo " Launching Ember at http://localhost:3000"
echo " Press Ctrl+C to stop."
echo ""

(sleep 4 && {
    if [[ "$OSTYPE" == "darwin"* ]]; then open "http://localhost:3000"
    elif command -v xdg-open &> /dev/null; then xdg-open "http://localhost:3000"
    fi
}) &

npm run dev
