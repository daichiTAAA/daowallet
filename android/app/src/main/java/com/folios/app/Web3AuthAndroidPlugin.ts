import { registerPlugin } from '@capacitor/core';

export interface Web3AuthAndroidPlugin {
  onCreate(options: { value: string }): Promise<{ value: string }>;
  signOut(options: { value: string }): Promise<{ value: string }>;
}

const Web3AuthAndroidPlugin = registerPlugin<Web3AuthAndroidPlugin>('Web3AuthAndroidPlugin');

export default Web3AuthAndroidPlugin;
