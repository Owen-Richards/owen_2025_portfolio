# 📦 Package.json Improvements

## 🔧 **Missing Dependencies for Clean Architecture**

Add these packages to enhance your clean architecture:

```bash
# Class name utilities (for better CSS handling)
npm install clsx tailwind-merge

# State management (if needed for complex state)
npm install zustand

# Form handling (for contact forms)
npm install react-hook-form @hookform/resolvers zod

# Data fetching (for blog/CMS)
npm install @tanstack/react-query axios

# Testing utilities (missing)
npm install @testing-library/jest-dom @testing-library/react @testing-library/user-event vitest

# Development tools
npm install -D @storybook/react @storybook/addon-essentials
npm install -D chromatic # for visual testing
```

## 📝 **Enhanced Scripts**

Add these scripts to package.json:

```json
{
  "scripts": {
    // Architecture validation
    "lint:architecture": "eslint --ext .ts,.tsx src/ --rule 'import/no-restricted-paths: [error, {zones: [{target: \"src/components/ui\", from: \"src/components/features\"}, {target: \"src/lib\", from: \"src/components\"}]}]'",

    // Bundle analysis
    "analyze:bundle": "ANALYZE=true npm run build",
    "analyze:deps": "npx depcheck",

    // Performance testing
    "lighthouse": "npx lighthouse http://localhost:3000",

    // Code quality
    "code-quality": "npm run lint && npm run type-check && npm run test",

    // Dependency management
    "deps:check": "npx npm-check-updates",
    "deps:update": "npx npm-check-updates -u && npm install",

    // Documentation
    "docs:build": "typedoc src --out docs",

    // Release management
    "release": "npm run validate && npm run build && npm version patch"
  }
}
```

## 🏗️ **Architecture Enforcement**

Create `.eslintrc-architecture.js` for architectural rules:

```javascript
module.exports = {
  rules: {
    // Prevent circular dependencies
    'import/no-cycle': 'error',

    // Enforce layer boundaries
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          // UI components can't import from features
          {
            target: 'src/components/ui',
            from: 'src/components/features',
          },
          // Lib can't import from components
          {
            target: 'src/lib',
            from: 'src/components',
          },
          // Components can't import from app
          {
            target: 'src/components',
            from: 'src/app',
          },
        ],
      },
    ],
  },
};
```

## 🔍 **Quality Gates**

Add pre-commit hooks in `package.json`:

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged && npm run type-check",
      "pre-push": "npm run test && npm run lint:architecture"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write", "git add"],
    "*.{json,md}": ["prettier --write", "git add"]
  }
}
```
