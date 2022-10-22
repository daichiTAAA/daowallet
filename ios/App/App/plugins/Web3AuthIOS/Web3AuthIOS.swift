import Foundation
import Web3Auth

class Web3AuthIOS: ObservableObject{
    func iosLogin() -> (){
      Web3Auth(W3AInitParams(
                            clientId: "BHV75ODX9QpTBg3yxoQ0MNnTbQ4ksELPEDvkQN_KUAWdFkNdqgzmUZc2p48W1prowdNugWT91_4ydRFFBwap1dE",
                            network: .testnet
                        )).login(W3ALoginParams(loginProvider: .GOOGLE)) {
        switch $0 {
          case .success(let result):
            self.showResult(result: result)
          case .failure(let error):
            print("Error: \(error)")
          }
      }
    }
    
    func showResult(result: Web3AuthState) -> [String:Any?]{
            print("""
            Signed in successfully!
                Private key: \(String(describing: result.privKey))
                Ed25519 Private key: \(String(describing: result.ed25519PrivKey))
                User info:
                    Name: \(String(describing: result.userInfo?.name))
                    Profile image: \(result.userInfo?.profileImage ?? "N/A")
                    Type of login: \(String(describing: result.userInfo?.typeOfLogin))
            """)
           let info:[String: Any] = [
            "privKey": String(describing:result.privKey) ,
            "ed25519PrivKey":  String(describing:result.ed25519PrivKey) ,
            ]
            return info;
    }
}
