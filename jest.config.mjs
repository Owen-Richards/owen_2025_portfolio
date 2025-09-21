import nextJest from 'next/jest';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    // Handle module aliases (this will be automatically configured for you
    // based on your tsconfig.json paths)
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/lib/hooks/$1',
    '^@/utils/(.*)$': '<rootDir>/src/lib/utils/$1',
    '^@/types/(.*)$': '<rootDir>/src/lib/types/$1',
    '^@/constants/(.*)$': '<rootDir>/src/lib/constants/$1',
    '^@/animations/(.*)$': '<rootDir>/src/lib/animations/$1',
    '^@/styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@/data/(.*)$': '<rootDir>/src/data/$1',
    '^@/public/(.*)$': '<rootDir>/public/$1',
    '^@/app/(.*)$': '<rootDir>/src/app/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/*.config.{js,ts}',
    '!src/**/index.{js,ts}',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/out/',
    '<rootDir>/build/',
  ],
  transformIgnorePatterns: [
    '/node_modules/(?!(three|@react-three|@react-spring))',
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load
// the Next.js config which is async
export default createJestConfig(customJestConfig);
