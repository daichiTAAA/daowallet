package com.folios.app;

import com.getcapacitor.BridgeActivity;
import android.os.Bundle;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(Web3AuthAndroidPlugin.class);
        super.onCreate(savedInstanceState);
    }
}