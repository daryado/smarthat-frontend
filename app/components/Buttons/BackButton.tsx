import React, { FunctionComponent } from "react";
import styled from "styled-components/native";

import UsualText from "../Texts/UsualText";

import { ButtonProps } from "./IButton";


const ButtonView = styled.TouchableOpacity`
    position: absolute;
    margin-left: 20px;
`

const BackButton: FunctionComponent<ButtonProps> = (props) => {

    return(
        <ButtonView
            onPress={props.onPress}
            style={props.btnStyles}>
            <UsualText textStyles={props.textStyles}> Back </UsualText>
        </ButtonView>
        );
};


export default BackButton;
