#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
osascript <<OSEOF
tell application "Terminal"
    do script "cd '$SCRIPT_DIR' && bash start.sh; exec bash"
    activate
end tell
OSEOF
