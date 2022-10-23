package com.folios.app

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import com.web3auth.core.Web3Auth
import com.web3auth.core.types.LoginParams
import com.web3auth.core.types.Provider
import com.web3auth.core.types.Web3AuthOptions
import com.web3auth.core.types.Web3AuthResponse
import java8.util.concurrent.CompletableFuture
import com.getcapacitor.Plugin
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin


@CapacitorPlugin(name = "Web3AuthAndroidPlugin")
class Web3AuthAndroidPlugin : Plugin() {
        // ...
        private lateinit var web3Auth: Web3Auth

    @PluginMethod
        fun onCreate(savedInstanceState: Bundle?) {
            onCreate(savedInstanceState)

            web3Auth = Web3Auth(
                Web3AuthOptions(
                    context = MainActivity(),
                    clientId = (R.string.web3auth_project_id).toString(10),
                    network = Web3Auth.Network.TESTNET,
                    redirectUrl = Uri.parse("com.folios.app://auth")
                )
            )

            signIn()

            // Handle user signing in when app is not alive
//            web3Auth.setResultUrl(intent?.data)

            // Setup UI and event handlers
//            val signInButton = findViewById<Button>(R.id.signInButton)
//            signInButton.setOnClickListener { signIn() }
        }

//    private fun Web3AuthOptions(context: Web3AuthAndroidPlugin, clientId: String, network: Web3Auth.Network, redirectUrl: Uri?): Web3AuthOptions {
//        val context = Web3AuthAndroidPlugin,
//        val clientId: String,
//        val network: Web3Auth.Network,
//        val redirectUrl: Uri?,
//        val sdkUrl: String,
//        val whiteLabel: WhiteLabelData?,
//        val loginConfig: HashMap<String, LoginConfigItem>?
//      return (
//
//              )
//    }

    private fun onNewIntent(intent: Intent?) {
            onNewIntent(intent)

            // Handle user signing in when app is active
            web3Auth.setResultUrl(intent?.data)
        }

    private fun signIn() {
            val selectedLoginProvider = Provider.GOOGLE   // Can be GOOGLE, FACEBOOK, TWITCH etc.
            val loginCompletableFuture: CompletableFuture<Web3AuthResponse> =
                web3Auth.login(LoginParams(selectedLoginProvider))

            loginCompletableFuture.whenComplete { loginResponse, error ->
                if (error == null) {
                    // render logged in UI
                    println(loginResponse)
                } else {
                    // render error UI
                    println(error)
                }
            }
        }
        //...

    @PluginMethod
    fun signOut() {
            web3Auth.logout()
    }
}