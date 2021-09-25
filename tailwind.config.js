module.exports = {
    prefix: '',
    darkMode: false, // or 'media' or 'class',
    important: true,
    purge: {
      content: [
        './src/**/*.{html,ts}',
      ]
    },
    theme: {
      extend: {
        width: {
          'fit-content': 'fit-content'
        },
        height: {
          'fit-content': 'fit-content'
        }
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
};
