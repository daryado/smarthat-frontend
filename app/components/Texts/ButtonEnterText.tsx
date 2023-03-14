import React, { FunctionComponent } from "react";
import styled from "styled-components/native";

import { colors } from "../colors";

import { TextProps } from "./types";

const StyledText = styled.Text`
    font-size: 32px;
    color: ${colors.white};

    font-family: Karla-BoldItalic;
        /*margin-top: 10px;
        margin-left: 0px;*/
`;


const BoldItalicText: FunctionComponent<TextProps> = (props) => {
    return <StyledText style={props.textStyles}>{props.children}</StyledText>;
}

export default BoldItalicText;
