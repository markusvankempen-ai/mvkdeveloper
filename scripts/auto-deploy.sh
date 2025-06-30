#!/bin/bash

# Auto Deploy Script for MVK Developer Portfolio
# Automatically commits changes, merges to main, and syncs with remote

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if we're in a git repository
check_git_repo() {
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        print_error "Not in a git repository!"
        exit 1
    fi
}

# Function to get current branch
get_current_branch() {
    git branch --show-current
}

# Function to check if there are changes to commit
has_changes() {
    ! git diff-index --quiet HEAD --
}

# Function to check if there are untracked files
has_untracked() {
    [ -n "$(git ls-files --others --exclude-standard)" ]
}

# Main deployment function
auto_deploy() {
    local commit_message="$1"
    local current_branch=$(get_current_branch)
    
    print_status "Starting auto-deployment process..."
    print_status "Current branch: $current_branch"
    
    # Check if there are any changes
    if ! has_changes && ! has_untracked; then
        print_warning "No changes detected. Nothing to commit."
        return 0
    fi
    
    # Add all changes
    print_status "Adding all changes to staging..."
    git add .
    
    # Generate commit message if not provided
    if [ -z "$commit_message" ]; then
        local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
        commit_message="🚀 Auto-deploy: Updates from $timestamp"
    fi
    
    # Commit changes
    print_status "Committing changes with message: '$commit_message'"
    git commit -m "$commit_message"
    
    # Push current branch first
    print_status "Pushing changes to remote branch: $current_branch"
    git push origin "$current_branch"
    
    # If not on main branch, merge to main
    if [ "$current_branch" != "main" ]; then
        print_status "Switching to main branch..."
        git checkout main
        
        print_status "Pulling latest changes from remote main..."
        git pull origin main
        
        print_status "Merging $current_branch into main..."
        git merge "$current_branch" --no-edit
        
        print_status "Pushing merged changes to remote main..."
        git push origin main
        
        print_status "Switching back to $current_branch..."
        git checkout "$current_branch"
    else
        print_status "Already on main branch, pushing directly..."
        git push origin main
    fi
    
    # Build and deploy to GitHub Pages if we have a homepage
    if [ -d "homepage" ] && [ -f "homepage/package.json" ]; then
        print_status "Building and deploying to GitHub Pages..."
        cd homepage
        
        if npm run build; then
            print_status "Build successful, deploying to gh-pages..."
            npm run deploy
            print_success "Successfully deployed to GitHub Pages!"
        else
            print_error "Build failed, skipping deployment to GitHub Pages"
        fi
        
        cd ..
    fi
    
    print_success "Auto-deployment completed successfully!"
    print_success "🌐 Live site: https://markusvankempen-ai.github.io/mvkdeveloper/"
}

# Check command line arguments
case "${1:-}" in
    -h|--help)
        echo "Usage: $0 [commit-message]"
        echo ""
        echo "Auto-deploy script that:"
        echo "  1. Commits all changes"
        echo "  2. Merges to main branch" 
        echo "  3. Syncs with remote repository"
        echo "  4. Deploys to GitHub Pages"
        echo ""
        echo "Options:"
        echo "  -h, --help     Show this help message"
        echo "  commit-message Optional custom commit message"
        echo ""
        echo "Examples:"
        echo "  $0                                    # Auto-generated commit message"
        echo "  $0 \"Add new feature\"                 # Custom commit message"
        exit 0
        ;;
esac

# Main execution
check_git_repo
auto_deploy "$1" 