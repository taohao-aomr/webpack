module.exports = {
    "useTabs": true,
    "eslintIntegration": true,
    "stylelintIntegration": true,
    "tabWidth": 2,
    "singleQuote": true,
    "semi": true,
    "printWidth": 150,
    overrides: [
        {
          files: '.prettierrc',
          options: {
            parser: 'json',
          },
        },
      ],
};
