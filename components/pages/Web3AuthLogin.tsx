import {
  IonPage,
  IonRow,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonLabel,
} from '@ionic/react';
import { Device } from '@capacitor/device';
import Web3AuthIOS from '../../ios/App/App/plugins/Web3AuthIOS/Web3AuthIOS';

import { useEffect, useState, useRef } from 'react';
import { Web3Auth } from '@web3auth/modal';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from '@web3auth/base';
// import RPC from '../../rpcs/web3RPC'; // for using web3.js
// import RPC from '../../rpcs/ethersRPC'; // for using ethers.js

const styles = {
  card: 'mt-2 col-span-8 col-start-3',
};

const clientId = process.env.NEXT_PUBLIC_CLIENTID; // get from https://dashboard.web3auth.io

function Web3AuthLogin() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [web3authIOS, setWeb3authIOS] = useState<boolean>(false);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
  const [deviceInfo, setDeviceInfo] = useState('web');

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          chainConfig: {
            /*
              you can pass your own chain configs here
              */
            chainNamespace: CHAIN_NAMESPACES.OTHER,
            displayName: 'Astar',
            ticker: 'ASTR',
            tickerName: 'astar',
          },
          clientId:
            clientId ||
            'BHV75ODX9QpTBg3yxoQ0MNnTbQ4ksELPEDvkQN_KUAWdFkNdqgzmUZc2p48W1prowdNugWT91_4ydRFFBwap1dE', // get it from https://dashboard.web3auth.io
        });

        const openloginAdapter = new OpenloginAdapter({
          adapterSettings: {
            clientId, // get it from https://dashboard.web3auth.io
            network: 'testnet',
            uxMode: 'popup',
          },
        });
        web3auth.configureAdapter(openloginAdapter);

        logDeviceInfo();

        setWeb3auth(web3auth);

        await web3auth.initModal();

        setProvider(web3auth.provider);
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, [setProvider, setWeb3auth]);

  const logDeviceInfo = async () => {
    const info = await Device.getInfo();
    console.log(info.platform);
    setDeviceInfo(info.platform);
    return info;
  };

  const login = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }
    const user = await web3auth.getUserInfo();
    console.log(user);
  };

  const logout = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };

  const getPrivateKey = async () => {
    //Assuming user is already logged in.
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    if (!web3auth?.provider) {
      console.log('web3auth not initialized yet');
      return;
    } else {
      const privateKey = await web3auth.provider.request({
        method: 'private_key',
      });
      const { getED25519Key } = await import('@toruslabs/openlogin-ed25519');
      if (typeof privateKey === 'string') {
        const ed25519key = getED25519Key(privateKey).sk.toString('hex');
        console.log(`ed25519key is: ${ed25519key}`);
      }
      console.log(`private key is: ${privateKey}`);
    }
    //Do something with privateKey
  };

  const loggedInView = (
    <>
      <IonRow className="grid grid-cols-12">
        <IonButton onClick={getUserInfo} className={styles.card}>
          Get User Info
        </IonButton>
        <IonButton onClick={getPrivateKey} className={styles.card}>
          Get Private Key
        </IonButton>
        <IonButton onClick={logout} className={styles.card}>
          Log Out
        </IonButton>
      </IonRow>
    </>
  );

  const unloggedInView = (
    <IonRow className="grid grid-cols-12">
      <IonButton onClick={login} className="mt-10 col-span-8 col-start-3">
        Login
      </IonButton>
    </IonRow>
  );

  /////////   ios   start   ///////////

  const loginIOS = async () => {
    const web3authIOS = await Web3AuthIOS.web3AuthIOSlogin();
    if (web3authIOS !== null) {
      setWeb3authIOS(true);
    }
  };

  const getPrivateKeyIOS = async () => {
    //Assuming user is already logged in.
    if (!web3authIOS) {
      console.log('web3auth not initialized yet');
      return;
    } else {
      const privateKey = await Web3AuthIOS.web3AuthIOSlogin();
      console.log(privateKey);
    }
    //Do something with privateKey
  };

  const unloggedInViewIOS = (
    <IonRow className="grid grid-cols-12">
      <IonButton onClick={loginIOS} className="mt-10 col-span-8 col-start-3">
        Login
      </IonButton>
    </IonRow>
  );

  const logoutIOS = async () => {
    if (!web3authIOS) {
      console.log('web3auth not initialized yet');
      return;
    }
    setWeb3authIOS(false);
  };

  const loggedInViewIOS = (
    <>
      <IonRow className="grid grid-cols-12">
        <IonButton onClick={getPrivateKeyIOS} className={styles.card}>
          Get Private Key
        </IonButton>
        <IonButton onClick={logoutIOS} className={styles.card}>
          Log Out
        </IonButton>
      </IonRow>
    </>
  );

  //////////////// ios  end /////////////////

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {deviceInfo === 'web' && (provider ? loggedInView : unloggedInView)}
        {deviceInfo === 'ios' && (web3authIOS ? loggedInViewIOS : unloggedInViewIOS)}
        {deviceInfo !== 'web' && deviceInfo !== 'ios' && deviceInfo !== 'android' && (
          <IonLabel>not match device</IonLabel>
        )}
      </IonContent>
    </IonPage>
  );
}

export default Web3AuthLogin;
