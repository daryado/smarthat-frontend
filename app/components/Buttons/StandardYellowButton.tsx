import React, { FunctionComponent } from "react";
import styled from "styled-components/native";

import { colors } from "../colors";

import { ButtonProps } from "./IButton";
import UsualText from "../Texts/UsualText";
import {StyleSheet, TouchableOpacity} from "react-native";

const ButtonView = styled.TouchableOpacity`
  text-align: center;
  align-self: center;
  font-size: 40px;
  height: 60px;
  width: 90%;
  margin-top: 20px;
  border-radius: 15px;
  justify-content: center;
  background-color: ${colors.yellow_button};
  color: ${colors.black};
   /* margin-top: 50px;
    margin-left: 90px;*/
`

const StandardYellowButton: FunctionComponent<ButtonProps> = (props) => {

    return(
        <ButtonView
            onPress={props.onPress}
            style={props.btnStyles}>
            <UsualText textStyles={styles.btn_caption}>{props.children}</UsualText>
        </ButtonView>
    );
};

const styles = StyleSheet.create({
    btn_caption: {
        textAlign: "center",
        fontSize: 32,
        color: colors.black,
    },
})

export default StandardYellowButton;
