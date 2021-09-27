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
          'fit-content': 'fit-content',
          '28rem': '28rem',
          '30rem': '30rem',
          '40rem': '40rem'
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
