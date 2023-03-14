import React, { FunctionComponent } from "react";
import styled from "styled-components/native";

import { colors } from "../colors";

import BoldItalicText from "../Texts/BoldItalicText";
import {TextProps} from "../Texts/types";
import UsualText from "../Texts/UsualText";


const StyledWord = styled.Text`
  color: ${colors.white};
  font-size:48px;
  text-align: center;
  right:0;
  
  font-family: Karla-Bold;
  margin-right:10px;
  margin-top:30px;
`

const SecretWord: FunctionComponent<TextProps> = (props) => {/*
    return <StyledText style={props.textStyles}>{props.children}</StyledText>;*/
    return <>
        <UsualText  textStyles={{textAlign: "center"}} >Your word:</UsualText>
        <StyledWord style={props.textStyles}>{props.children}</StyledWord>
    </>
}

export default SecretWord;
