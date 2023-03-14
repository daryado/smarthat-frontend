import React, { FunctionComponent } from "react";
import styled from "styled-components/native";

import { colors } from "../colors";

interface ItemContainerProps2 {
    weight : string;
}

const StyledText = styled.Text`
    font-size: 25px;
    color: ${colors.white};
    text-align: left;
    font-family: Karla-Regular;
`;

const StyledText2 = styled.Text<ItemContainerProps2>`
    font-size: 25px;
    color: ${colors.white};
    text-align: left;
    font-family: Karla-Regular;
    font-weight: ${({weight}) => (weight)};
`;

import { TextProps } from "./types";

const UsualText: FunctionComponent<TextProps> = (props) => {
    return <StyledText style={props.textStyles}>{props.children}</StyledText>;
}

const UsualText2: FunctionComponent<TextProps> = (props) => {
    let weight = props.selfName == props.itemName ? "bold" : "normal";
    return <StyledText2 style={props.textStyles} weight={weight}>{props.children}</StyledText2>;
}

export default UsualText;
export default UsualText2;
