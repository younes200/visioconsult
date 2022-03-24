import { Dimensions, Platform, StatusBar } from "react-native";

export function isAndroid() {
  return !isIphoneX() && Platform.OS === "android";
}

export function isIphoneX() {
  const dimen = Dimensions.get("window");
  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 || dimen.width === 812)
  );
}

// from : https://github.com/PimpTrizkit/PJs/wiki/12.-Shade,-Blend-and-Convert-a-Web-Color-(pSBC.js)
export function convertHex(hex, opacity) {
  hex = hex.replace("#", "");
  r = parseInt(hex.substring(0, 2), 16);
  g = parseInt(hex.substring(2, 4), 16);
  b = parseInt(hex.substring(4, 6), 16);

  result = `rgba(${r},${g},${b},${opacity / 100})`;
  return result;
}

export function shadeColor(p, from, to) {
  if (
    typeof p !== "number" ||
    p < -1 ||
    p > 1 ||
    typeof from !== "string" ||
    (from[0] != "r" && from[0] != "#") ||
    (to && typeof to !== "string")
  )
    return null; // ErrorCheck
  if (!this.pSBCr)
    this.pSBCr = d => {
      const l = d.length;

      const RGB = {};
      if (l > 9) {
        d = d.split(",");
        if (d.length < 3 || d.length > 4) return null; // ErrorCheck
        (RGB[0] = i(d[0].split("(")[1])),
          (RGB[1] = i(d[1])),
          (RGB[2] = i(d[2])),
          (RGB[3] = d[3] ? parseFloat(d[3]) : -1);
      } else {
        if (l == 8 || l == 6 || l < 4) return null; // ErrorCheck
        if (l < 6)
          d = `#${d[1]}${d[1]}${d[2]}${d[2]}${d[3]}${d[3]}${
            l > 4 ? `${d[4]}${d[4]}` : ""
          }`; // 3 or 4 digit
        (d = i(d.slice(1), 16)),
          (RGB[0] = (d >> 16) & 255),
          (RGB[1] = (d >> 8) & 255),
          (RGB[2] = d & 255),
          (RGB[3] = -1);
        if (l == 9 || l == 5)
          (RGB[3] = r((RGB[2] / 255) * 10000) / 10000),
            (RGB[2] = RGB[1]),
            (RGB[1] = RGB[0]),
            (RGB[0] = (d >> 24) & 255);
      }
      return RGB;
    };
  var i = parseInt;

  var r = Math.round;

  var h = from.length > 9;

  var h =
    typeof to === "string"
      ? to.length > 9
        ? true
        : to == "c"
          ? !h
          : false
      : h;

  const b = p < 0;

  var p = b ? p * -1 : p;

  var to = to && to != "c" ? to : b ? "#000000" : "#FFFFFF";

  const f = this.pSBCr(from);

  const t = this.pSBCr(to);
  if (!f || !t) return null; // ErrorCheck
  if (h)
    return `rgb${f[3] > -1 || t[3] > -1 ? "a(" : "("}${r(
      (t[0] - f[0]) * p + f[0]
    )},${r((t[1] - f[1]) * p + f[1])},${r((t[2] - f[2]) * p + f[2])}${
      f[3] < 0 && t[3] < 0
        ? ")"
        : `,${
            f[3] > -1 && t[3] > -1
              ? r(((t[3] - f[3]) * p + f[3]) * 10000) / 10000
              : t[3] < 0
                ? f[3]
                : t[3]
          })`
    }`;
  return `#${(
    0x100000000 +
    r((t[0] - f[0]) * p + f[0]) * 0x1000000 +
    r((t[1] - f[1]) * p + f[1]) * 0x10000 +
    r((t[2] - f[2]) * p + f[2]) * 0x100 +
    (f[3] > -1 && t[3] > -1
      ? r(((t[3] - f[3]) * p + f[3]) * 255)
      : t[3] > -1
        ? r(t[3] * 255)
        : f[3] > -1
          ? r(f[3] * 255)
          : 255)
  )
    .toString(16)
    .slice(1, f[3] > -1 || t[3] > -1 ? undefined : -2)}`;
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}

export function ifAndroid(androidStyle, regularStyle) {
  if (isAndroid()) {
    return androidStyle;
  }
  return regularStyle;
}

export function getHeaderPadding() {
  return Platform.select({
    ios: {
      ...ifIphoneX(
        {
          paddingTop: 20
        },
        {}
      )
    },
    android: { height: StatusBar.currentHeight + 20 }
  });
}

export function getStatusBarHeight() {
  if (Platform.OS === "ios") {
    return ifIphoneX(44, 20);
  }

  return StatusBar.currentHeight;
}
