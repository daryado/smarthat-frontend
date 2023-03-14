import React, { FunctionComponent } from "react";
import styled from "styled-components/native";

import { colors } from "../colors";

import { TextProps } from "./types";

const StyledText = styled.Text`
    font-size: 22px;
    color: ${colors.white};
    text-align: center;
    font-family: Karla-Regular;
`;


const SubHeaderText: FunctionComponent<TextProps> = (props) => {
    return <StyledText style={props.textStyles}>{props.children}</StyledText>;
}

export default SubHeaderText;
<StyledText>SubHeaderText</StyledText>
