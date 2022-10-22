import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.folios.app',
  appName: 'Folios',
  bundledWebRuntime: false,
  webDir: 'out',
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    },
  },
  server: {
    url: 'http://192.168.0.20:3000/',
    cleartext: true,
  },
  cordova: {},
};

export default config;
