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
import { Web3Auth } from '@web3auth/web3auth';
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from '@web3auth/base';
import RPC from '../../rpcs/web3RPC'; // for using web3.js
// import RPC from '../../rpcs/ethersRPC'; // for using ethers.js

const styles = {
  card: 'mt-2 col-span-8 col-start-3',
};

const clientId = process.env.NEXT_PUBLIC_CLIENTID; // get from https://dashboard.web3auth.io

function Web3AuthLogin() {
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: '0x1',
            rpcTarget: 'https://rpc.ankr.com/eth', // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
        });

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

  const getChainId = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const chainId = await rpc.getChainId();
    console.log(chainId);
  };
  const getAccounts = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    console.log(address);
  };

  const getBalance = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    console.log(balance);
  };

  const sendTransaction = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendTransaction();
    console.log(receipt);
  };

  const signMessage = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const signedMessage = await rpc.signMessage();
    console.log(signedMessage);
  };

  const getPrivateKey = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    console.log(privateKey);
  };
  const loggedInView = (
    <>
      <IonRow className="grid grid-cols-12">
        <IonButton onClick={getUserInfo} className={styles.card}>
          Get User Info
        </IonButton>
        <IonButton onClick={getChainId} className={styles.card}>
          Get Chain ID
        </IonButton>
        <IonButton onClick={getAccounts} className={styles.card}>
          Get Accounts
        </IonButton>
        <IonButton onClick={getBalance} className={styles.card}>
          Get Balance
        </IonButton>
        <IonButton onClick={sendTransaction} className={styles.card}>
          Send Transaction
        </IonButton>
        <IonButton onClick={signMessage} className={styles.card}>
          Sign Message
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
