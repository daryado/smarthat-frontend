import React, {FunctionComponent} from "react";
import {SafeAreaView, StyleProp, StyleSheet, TextInput, TextStyle, ViewStyle} from "react-native";
import { colors } from "../colors";

export interface TextProps {
    onSubmitEditing?: any | undefined;
    didTouch?: any | undefined;
    autoFocus?: boolean | undefined;
    onTextChange: Function;
    style?: StyleProp<TextStyle>;
}

export interface TextInputProps {
    ref1 : object;
    onSubmitEditing1 : ({ nativeEvent: { text, eventCount, target }}) => void;
}

const ITextInput: FunctionComponent<TextProps> = (placeholder, keyboardType, ref1, onSubmitEditing1) => {

  const [text, onChangeText] = React.useState(null);

  return (
      <TextInput
        ref = {ref1}
        onChangeText={onChangeText}
        onEndEditing={onSubmitEditing1}
        value={text}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
  );
};

export default ITextInput;
