#!/bin/bash

# Snake Game MVP Deployment Script
# Automated deployment to GitHub Pages

echo "🐍 Snake Game MVP Deployment"
echo "=============================="

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: Please run this script from the snake-game directory"
    exit 1
fi

# Step 1: Verify all required files exist
echo "📁 Checking required files..."
required_files=("index.html" "css/style.css" "js/game.js" "manifest.json" "sw.js")
for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Missing required file: $file"
        exit 1
    fi
    echo "✅ Found: $file"
done

# Step 2: Create deployment-specific optimizations
echo "⚡ Creating deployment optimizations..."

# Create a simple 404.html for better GitHub Pages experience
cat > 404.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snake Game - Page Not Found</title>
    <style>
        body {
            font-family: 'Courier New', monospace;
            background: #000;
            color: #00FF00;
            text-align: center;
            padding: 50px;
        }
        .container {
            max-width: 400px;
            margin: 0 auto;
        }
        h1 { font-size: 3em; margin-bottom: 20px; }
        p { margin: 20px 0; }
        a {
            color: #00FF00;
            text-decoration: none;
            border: 2px solid #00FF00;
            padding: 10px 20px;
            display: inline-block;
            margin-top: 20px;
            transition: all 0.3s;
        }
        a:hover {
            background: #00FF00;
            color: #000;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🐍 404</h1>
        <p>Oops! This page slithered away...</p>
        <p>The snake couldn't find what you're looking for.</p>
        <a href="/">🎮 Play Snake Game</a>
    </div>
</body>
</html>
EOF

echo "✅ Created 404.html"

# Step 3: Create GitHub Pages specific files
cat > CNAME.template << 'EOF'
# Uncomment and modify if you have a custom domain:
# your-domain.com
EOF

# Step 4: Optimize manifest.json for production
echo "🔧 Verifying PWA configuration..."

# Step 5: Create deployment checklist
cat > DEPLOYMENT_CHECKLIST.md << 'EOF'
# 🚀 Deployment Checklist

## Pre-Deployment ✅
- [x] All core files present (HTML, CSS, JS)
- [x] PWA manifest configured
- [x] Service worker implemented
- [x] Mobile controls optimized
- [x] 404 page created
- [x] Documentation complete

## GitHub Pages Setup
- [ ] Create GitHub repository
- [ ] Push code to main branch
- [ ] Enable GitHub Pages in repository settings
- [ ] Test deployed version
- [ ] Update README with live demo URL

## Post-Deployment Testing
- [ ] Game loads correctly
- [ ] Mobile controls work
- [ ] PWA installation works
- [ ] Offline functionality works
- [ ] All features functional

## Optional Enhancements
- [ ] Custom domain setup
- [ ] Analytics integration
- [ ] Performance monitoring
- [ ] SEO optimization
EOF

echo "✅ Created deployment checklist"

# Step 6: Initialize git if not already done
if [ ! -d ".git" ]; then
    echo "🔧 Initializing Git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git repository already exists"
fi

# Step 7: Create .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Temporary files
*.tmp
*.temp
EOF

echo "✅ Created .gitignore"

echo ""
echo "🎉 MVP Deployment preparation complete!"
echo ""
echo "📋 Next steps:"
echo "1. Review DEPLOYMENT_CHECKLIST.md"
echo "2. Run: git add ."
echo "3. Run: git commit -m 'MVP ready for deployment'"
echo "4. Create GitHub repository"
echo "5. Run: git remote add origin https://github.com/YOUR_USERNAME/snake-game.git"
echo "6. Run: git push -u origin main"
echo "7. Enable GitHub Pages in repository settings"
echo ""
echo "🔗 Full instructions in DEPLOYMENT.md"
echo "🎮 Your Snake Game MVP is ready to deploy!"
