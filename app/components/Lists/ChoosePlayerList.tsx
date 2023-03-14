import React, {FormEvent, FunctionComponent, useEffect, useState} from "react";
import styled from "styled-components/native";

import {
    FlatList,
    GestureResponderEvent,
    StyleProp,
    TextStyle, View,
    ViewStyle,
} from "react-native";
import UsualText from "../Texts/UsualText";
import FlatListItemSeparator from "./FlatListItemSeparator";
import store from "../../redux/store/store";

const ListView = styled.View`
`

export interface ChooseListProps {
    textStyles?: StyleProp<TextStyle>;
    allPlayers?: [] | any[];
    onChoose: ((event: GestureResponderEvent) => void) | ((e?: FormEvent<HTMLFormElement>) => void) |undefined;
}

/*const ColoredCircle = styled.View`
    background-color: ${(props) => props.bg};
`*/

interface ItemContainerProps {
    selected?: string;
}

const ColoredCircle = styled.View<ItemContainerProps>`
  display: flex;
  border-radius: 6px;
  height: 12px;
  width: 12px;
  background-color: ${({selected}) => (selected)};
  margin-right: 15px;
`

const TouchableRow = styled.TouchableOpacity`
  margin-top: 20px;
  margin-left: 20px;
`


const ChoosePlayersList: FunctionComponent<ChooseListProps> = (props) => {
    const players = props.allPlayers;
   // const [allPlayers, setPlayers] = useState([]);

   /* useEffect(() => {
            playersAPI.getRoomState(store.getState().initReducer.lobbyCode)
                .then((data) => {
                        console.log(data.data.allPlayers);
                        setPlayers(data.data.allPlayers);
                    }
                )
        }, []);*/



    const onePlayer = ({item}: any) => (
        <UsualText>{item.name}</UsualText>
    )

    return(
        <View>
            <FlatList
                data={ players.filter(p => {
                               return p.name !== store.getState().initReducer.username;
                             }) }
                renderItem={({ item }: any) => (
                    <>
                        <TouchableRow style={{flexDirection: "row" }} onPress={props.onChoose(item.name)}>
                            <ColoredCircle selected={item.color}/>
                            <UsualText textStyles={props.textStyles}> {item.name}
                            </UsualText>
                        </TouchableRow>

                        <FlatListItemSeparator/>
                    </>
                )}
            />
        </View>
    );
};

export default ChoosePlayersList;

