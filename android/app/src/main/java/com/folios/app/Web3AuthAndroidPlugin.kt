package com.folios.app

import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin


@CapacitorPlugin(name = "Web3AuthAndroidPlugin")
class Web3AuthAndroidPlugin : Plugin() {
        private val implementation = Web3AuthAndroid()

        @PluginMethod
        fun signIn(call: PluginCall) {
            implementation.signIn()
            call.resolve()
        }

       @PluginMethod
        fun signOut(call: PluginCall) {
            implementation.signOut()
            call.resolve()
        }
}