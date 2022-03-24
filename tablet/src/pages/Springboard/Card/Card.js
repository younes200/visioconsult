import React, { Component } from "react";
import I18n from "I18n";
import PropTypes from "prop-types";
import { TouchableOpacity, View } from "react-native";
import { Text, Thumbnail, Icon } from "native-base";
import { observer, inject } from "mobx-react";
import Image from "react-native-fast-image";
import styles from "./styles";
import images from "@assets/images";

@inject("springboard")
@observer
export default class Card extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.object,
    onPress: PropTypes.func
  };

  render() {
    const { title, index, content, icon, image, imageSelected } = this.props;
    const { level, selected, list } = this.props.springboard;
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[styles.cardContainer]}
      >
        {list.title == "CONTACTS" && content ? (
          <View
            style={[
              styles.button,
              selected === index && level === 0
                ? styles.selectedButtonContent
                : null
            ]}
          >
            <Image
              // large
              source={
                content.photo && content.photo.url
                  ? { uri: content.photo.url }
                  : images.avatar
              }
              style={[
                styles.buttonContent,
                { borderRadius: 35 }
                // styles.contactCard,
                // selected === index && level === 0 ? styles.selectedButton : null
              ]}
            />
          </View>
        ) : (
          <View
            style={[
              styles.button,
              selected === index && level === 0 ? styles.selectedButton : null
            ]}
            // resizeMode="contain"
          >
            <View
              style={[
                styles.buttonContent,
                selected === index && level === 0
                  ? styles.selectedButtonContent
                  : null
              ]}
            >
              <Image
                source={
                  selected === index && level === 0
                    ? imageSelected || images.webcamSelected
                    : image || images.webcam
                }
                // source={images.house}
                style={{ width: "70%", height: "70%" }}
              />
            </View>
          </View>
        )}
        <View
        // style={[
        //   selected === index && level === 0 ? styles.titleContainer : null
        // ]}
        >
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

{
  /* <Icon
type={icon ? icon.type : "MaterialCommunityIcons"}
name={icon ? icon.name : "alert-circle-outline"}
style={{
  fontSize: 160,
  color:
    selected == index && level == 0
      ? "gray"
      : icon && icon.color
        ? icon.color
        : "#ffffffff"
  // color: icon && icon.color ? icon.color : "black"
}}
/> */
}
