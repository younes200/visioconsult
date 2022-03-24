import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import I18n from "react-native-i18n";

export const RichI18n = props => {
  const {
    id,
    values,
    baseComponent,
    baseComponentStyle,
    baseComponentProps,
    ...other
  } = props;
  // get the translations interpoling the placeholder by itself
  const keys = Object.keys(values);
  const placeHolders = {};
  keys.forEach(key => (placeHolders[key] = `{{${key}}}`));
  const translation = I18n.t(id, { ...(other || {}), ...placeHolders }) || "";
  // split the translated string, using default i18n-js regex, odd indexes will correlate to a key to be interpolated
  // https://github.com/fnando/i18n-js/blob/master/app/assets/javascripts/i18n.js
  const splitted = translation.split(/(?:\{\{|%\{)(.*?)(?:\}\}?)/gm);
  const interpolated = [];
  splitted.forEach((str, idx) => {
    if (idx % 2 === 0) {
      interpolated.push(str);
    } else {
      const child = values[str];
      if (typeof child === "string") {
        interpolated.push(child);
      } else {
        interpolated.push(React.cloneElement(child, { key: idx }));
      }
    }
  });
  const BaseComponent = baseComponent;
  return (
    <BaseComponent style={baseComponentStyle} {...baseComponentProps}>
      {interpolated}
    </BaseComponent>
  );
};

RichI18n.propTypes = {
  id: PropTypes.string.isRequired,
  values: PropTypes.object,
  baseComponent: PropTypes.any,
  baseComponentStyle: PropTypes.object,
  baseComponentProps: PropTypes.object
};

RichI18n.defaultProps = {
  values: {},
  baseComponent: Text,
  baseComponentStyle: {},
  baseComponentProps: {}
};
