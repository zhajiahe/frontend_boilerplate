#!/bin/bash

# Frontend Template Project Initializer
# Usage: ./scripts/init-project.sh [project-name]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Frontend Template Project Initializer${NC}"
echo ""

# Get project name
if [ -z "$1" ]; then
    read -p "Enter project name: " PROJECT_NAME
else
    PROJECT_NAME="$1"
fi

# Validate project name
if [ -z "$PROJECT_NAME" ]; then
    echo -e "${RED}Error: Project name is required${NC}"
    exit 1
fi

# Convert to lowercase and replace spaces with dashes
PROJECT_NAME=$(echo "$PROJECT_NAME" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

echo -e "${YELLOW}Initializing project: ${PROJECT_NAME}${NC}"
echo ""

# Update package.json
echo -e "${GREEN}✓${NC} Updating package.json..."
if command -v jq &> /dev/null; then
    # Use jq if available
    jq --arg name "$PROJECT_NAME" '.name = $name | .version = "0.1.0"' package.json > package.json.tmp
    mv package.json.tmp package.json
else
    # Fallback to sed
    sed -i "s/\"name\": \"template\"/\"name\": \"$PROJECT_NAME\"/" package.json
    sed -i 's/"version": "[^"]*"/"version": "0.1.0"/' package.json
fi

# Update index.html title
echo -e "${GREEN}✓${NC} Updating index.html title..."
TITLE_CASE_NAME=$(echo "$PROJECT_NAME" | sed 's/-/ /g' | sed 's/\b\(.\)/\u\1/g')
sed -i "s/<title>.*<\/title>/<title>$TITLE_CASE_NAME<\/title>/" index.html

# Create .env from .env.example if it exists
if [ -f ".env.example" ]; then
    echo -e "${GREEN}✓${NC} Creating .env from .env.example..."
    cp .env.example .env
fi

# Remove example pages (optional)
read -p "Remove example pages? (y/N): " REMOVE_EXAMPLES
if [ "$REMOVE_EXAMPLES" = "y" ] || [ "$REMOVE_EXAMPLES" = "Y" ]; then
    echo -e "${GREEN}✓${NC} Removing example pages..."
    rm -f src/pages/Examples.tsx
    rm -f src/pages/Dashboard.tsx
    rm -f src/components/FormExample.tsx
    rm -f src/components/FormExample.test.tsx
    echo -e "${YELLOW}⚠${NC} Remember to update App.tsx to remove routes for deleted pages"
fi

# Reset git history (optional)
read -p "Reset git history? (y/N): " RESET_GIT
if [ "$RESET_GIT" = "y" ] || [ "$RESET_GIT" = "Y" ]; then
    echo -e "${GREEN}✓${NC} Resetting git history..."
    rm -rf .git
    git init
    git add .
    git commit -m "✨ feat: 初始化项目 $PROJECT_NAME"
fi

echo ""
echo -e "${GREEN}✅ Project initialized successfully!${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "  1. bun install"
echo "  2. bun run dev"
echo "  3. Start building your app!"
echo ""
