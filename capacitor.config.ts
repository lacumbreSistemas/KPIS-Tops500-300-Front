import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'sistema-top500',
  webDir: 'dist/SistemaTop500',
  bundledWebRuntime: false,
  server: {
    cleartext: true
  }
};

export default config;
