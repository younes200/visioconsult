import React from "react";
import {
  Platform,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import { observer, inject } from "mobx-react";
import {
  Container,
  Content,
  Form,
  Button,
  Item,
  Label,
  Text,
  Input
} from "native-base";
import DateTimePicker from "react-native-modal-datetime-picker";
import { withNavigationFocus } from "react-navigation";

@withNavigationFocus
@connectActionSheet
@inject("editProfile", "session")
@observer
export default class ProfileEdit extends React.Component {
  state = {
    isDatePickerVisible: false
  };

  _showDateTimePicker = () => this.setState({ isDatePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDatePickerVisible: false });

  _handleDatePicked = date => {
    this.props.editProfile.setBirthday(date);
    this._hideDateTimePicker();
  };

  componentWillMount() {
    this.props.editProfile.refresh();
  }

  componentWillReceiveProps() {
    this.props.editProfile.onFocus(this.props.isFocused);
  }

  render() {
    return (
      <Container style={{ backgroundColor: "white" }}>
        <Content style={{ backgroundColor: "white" }}>
          <Form>
            <Item stackedLabel last>
              <Label>Presentation</Label>
              <Input
                value={this.props.editProfile.presentation}
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus
                onChangeText={text => {
                  this.props.editProfile.setPresentation(text);
                }}
              />
            </Item>

            <Item stackedLabel>
              <Label>Gender</Label>
              <Input />
            </Item>

            <Item stackedLabel>
              <Label>Birthday</Label>
              <Button transparent dark onPress={this._showDateTimePicker}>
                <Text>
                  {moment(this.props.editProfile.birthday).format("DD/MM/YYYY")}
                </Text>
              </Button>
              <DateTimePicker
                isVisible={this.state.isDatePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
                date={this.props.editProfile.birthday}
                maximumDate={moment()
                  .subtract(18, "years")
                  .toDate()}
                minimumDate={moment()
                  .subtract(80, "years")
                  .toDate()}
              />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}
