package com.folios.app;

import android.os.Bundle;

import com.folios.plugin.w3acustom.W3aCustomPlugin;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
        @Override
        public void onCreate(Bundle savedInstanceState) {
            registerPlugin(W3aCustomPlugin.class);
            super.onCreate(savedInstanceState);
        }
}

