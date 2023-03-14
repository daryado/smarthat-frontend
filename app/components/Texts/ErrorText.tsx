import React, { FunctionComponent } from "react";
import styled from "styled-components/native";

import { colors } from "../colors";

import { TextProps } from "./types";

const StyledText = styled.Text`
    /*font-size: 32px;*/
    font-size: 16px;
    color: ${colors.red};
  align-self: flex-end;

  font-family: Karla-Regular;
/*        margin-top: 20px;
        margin-left: 40px;*/
`;


const ErrorText: FunctionComponent<TextProps> = (props) => {
    return <StyledText style={props.textStyles}>{props.children}</StyledText>;
}

export default ErrorText;
