#!/bin/bash

# 🎉 Owen's 2025 Portfolio - Development Setup Validation
echo "🎉 Owen's 2025 Portfolio - Development Setup Validation"
echo "======================================================="
echo ""

# Check Node.js and npm
echo "📦 Checking Node.js and npm..."
node --version
npm --version
echo ""

# Check if key dependencies are installed
echo "🔍 Checking key dependencies..."
if [ -d "node_modules" ]; then
    echo "✅ node_modules directory exists"
    echo "📊 Installed packages: $(ls node_modules | wc -l)"
else
    echo "❌ node_modules directory not found"
fi
echo ""

# Check configuration files
echo "⚙️  Checking configuration files..."
files=(".prettierrc.json" "eslint.config.mjs" "tsconfig.json" ".env.example" "jest.config.js")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file"
    fi
done
echo ""

# Check VS Code configuration
echo "🔧 Checking VS Code configuration..."
if [ -f ".vscode/settings.json" ]; then
    echo "✅ VS Code settings configured"
else
    echo "❌ VS Code settings not found"
fi
echo ""

# Check GitHub workflows
echo "🚀 Checking GitHub workflows..."
if [ -d ".github/workflows" ]; then
    echo "✅ GitHub workflows directory exists"
    echo "📄 Workflow files: $(ls .github/workflows | wc -l)"
else
    echo "❌ GitHub workflows not found"
fi
echo ""

# Check documentation
echo "📚 Checking documentation..."
docs=("DEVELOPMENT_SETUP.md" "COPILOT_PROMPTS.md" "SETUP_COMPLETE.md")
for doc in "${docs[@]}"; do
    if [ -f "$doc" ]; then
        echo "✅ $doc"
    else
        echo "❌ $doc"
    fi
done
echo ""

echo "🎯 Setup validation complete!"
echo ""
echo "🚀 Next steps:"
echo "1. Run 'npm run dev' to start the development server"
echo "2. Copy '.env.example' to '.env.local' and configure"
echo "3. Start coding with ChatGPT Codex assistance!"
echo ""
echo "📖 For development help, see:"
echo "- DEVELOPMENT_SETUP.md - Complete development guide"
echo "- COPILOT_PROMPTS.md - ChatGPT Codex prompts"
echo ""
