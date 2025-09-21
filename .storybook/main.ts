/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-viewport',
    '@storybook/addon-backgrounds',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  staticDirs: ['../public'],
  webpackFinal: async (config) => {
    // Handle SVG imports
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Handle path aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
      '@/components': path.resolve(__dirname, '../src/components'),
      '@/lib': path.resolve(__dirname, '../src/lib'),
      '@/hooks': path.resolve(__dirname, '../src/lib/hooks'),
      '@/utils': path.resolve(__dirname, '../src/lib/utils'),
      '@/types': path.resolve(__dirname, '../src/lib/types'),
      '@/constants': path.resolve(__dirname, '../src/lib/constants'),
      '@/animations': path.resolve(__dirname, '../src/lib/animations'),
      '@/styles': path.resolve(__dirname, '../src/styles'),
      '@/data': path.resolve(__dirname, '../src/data'),
      '@/public': path.resolve(__dirname, '../public'),
      '@/app': path.resolve(__dirname, '../src/app'),
    };

    return config;
  },
};

export default config;
