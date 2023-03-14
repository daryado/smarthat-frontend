import styled from "styled-components/native";
import React, {FunctionComponent, useState} from "react";
import {FlatList, StyleProp, TextStyle, View} from "react-native";
import target_source from "../../../assets/target.png";
import {Target} from "../Icons/Target";
import UsualText from "../Texts/UsualText";

interface ItemContainerProps {
    selected?: string;
}

interface ItemContainerProps2 {
    red : bigint,
    green : bigint,
    blue : bigint
}

const ColoredCircle = styled.View<ItemContainerProps>`
  border-radius: 8px;
  height: 17px;
  width: 17px;
  background-color: ${({selected}) => (selected)};
`

const ColoredCircle2 = styled.View<ItemContainerProps2>`
  border-radius: 8px;
  height: 17px;
  width: 17px;
  background-color: (${({selected}) => 'rgb(' + selected.red +', ' + selected.green + ', ' + selected.blue + ')'});
`

function getPoint(playerName : string, radius : number):number[] {
    let point = getRandom(playerName);

    return [Math.cos(point) * (10.5 - radius), Math.sin(point) * (10.5 - radius)];
}

const cyrb53 = (str, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }

  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

function getRandom(playerName : string) {
    return cyrb53(playerName);
}

export interface UserWordProps {
    color: string;
    distance: number;
    board : object[];
}

const AliveTarget: FunctionComponent<UserWordProps> = (props) => {
    //console.log(props.board);
    return(
        <>
            <Target  source={target_source}></Target>
            {props.board.map((item) => (
                <View style={{
                    height:'90%',
                    width:'100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position:'absolute',
                    left:getPoint(item.player_name + item.word, item.similarity)[0]*18,
                    top:getPoint(item.player_name + item.word, item.similarity)[1]*18,
                }}>
                    <ColoredCircle2 selected={item.color}/>
                </View>
            ))}
        </>
    );
}


export default AliveTarget;
