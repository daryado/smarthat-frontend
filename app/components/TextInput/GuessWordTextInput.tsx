import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    TextInput,
} from "react-native";
import {TextProps} from "./ITextInput";

import {colors} from "../colors";

const GuessWordTextInput = (props: TextProps) => {
  return(
      <SafeAreaView>
          <TextInput
              style={[styles.input ]}
              keyboardType="default"
              onChangeText={(text) => props.onTextChange(text)}
              onEndEditing={props.onSubmitEditing}
              placeholder={"Word......................."}
          />
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: 250,
    margin: 15,
    top: 10,
    borderRadius: 15,
    fontSize: 25,
    paddingLeft: 15,
    backgroundColor: colors.white,
  },
});

export default GuessWordTextInput;
