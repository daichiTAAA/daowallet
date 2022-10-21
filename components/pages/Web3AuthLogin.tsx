import {
  IonPage,
  IonRow,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
} from '@ionic/react';

import { useEffect, useState } from 'react';
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
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);

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
          clientId: clientId, // get it from https://dashboard.web3auth.io
        });

        const openloginAdapter = new OpenloginAdapter({
          adapterSettings: {
            clientId, // get it from https://dashboard.web3auth.io
            network: 'testnet',
            uxMode: 'popup',
          },
        });
        web3auth.configureAdapter(openloginAdapter);

        setWeb3auth(web3auth);

        await web3auth.initModal();
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, [setProvider, setWeb3auth]);

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
    const privateKey = await web3auth.provider.request({
      method: 'private_key',
    });
    //Do something with privateKey
    console.log(privateKey);
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>{provider ? loggedInView : unloggedInView}</IonContent>
    </IonPage>
  );
}

export default Web3AuthLogin;
