import React, { FunctionComponent } from "react";
import styled from "styled-components/native";

import { colors } from "../colors";

const StyledText = styled.Text`
    font-size: 25px;
    color: ${colors.btn_color};
    text-align: left;
    font-family: Karla-Bold;
`;

import { TextProps } from "./types";

const ButtonText: FunctionComponent<TextProps> = (props) => {
    return <StyledText style={props.textStyles}>{props.children}</StyledText>;
}

export default ButtonText;
