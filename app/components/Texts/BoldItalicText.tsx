import React, { FunctionComponent } from "react";
import styled from "styled-components/native";

import { colors } from "../colors";

import { TextProps } from "./types";

const StyledText = styled.Text`
    font-size: 35px;
    text-align: center;
    color: ${ colors.primary};
    font-family: Karla-BoldItalic;
`;


const BoldItalicText: FunctionComponent<TextProps> = (props) => {
    return <StyledText style={props.textStyles}>{props.children}</StyledText>;
}

export default BoldItalicText;
