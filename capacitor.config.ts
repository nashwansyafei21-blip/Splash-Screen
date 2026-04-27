import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.favoritku.app',
  appName: 'Aplikasi Favoritku',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
