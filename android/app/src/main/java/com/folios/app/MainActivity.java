package com.folios.app;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;


public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(Web3AuthAndroidPlugin.class);
        super.onCreate(savedInstanceState);

    }
}

