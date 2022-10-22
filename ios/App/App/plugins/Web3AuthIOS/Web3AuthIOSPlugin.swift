import Foundation
import Capacitor
import Web3Auth

@objc(Web3AuthIOSPlugin)
public class Web3AuthIOSPlugin: CAPPlugin {
    private let implementation = Web3AuthIOS()

    @objc public func web3AuthIOSlogin(_ call: CAPPluginCall) {
        let _: () = implementation.iosLogin();
            
        call.resolve();
    }
    
    @objc override public func checkPermissions(_ call: CAPPluginCall) {
        
    }
    
    @objc override public func requestPermissions(_ call: CAPPluginCall) {
    }
    
}
    
