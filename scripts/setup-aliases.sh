#!/bin/bash

# Setup script for convenient git automation aliases
# Run this once to add aliases to your shell profile

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔧 Setting up MVK Developer Portfolio aliases...${NC}"

# Detect shell type
SHELL_TYPE=""
if [ -n "$ZSH_VERSION" ]; then
    SHELL_TYPE="zsh"
    PROFILE_FILE="$HOME/.zshrc"
elif [ -n "$BASH_VERSION" ]; then
    SHELL_TYPE="bash"
    PROFILE_FILE="$HOME/.bashrc"
else
    echo -e "${YELLOW}⚠️  Could not detect shell type. Please add aliases manually.${NC}"
    exit 1
fi

echo -e "${BLUE}📝 Detected $SHELL_TYPE shell, updating $PROFILE_FILE${NC}"

# Get the current directory (project root)
PROJECT_ROOT=$(pwd)

# Aliases to add
ALIASES="
# MVK Developer Portfolio - Auto Deploy Aliases (Added $(date))
alias mvk-deploy='$PROJECT_ROOT/scripts/auto-deploy.sh'
alias mvk-deploy-msg='$PROJECT_ROOT/scripts/auto-deploy.sh'
alias mvk-quick='cd \"$PROJECT_ROOT\" && ./scripts/auto-deploy.sh \"⚡ Quick update: \$(date +\"%H:%M\")\"'
alias mvk-dev='cd \"$PROJECT_ROOT/homepage\" && npm start'
alias mvk-build='cd \"$PROJECT_ROOT/homepage\" && npm run build'
alias mvk-goto='cd \"$PROJECT_ROOT\"'

# Quick git operations
alias mvk-status='cd \"$PROJECT_ROOT\" && git status'
alias mvk-log='cd \"$PROJECT_ROOT\" && git log --oneline -10'
alias mvk-branches='cd \"$PROJECT_ROOT\" && git branch -a'
"

# Check if aliases already exist
if grep -q "MVK Developer Portfolio" "$PROFILE_FILE" 2>/dev/null; then
    echo -e "${YELLOW}⚠️  Aliases already exist in $PROFILE_FILE${NC}"
    echo -e "${BLUE}ℹ️  Use 'source $PROFILE_FILE' to reload them${NC}"
else
    # Add aliases to profile
    echo "$ALIASES" >> "$PROFILE_FILE"
    echo -e "${GREEN}✅ Aliases added to $PROFILE_FILE${NC}"
fi

echo -e "${BLUE}🎉 Setup complete! Available commands:${NC}"
echo -e "${GREEN}  mvk-deploy${NC}           - Auto deploy with timestamp"
echo -e "${GREEN}  mvk-deploy-msg \"msg\"${NC}   - Auto deploy with custom message"
echo -e "${GREEN}  mvk-quick${NC}            - Quick deploy with time stamp"
echo -e "${GREEN}  mvk-dev${NC}              - Start development server"
echo -e "${GREEN}  mvk-build${NC}            - Build for production"
echo -e "${GREEN}  mvk-goto${NC}             - Navigate to project directory"
echo -e "${GREEN}  mvk-status${NC}           - Check git status"
echo -e "${GREEN}  mvk-log${NC}              - View recent commits"
echo -e "${GREEN}  mvk-branches${NC}         - List all branches"

echo ""
echo -e "${YELLOW}📋 To activate the aliases in your current session:${NC}"
echo -e "${BLUE}   source $PROFILE_FILE${NC}"
echo ""
echo -e "${YELLOW}📋 Or restart your terminal${NC}"

# Source the profile to make aliases available immediately
if [ "$1" != "--no-source" ]; then
    echo -e "${BLUE}🔄 Loading aliases into current session...${NC}"
    # shellcheck source=/dev/null
    source "$PROFILE_FILE"
    echo -e "${GREEN}✅ Aliases are now available!${NC}"
fi 