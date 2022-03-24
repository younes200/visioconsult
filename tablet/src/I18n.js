import I18n from "react-native-i18n";
import moment from "moment";
import translations from "../translations";
import "moment/locale/fr";

I18n.fallbacks = true;
I18n.translations = translations;
I18n.defaultLocale = "en";

I18n.has = key =>
  I18n.locale in translations && key in translations[I18n.locale];

const short = I18n.locale.split("-")[0];
// I18n.shortLocale = I18n.has(short) ? short : I18n.defaultLocale;

I18n.shortLocale = short;

moment.locale(I18n.shortLocale);

export default I18n;
