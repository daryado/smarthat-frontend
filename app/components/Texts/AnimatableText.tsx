import React, { FunctionComponent } from "react";
import styled from "styled-components/native";

import { colors } from "../colors";

interface ItemContainerProps2 {
    weight : string;
    time : number;
}

const StyledText2 = styled.Text<ItemContainerProps2>`
    font-size: ${({weight}) => (weight)};
    color: rgb(0,0,0);
    text-align: center;
    font-family: Karla-Regular;
`;

import { TextProps } from "./types";

const AnimatableText: FunctionComponent<TextProps> = (props) => {
    const size = props.time <= 0 ? 0 : Math.trunc((1 - props.time) * 30);
    //console.log(size);
    let str = ((size < 0) ? 0 : size)  + "px";
    return <StyledText2 style={props.textStyles} weight={str}>New word!</StyledText2>;
}

export default AnimatableText;
