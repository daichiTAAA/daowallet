package com.folios.app;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import kotlin.Metadata;
import kotlin.jvm.internal.Intrinsics;
import org.jetbrains.annotations.NotNull;

@CapacitorPlugin(
        name = "Web3AuthAndroidPlugin"
)
@Metadata(
        mv = {1, 6, 0},
        k = 1,
        d1 = {"\u0000\u001e\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0018\u0002\n\u0000\n\u0002\u0010\u0002\n\u0000\n\u0002\u0018\u0002\n\u0000\b\u0007\u0018\u00002\u00020\u0001B\u0005¢\u0006\u0002\u0010\u0002J\u0010\u0010\u0005\u001a\u00020\u00062\u0006\u0010\u0007\u001a\u00020\bH\u0007R\u000e\u0010\u0003\u001a\u00020\u0004X\u0082\u0004¢\u0006\u0002\n\u0000¨\u0006\t"},
        d2 = {"Lcom/folios/app/Web3AuthAndroidPlugin;", "Lcom/getcapacitor/Plugin;", "()V", "implementation", "Lcom/folios/app/Web3AuthAndroid;", "signIn", "", "call", "Lcom/getcapacitor/PluginCall;", "android.app.main"}
)
public final class Web3AuthAndroidPlugin extends Plugin {
    private final Web3AuthAndroid implementation = new Web3AuthAndroid();

    @PluginMethod
    public final void signIn(@NotNull PluginCall call) {
        Intrinsics.checkNotNullParameter(call, "call");
        this.implementation.signIn(this.saveInstanceState());
        call.resolve();
    }
}
