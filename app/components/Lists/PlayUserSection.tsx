import React, {useState} from "react";
import styled from "styled-components/native";

// components
import logo1 from "../../../assets/icon.png";
import PlayUserItem from "./PlayUserItem";

const PlayUserList = styled.FlatList`
  width: 100%;
  padding-left: 25px;
  flex: 1;
  padding-bottom: 15px;
`;

const PlayUserSection = (props: { data?: object[]; navigation: any }) => {
    const handlePress = () => {
        /*props.navigation.navigate("User");*/
    };

    const [players, setPlayers] = useState(
        [
            {
                id: 1,
                name: 'PlayerNicknameHere',
                color: 'blue',
            },
            {
                id: 2,
                name: 'qwerty',
                color: 'green',
            },
            {
                id: 3,
                name: 'Петя1234',
                color: 'pink',
            },
            {
                id: 4,
                name: 'Вася',
                color: 'yellow',
            },
        ]
    );

    return (
        <PlayUserList
            /* data={[
                 { account: "3845757744", balance: 20000.5, logo: logo1 },
                 { account: "3845737744", balance: 20000.5, logo: logo1 },
                 { account: "3845257744", balance: 20000.5, logo: logo1 },
             ]}*/
            data={players}
            contentContainerStyle={{
                paddingRight: 25,
                alignItems: "center",
            }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            renderItem={({ item }: any) => (
                <PlayUserItem
                    color={item.color}
                    name={item.name}
                    playerId={item.id}
                />
            )}
        />
    );
};

const PlayUserSection2 = (props: { data?: object[]; navigation: any; players : object[]; }) => {
    const handlePress = () => {
        /*props.navigation.navigate("User");*/
    };
    //console.log(props.allPlayers);
    return (
        <PlayUserList
            //data={props.allPlayers}
            data={ props.players.filter(p => {
                return p.role != "Explainer";
            }) }
            contentContainerStyle={{
                paddingRight: 25,
                alignItems: "center",
            }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            renderItem={({ item }: any) => (
                <PlayUserItem
                    color={item.color}
                    name={item.name}
                />
            )}
        />
    );
};

export default PlayUserSection;
export default PlayUserSection2;
