import React, { FunctionComponent } from "react";
import styled from "styled-components/native";

import { colors } from "../colors";

import BoldItalicText from "../Texts/BoldItalicText";
import {TextProps} from "../Texts/types";

const StyledText = styled.Text`
    font-size: 32px;
    color: ${colors.red};

    font-family: Karla-BoldItalic;
        margin-top: 20px;
        margin-left: 40px;
`;


const StyledCode = styled.Text`
  color: ${colors.yellow_code};
  font-size:55px;
  position: absolute;
  right:0;
  
  font-family: Karla-BoldItalic;
  margin-right:10px;
  margin-top:80px;
`

const PlayCode: FunctionComponent<TextProps> = (props) => {/*
    return <StyledText style={props.textStyles}>{props.children}</StyledText>;*/
    return <>
        <StyledCode style={props.textStyles}>{props.children}</StyledCode>
    </>
}

export default PlayCode;
