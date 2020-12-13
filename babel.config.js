module.exports = function(api) {
  api.cache(true)

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry',
          loose: true,
          corejs: '3',
          targets: {
            browsers: ['last 2 versions', 'not ie < 11'],
          },
        },
      ],
      '@babel/preset-react',
    ],
    plugins: [
      'react-hot-loader/babel',
      '@babel/transform-runtime',
      '@babel/syntax-dynamic-import',
      ['@babel/proposal-class-properties', {loose: true}],
      [
        'module-resolver',
        {
          root: ['./src/**'],
        },
      ],
    ],
  }
}
