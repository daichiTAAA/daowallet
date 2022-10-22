import { registerPlugin } from '@capacitor/core';

export interface Web3AuthState {
  privKey: string | null;
  ed25519PrivKey: string | null;
}

export interface Web3AuthIOSType {
  web3AuthIOSlogin: () => Web3AuthState;
}

const Web3AuthIOS = registerPlugin<Web3AuthIOSType>('Web3AuthIOS');

export default Web3AuthIOS;
