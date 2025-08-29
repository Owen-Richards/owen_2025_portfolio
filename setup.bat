@echo off
echo 🎨 Owen's 2025 Portfolio - Multi-Agent Setup
echo =============================================

if not exist package.json (
    echo ❌ Please run this script from the portfolio root directory
    exit /b 1
)

echo ✅ Installing dependencies...
call npm install

echo ✅ Starting development server...
start /b npm run dev

timeout /t 3 >nul

echo.
echo 🤖 Multi-Agent Development Ready!
echo =================================
echo.
echo 🎯 Available Agent Roles:
echo   🎨 Design Agent    - Visual design ^& accessibility
echo   ⚡ Performance Agent - Optimization ^& Core Web Vitals
echo   📝 Content Agent   - Blog posts ^& case studies
echo   🚀 Features Agent  - Advanced interactions ^& 3D
echo.
echo 📋 GitHub Issues:
echo   #1 - Design Agent Tasks
echo   #2 - Performance Agent Tasks
echo   #3 - Content Agent Tasks
echo   #4 - Features Agent Tasks
echo.
echo 🌐 Development URLs:
echo   Local: http://localhost:3000
echo   Repository: https://github.com/Owen-Richards/owen_2025_portfolio
echo.
echo 📚 Documentation:
echo   - README.md - Project overview
echo   - MULTI_AGENT_WORKFLOW.md - Agent coordination
echo   - COPILOT_PROMPTS.md - AI assistance
echo   - DEVELOPMENT_SETUP.md - Environment setup
echo.
echo 🚀 Ready to start developing!
echo Choose your agent role and create a feature branch:
echo   git checkout -b design/your-feature-name
echo   git checkout -b performance/your-feature-name
echo   git checkout -b content/your-feature-name
echo   git checkout -b features/your-feature-name

pause
