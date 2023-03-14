import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";

//colors
import { colors } from "../colors";
import UsualText from "../Texts/UsualText";
import SmallText from "../Texts/SmallText";
import { ScreenWidth } from "../shared";
import BoldItalicText from "../Texts/BoldItalicText";

const CardBackground = styled.ImageBackground`
  height: 55%;
  width: ${ScreenWidth * 0.5}px;
  resize-mode: cover;
  margin-right: 25px;
  overflow: hidden;
`;

const CardTouchable = styled.TouchableHighlight`
  height: 100%;
  border-radius: 25px;
`;

interface ItemContainerProps2 {
    red : bigint,
    green : bigint,
    blue : bigint
}

const TouchableView = styled.View`
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-width: 10px;
  flex: 1;
`;

const TouchableView2 = styled.View<ItemContainerProps2>`
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-width: 10px;
  border-color: (${({selected}) => 'rgb(' + selected.red +', ' + selected.green + ', ' + selected.blue + ')'});
  flex: 1;
`;

const CardRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

interface CardItemProps {
    playerId: number;
    color: string;
    name: string;
}

const PlayUserItem = (props: CardItemProps) => {
    //console.log(props);
    return (
        <CardBackground
            //  source={require("./../../assets/bgs/background_transparent.png")}
        >
            <CardTouchable
                underlayColor={colors.secondary}
                //  onPress={() => props.handlePress(props.balance)}
                onPress={() => {}}
            >
                <TouchableView2 selected={props.color}>
                    {/*<CardRow>
                        <ColoredCircle selected={props.color}/>
                    </CardRow>*/}
                    <CardRow>
                        <BoldItalicText textStyles={{ color: colors.white }}>
                            {props.name}
                        </BoldItalicText>
                        {/* <View style={{ flex: 3 }}>
                            <SmallText
                                textStyles={{ marginBottom: 5, color: colors.green }}
                            >
                                Total balance
                            </SmallText>

                        </View>
                        <Logo source={props.logo} />*/}
                    </CardRow>
                </TouchableView2>
            </CardTouchable>
        </CardBackground>
    );
};

export default PlayUserItem;
