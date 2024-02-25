import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ionic.test',
  appName: "SuperNews",
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
