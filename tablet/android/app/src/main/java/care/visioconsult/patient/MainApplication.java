package care.visioconsult.patient;

import android.app.Application;
import com.facebook.react.ReactApplication;
import com.rtmalone.volumecontrol.RNVolumeControlPackage;
import com.evanjmg.RNHomePressedPackage;
import com.azendoo.reactnativesnackbar.SnackbarPackage;
import com.rnimmersive.RNImmersivePackage;
import com.github.kevinejohn.keyevent.KeyEventPackage;
import com.balthazargronon.RCTZeroconf.ZeroconfReactPackage;
import org.reactnative.camera.RNCameraPackage;
import io.sentry.RNSentryPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.oblador.keychain.KeychainPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.zxcpoiu.incallmanager.InCallManagerPackage;
import com.corbt.keepawake.KCKeepAwakePackage;
import com.microsoft.codepush.react.CodePush;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.util.Arrays;
import java.util.List;
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.rnfs.RNFSPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.imagepicker.ImagePickerPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.ninty.system.setting.SystemSettingPackage;

import com.oney.WebRTCModule.WebRTCModulePackage; 
import com.futurice.rctaudiotoolkit.AudioPackage;

import care.visioconsult.patient.InstalledAppsPackage;

public class MainApplication extends Application implements ReactApplication {

 
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }
    
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(), 
            new RNVolumeControlPackage(),
            new RNHomePressedPackage(),
            new SnackbarPackage(),
            new RNImmersivePackage(),
            new KeyEventPackage(),
            new ZeroconfReactPackage(),
            new RNCameraPackage(),
            new RNSentryPackage(MainApplication.this),
            new SplashScreenReactPackage(),
            new KeychainPackage(),
            new FastImageViewPackage(),
            new LinearGradientPackage(),
            new BlurViewPackage(),
            new InCallManagerPackage(),
            new KCKeepAwakePackage(),
            new CodePush(BuildConfig.CODE_PUSH_DEPLOYMENT_KEY, getApplicationContext(), BuildConfig.DEBUG),
            new ReactNativeOneSignalPackage(),
            new RNDeviceInfo(),
            new ReactVideoPackage(),
            new RNFetchBlobPackage(),
            new RNFSPackage(),
            new ImageResizerPackage(),
            new ImagePickerPackage(),
            new RNI18nPackage(),
            new VectorIconsPackage(),
            new ReactNativeConfigPackage(),
            new WebRTCModulePackage(),
            new AudioPackage(),
            new InstalledAppsPackage(),
            new RNFusedLocationPackage(),
            new SystemSettingPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
