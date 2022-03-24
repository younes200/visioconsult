#-keepclassmembers class fqcn.of.javascript.interface.for.webview {
#   public *;	#   public *;
#}	#}

-dontwarn io.branch.**
-keep public class com.dylanvann.fastimage.* {*;}
-keep public class com.dylanvann.fastimage.** {*;}


-keep class com.facebook.crypto.** {
   *;
}


-keep class io.tplus.app.BuildConfig { *; }
-dontwarn io.branch.**

-keep class com.facebook.crypto.** {
   *;
}

-keep public class com.dylanvann.fastimage.* {*;}
-keep public class com.dylanvann.fastimage.** {*;}