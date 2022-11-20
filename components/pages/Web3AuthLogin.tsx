import {
  IonPage,
  IonRow,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonLabel,
  IonCard,
} from '@ionic/react';
import { Device } from '@capacitor/device';
import { Preferences } from '@capacitor/preferences';

import { useEffect, useState, useRef } from 'react';
import { Web3Auth } from '@web3auth/modal';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { CHAIN_NAMESPACES, Maybe, SafeEventEmitterProvider } from '@web3auth/base';
import { Keyring } from '@polkadot/api';

import Web3AuthIOS from '../../ios/App/App/plugins/Web3AuthIOS/Web3AuthIOS';
import { W3aCustom } from '../../w3a-custom/src';

const styles = {
  card: 'mt-2 col-span-8 col-start-3',
};

const clientId = process.env.NEXT_PUBLIC_CLIENTID; // get from https://dashboard.web3auth.io

function Web3AuthLogin() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [web3authIOS, setWeb3authIOS] = useState<boolean>(false);
  const [web3authAndroid, setWeb3authAndroid] = useState<boolean>(false);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
  const [deviceInfo, setDeviceInfo] = useState('web');
  const [iosPrivateKey, setIosPrivateKey] = useState<Object | String | null>(null);
  const [androidPrivateKey, setAndroidPrivateKey] = useState<Object | String | null>(null);

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

  ///////////////  web  start  ///////////////////

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
      setProvider(null);
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };

  const createKeyring = async (privateKey: string, keyringName: string) => {
    // Create a keyring instance
    const keyring = new Keyring({ type: 'sr25519' });
    const privateKeyWithHex = `0x${privateKey}`;
    const pair = keyring.addFromUri(privateKeyWithHex, { name: keyringName });
    console.log(
      `
      ${pair.meta.name}: has address ${pair.address} with publicKey [${pair.publicKey}]
      polkadot address: ${keyring.encodeAddress(pair.publicKey, 0)}
      `
    );
    await Preferences.set({
      key: `${pair.meta.name}`,
      value: `{"keyringName":"${pair.meta.name}","privateKey":"${privateKeyWithHex}","publicKey":[${pair.publicKey}],"address":"${pair.address}"}`,
    });
  };

  const getPrivateKey = async () => {
    //Assuming user is already logged in.
    let privateKey: Maybe<string> | null;
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    if (!web3auth?.provider) {
      console.log('web3auth not initialized yet');
      return;
    } else {
      privateKey = await web3auth.provider.request({
        method: 'private_key',
      });
      console.log(`private key is: ${privateKey}`);
    }
    //Do something with privateKey
    if (typeof privateKey == 'string') {
      const keyringName = 'testname';
      createKeyring(privateKey, keyringName);
    }
  };

  const getAllKeyringNames = async () => {
    const allKeyringNames = await Preferences.keys();
    console.log('allKeys: ', allKeyringNames.keys);
    return allKeyringNames.keys;
  };

  const getAllKeyringInfo = async () => {
    const account = (await getAllKeyringNames()).forEach(async keyringName => {
      const keyringInfo = await (await Preferences.get({ key: keyringName })).value;
      const keyringInfoJson = JSON.parse(String(keyringInfo));
      console.log(keyringInfoJson);
    });
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
        <IonButton onClick={getAllKeyringNames} className={styles.card}>
          Get All Keys
        </IonButton>
        <IonButton onClick={getAllKeyringInfo} className={styles.card}>
          getAllKeyringInfo
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

  ///////////////  web  end  ///////////////////

  /////////   ios   start   ///////////

  const loginIOS = async () => {
    Web3AuthIOS.web3AuthIOSlogin();
    setWeb3authIOS(true);
  };

  const getPrivateKeyIOS = async () => {
    //Assuming user is already logged in.
    if (!web3authIOS) {
      console.log('web3auth not initialized yet');
      return;
    } else {
      const privateKey = await Web3AuthIOS.getPrivateKeyIos();
      setIosPrivateKey(privateKey);
      console.log(privateKey);
    }
    //Do something with privateKey
    console.log('iosPrivateKey is: ', iosPrivateKey);
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
        <IonLabel className={styles.card}>{`iosPrivateKey is: ${JSON.stringify(
          iosPrivateKey
        )}`}</IonLabel>
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

  ///////////////  android  start  /////////////////

  const loginAndroid = async () => {
    let privKeyAndroid = await W3aCustom.login();
    console.log('priKeyANdroid is: ', privKeyAndroid);

    setWeb3authAndroid(true);
    return privKeyAndroid;
  };

  const getPrivateKeyAndroid = async () => {
    //Assuming user is already logged in.
    if (!web3authAndroid) {
      console.log('web3auth not initialized yet');
      return;
    } else {
      const privateKey = await W3aCustom.getPrivateKey()
        .then(result => {
          const resultKey = String(result.value).replace('Intent { act=', '').replace(' }', '');
          console.log('resultKey: ', resultKey);
          setAndroidPrivateKey(resultKey);
          return resultKey;
        })
        .catch(error => {
          console.log(error);
        });
      console.log('privateKey: ', privateKey);
    }
    //Do something with privateKey
  };

  const pluginTest = async () => {
    const pluginTestReturnValue = await W3aCustom.echo({ value: 'Hi' });
    console.log(pluginTestReturnValue);
  };

  const unloggedInViewAndroid = (
    <IonRow className="grid grid-cols-12">
      <IonButton onClick={loginAndroid} className="mt-10 col-span-8 col-start-3">
        Login
      </IonButton>
      <IonButton onClick={pluginTest} className={styles.card}>
        Plugin Test
      </IonButton>
    </IonRow>
  );

  const logoutAndroid = async () => {
    if (!web3authAndroid) {
      console.log('web3auth not initialized yet');
      return;
    }
    W3aCustom.logout();
    setAndroidPrivateKey(null);
    setWeb3authAndroid(false);
    console.log('privateKey is:', androidPrivateKey);
  };

  const loggedInViewAndroid = (
    <>
      <IonRow className="grid grid-cols-12">
        <IonLabel className={styles.card}>{`androidPrivateKey is: ${String(
          androidPrivateKey
        )}`}</IonLabel>
        <IonButton onClick={getPrivateKeyAndroid} className={styles.card}>
          Get Private Key
        </IonButton>
        <IonButton onClick={logoutAndroid} className={styles.card}>
          Log Out
        </IonButton>
      </IonRow>
    </>
  );

  ///////////////  android  end  ///////////////////

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
        {deviceInfo === 'android' &&
          (web3authAndroid ? loggedInViewAndroid : unloggedInViewAndroid)}
        {deviceInfo !== 'web' && deviceInfo !== 'ios' && deviceInfo !== 'android' && (
          <IonLabel>not match device</IonLabel>
        )}
      </IonContent>
    </IonPage>
  );
}

export default Web3AuthLogin;
