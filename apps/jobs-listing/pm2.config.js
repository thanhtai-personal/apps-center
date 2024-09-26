module.exports = {
  apps: [
    {
      name: 'joblist-client',
      script: 'pnpm',
      args: 'build',
      env: {
        VITE_BASE_URL:'https://34.135.118.246:5173',
        VITE_API_URL: 'http://34.135.118.246:6789',
        VITE_TELEGRAM_BOT_URL: '',
        VITE_TELEGRAM_BOT_WALLET_ADDRESS: 'UQDozoVJzP-Va28QA8A3OG01ebBH31h1ofxb2wmzKYx-3pVK',
        VITE_IS_TEST_NET: true,
        VITE_GOOGLE_CLIENT_ID: '480473804935-10e53uuh450nhs01o2qei7bp2hdsvv9h.apps.googleusercontent.com',
        VITE_GOOGLE_STREAM_ID: 9738765700,
        VITE_GOOGLE_MEASUREMENT_ID: 'G-MTN6TW3C26'
      },
      // Optional: specify the build directory
      cwd: './dist', // adjust according to your build output
    },
  ],
};