package com.folios.app

import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import com.web3auth.core.Web3Auth
import com.web3auth.core.types.LoginParams
import com.web3auth.core.types.Provider
import com.web3auth.core.types.Web3AuthOptions
import com.web3auth.core.types.Web3AuthResponse
import java8.util.concurrent.CompletableFuture


class Web3AuthAndroid :  AppCompatActivity() {
        private lateinit var web3Auth: Web3Auth

        fun signIn() {
            web3Auth = Web3Auth(
                Web3AuthOptions(
                    context = MainActivity(),
                    clientId = (R.string.web3auth_project_id).toString(),
                    network = Web3Auth.Network.TESTNET,
                    redirectUrl = Uri.parse("com.folios.app://auth")
                )
            )
            login()
        }

        private fun login() {
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

        fun signOut() {
            web3Auth.logout()
        }
}