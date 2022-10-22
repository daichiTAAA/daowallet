#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(Web3AuthIOSPlugin, "Web3AuthIOS",
  CAP_PLUGIN_METHOD(web3AuthIOSlogin, CAPPluginReturnPromise);
)
