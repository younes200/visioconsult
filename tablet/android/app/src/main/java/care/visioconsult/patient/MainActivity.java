package care.visioconsult.patient;
import android.view.View;
import android.content.Intent;
import android.os.Bundle;
import com.rnimmersive.RNImmersiveModule;
import com.facebook.react.ReactActivity;
import android.util.Log;
import org.devio.rn.splashscreen.SplashScreen; 
import org.json.JSONObject;
import android.content.Intent;
import android.view.KeyEvent;
import com.github.kevinejohn.keyevent.KeyEventModule;
import android.widget.Toast;


public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
    }

    @Override
    public void onStart() {
        super.onStart();
    }

    @Override
    public void onNewIntent(Intent intent) {
        this.setIntent(intent);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "VisioConsult";
    }

     @Override  // <--- Add this method if you want to react to keyDown
      public boolean onKeyDown(int keyCode, KeyEvent event) {

            // switch (keyCode) {
            //     case KeyEvent.KEYCODE_DPAD_DOWN:
            //         KeyEventModule.getInstance().onKeyDownEvent(keyCode, event);
            //         return true;
            //     case KeyEvent.KEYCODE_DPAD_UP:
            //         KeyEventModule.getInstance().onKeyDownEvent(keyCode, event);
            //         return true;
            //     case KeyEvent.KEYCODE_DPAD_RIGHT:
            //         KeyEventModule.getInstance().onKeyDownEvent(keyCode, event);
            //         return true;
            //     case KeyEvent.KEYCODE_DPAD_LEFT:
            //         KeyEventModule.getInstance().onKeyDownEvent(keyCode, event);
            //         return true;
            //     case KeyEvent.KEYCODE_ENTER:
            //         KeyEventModule.getInstance().onKeyDownEvent(keyCode, event);
            //         return true;
            //     case KeyEvent.KEYCODE_F5:
            //         KeyEventModule.getInstance().onKeyDownEvent(keyCode, event);
            //         return true;
            // }

        // A. Prevent multiple events on long button press
        //    In the default behavior multiple events are fired if a button
        //    is pressed for a while. You can prevent this behavior if you
        //    forward only the first event:
        //        if (event.getRepeatCount() == 0) {
        //            KeyEventModule.getInstance().onKeyDownEvent(keyCode, event);
        //        }
        //
        // B. If multiple Events shall be fired when the button is pressed
        //    for a while use this code:
        //        KeyEventModule.getInstance().onKeyDownEvent(keyCode, event);
        //
        // Using B.
        //  KeyEventModule.getInstance().onKeyDownEvent(keyCode, event);

        // There are 2 ways this can be done:
        //  1.  Override the default keyboard event behavior
        //    super.onKeyDown(keyCode, event);
        //    return true;

        //  2.  Keep default keyboard event behavior
        //    return super.onKeyDown(keyCode, event);

        // Using method #1 without blocking multiple
        super.onKeyDown(keyCode, event);
        return true;
      }


    private void makeToast(String message) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show();
    }
      @Override  // <--- Add this method if you want to react to keyUp
      public boolean onKeyUp(int keyCode, KeyEvent event) {
        KeyEventModule.getInstance().onKeyUpEvent(keyCode, event);

        // There are 2 ways this can be done:
        //  1.  Override the default keyboard event behavior
        //    super.onKeyUp(keyCode, event);
        //    return true;

        //  2.  Keep default keyboard event behavior
        //    return super.onKeyUp(keyCode, event);

        // Using method #1
        super.onKeyUp(keyCode, event);
        return true;
      }

      @Override
      public boolean onKeyMultiple(int keyCode, int repeatCount, KeyEvent event) {
          KeyEventModule.getInstance().onKeyMultipleEvent(keyCode, repeatCount, event);
          return super.onKeyMultiple(keyCode, repeatCount, event);
      }
      
      @Override
    public void onWindowFocusChanged(boolean hasFocus) {
            super.onWindowFocusChanged(hasFocus);
        if (hasFocus) {
            getWindow().getDecorView()
        .setSystemUiVisibility(
                    View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                    | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                    | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                    | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                    | View.SYSTEM_UI_FLAG_FULLSCREEN
                    | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
         }
    }
}
