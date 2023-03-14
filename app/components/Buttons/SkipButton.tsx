import React, { FunctionComponent } from "react";
import styled from "styled-components/native";

import { colors } from "../colors";
import ButtonText from "../Texts/ButtonText";

import back_btn from "../../../assets/pics/back.png";
import { ButtonProps } from "./IButton";
import UsualText from "../Texts/UsualText";


const ButtonView = styled.TouchableOpacity`
    margin-left: 20px;
    border-radius: 30px;
    width: 300px;
    height: 60px;
    background-color: ${colors.yellow_button};
`

const TextView = styled.Text`
  color: ${colors.text_button};
  text-align: center;
  margin-top: 10px;
`


const SkipButton: FunctionComponent<ButtonProps> = (props) => {
//textStyles={{color: colors.text_button, textAlign: "center", marginTop: 10}}
    return(
        <ButtonView
            onPress={props.onPress}
            style={props.btnStyles}>

            <UsualText textStyles={props.textStyles}>{props.children}</UsualText>
        </ButtonView>
    );
};

export default SkipButton;
