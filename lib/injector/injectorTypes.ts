declare global {
  interface Window {
    send: (path: string, data: any) => void;
    walletExtension: {
      onAppResponse: (msgType: string, response: any, error: Error) => void;
      onAppSubscription: (requestId: string, subscriptionString: string) => void;
      isNovaWallet: Boolean;
    };
    injectedWeb3: {
      [key: string]: {};
    };
  }
}

export type MessageData = {
  id: string;
  message: string;
  request: object;
  origin: string;
};

export type Handler = {
  resolve: (data?: any) => void;
  reject: (error: Error) => void;
  subscriber?: (data: any) => void;
};

export type Handlers = Map<string, Handler>;
