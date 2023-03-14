import React, {FunctionComponent, useEffect, useState} from "react";
import styled from "styled-components/native";

import {FlatList, StyleProp, TextStyle, View,} from "react-native";
import UsualText2 from "../Texts/UsualText";
import {PlayerColor} from "../../types";

const ListView = styled.View`
`

export interface ListProps {
    textStyles?: StyleProp<TextStyle>;
    players : [] | any[];
    showScore : boolean;
    username? : string;
    playCode? : string;
}



interface ItemContainerProps {
    item_color?: string;
}

interface ItemContainerProps2 {
    red : bigint,
    green : bigint,
    blue : bigint
}

export function decToHex(num = 0 )
{
    let hex = Number(num).toString(16).toUpperCase();
    if (hex.length < 2){
        hex += '0';
    }
    return hex;
}

export function colorToStr(col : PlayerColor )
{
    return "#" + decToHex(col.red) + decToHex(col.green) + decToHex(col.blue);
}

const ColoredCircle = styled.View<ItemContainerProps>`
  display: flex;
  border-radius: 6px;
  height: 12px;
  width: 12px;
  background-color: ${({item_color}) => (item_color)};
  margin-right: 15px;
`


const ColoredCircle2 = styled.View<ItemContainerProps2>`
  display: flex;
  border-radius: 6px;
  height: 12px;
  width: 12px;
  background-color: (${({selected}) => 'rgb(' + selected.red +', ' + selected.green + ', ' + selected.blue + ')'});
  margin-right: 15px;
`


const ViewRow = styled.View`
  margin-left: 20px;
`

const PlayersList: FunctionComponent<ListProps> = (props) => {

    const [playerName, setPlayerName] = useState(props.username);

    if (props.showScore)
    {
        var sortedPlayers = props.players.sort((a, b) =>
            {
                if (a.score == b.score)
                {
                    return a.name.localeCompare(b.name);
                }
                return b.score - a.score;
            }
        );

        return(
            <View>
                <FlatList
                    data={ sortedPlayers }
                    renderItem={({ item }: any) => (
                        <ViewRow style={{flexDirection: "row" }}>
                            <ColoredCircle2 selected={item.color}/>
                            <UsualText2 textStyles={props.textStyles} selfName={playerName} itemName={item.name}>
                                {item.name} - {item.score}
                            </UsualText2>
                        </ViewRow>
                    )}
                />
            </View>
            );
    }
    else
    {
        return(
            <View>
                <FlatList
                    data={ props.players }
                    renderItem={({ item }: any) => (
                        <ViewRow style={{flexDirection: "row" }}>
                            <ColoredCircle2 selected={item.color}/>
                            <UsualText2 textStyles={props.textStyles} selfName={playerName} itemName={item.name}>
                                {item.name}
                            </UsualText2>
                        </ViewRow>
                    )}
                />
            </View>
            );
    }
};

export default PlayersList;

