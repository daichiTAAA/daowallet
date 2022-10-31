package com.folios.app

import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch


@CapacitorPlugin(name = "Web3AuthAndroidPlugin")
class Web3AuthAndroidPlugin : Plugin() {
        private val implementation = Web3AuthAndroid()

        @PluginMethod
        fun signIn(call: PluginCall) {

                implementation.signIn(saveInstanceState())
                call.resolve()
        }
}