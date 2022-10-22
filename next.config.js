const withTM = require('next-transpile-modules')([
  '@ionic/react',
  '@ionic/core',
  '@ionic/react-router',
  '@stencil/core',
  'ionicons',
  '@web3auth/base',
  '@web3auth/modal',
]);

module.exports = withTM({
  basePath: '',
  images: {
    domains: ['images.unsplash.com'],
  },
  swcMinify: true,
  env: {
    CLIENTID:
      'BHV75ODX9QpTBg3yxoQ0MNnTbQ4ksELPEDvkQN_KUAWdFkNdqgzmUZc2p48W1prowdNugWT91_4ydRFFBwap1dE',
  },
});
