import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist', '**/out-tsc'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: 'scope:@org/api',
              onlyDependOnLibsWithTags: ['scope:models'],
            },
            {
              sourceTag: 'scope:@org/web',
              onlyDependOnLibsWithTags: ['scope:models', 'scope:ui-components'],
            },
            {
              sourceTag: 'scope:ui-components',
              onlyDependOnLibsWithTags: ['scope:ui-components'],
            },
            {
              sourceTag: 'scope:models',
              onlyDependOnLibsWithTags: ['scope:models'],
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
];
