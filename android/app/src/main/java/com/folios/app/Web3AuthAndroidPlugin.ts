import { registerPlugin } from '@capacitor/core';

export interface Web3AuthAndroidPlugin {
  onCreate(): () => void;
  signOut(): () => void;
}

const Web3AuthAndroidPlugin = registerPlugin<Web3AuthAndroidPlugin>('Web3AuthAndroidPlugin');

export default Web3AuthAndroidPlugin;
