import { registerPlugin } from '@capacitor/core';

export type Web3AuthAndroidPlugin = {
  signIn(): () => void;
  signOut(): () => void;
};

const Web3AuthAndroidPlugin = registerPlugin<Web3AuthAndroidPlugin>('Web3AuthAndroidPlugin');

export default Web3AuthAndroidPlugin;
