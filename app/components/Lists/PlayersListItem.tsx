import React, { FunctionComponent } from "react";
import styled from "styled-components/native";

import {
    GestureResponderEvent,
    StyleProp,
    TextStyle,
    ViewStyle,
} from "react-native";
import UsualText from "../Texts/UsualText";
import { colors } from "../colors";

const IthemView = styled.View`
    margin-top: 10px;
`


export interface ListProps {
    textStyles?: StyleProp<TextStyle>;
    name: string;
    color: string;
}

interface IPlayersListIthem {
    name: string;
}

export interface IUser {
    textStyles?: StyleProp<TextStyle>;
    color: string;
    name: string;
}

const ColoredCircle = styled.View`
    weight: 10;
    background-color: ${colors.secondary};
    borderRadius: 5;
`

const PlayersListItem = (props: { }) => {

    return(
        <IthemView>
                <ColoredCircle/>
                {/*<UsualText textStyles={props.textStyles}> {data.name} </UsualText>
        */}
        </IthemView>
        );
};

export default PlayersListItem;
