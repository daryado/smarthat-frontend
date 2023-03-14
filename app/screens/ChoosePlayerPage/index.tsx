import React, {FunctionComponent, useState} from "react";

// custom components
import BackButton from "../../components/Buttons/BackButton";

import logo_main from "../../../assets/pics/hat_img.png";
import { MainIcon } from "../../components/Icons/MainLogo";

import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "../../navigators/types";
import {View} from "react-native";
import PlayCode from "../../components/Details/PlayCode";
import SecretWord from "../../components/Details/SecretWord";
//import ChoosePlayersList from "../../components/Lists/ChoosePlayerList";
import ChoosePlayersList from "../../components/Lists/ChoosePlayerList";
import {playersAPI} from "../../api";
import {BottomSection, ListSection, MiddleSection, TopSection, WelcomeContainer, WordSection} from "./styles";
import {useDispatch, useSelector} from "react-redux";
import {lobbyCode, allPlayers, word} from "../../redux/selectors";
import store from "../../redux/store/store";


// Type checking
type Props = StackScreenProps<RootStackParamList, "ChoosePlayerPage">;

const ChoosePlayerPage = ({ navigation }: Props) => {

    const dispatch = useDispatch();
    const playCode = useSelector(lobbyCode);
    const playWord = useSelector(word);
    const players = useSelector(allPlayers);

    const onPlayerChosen = () => {
        playersAPI.setResumeTimer(playCode)
            .then((data) => {
                if (data.status == 200){
                    console.log("Timer resumed");
                    navigation.navigate("LeaderPage");
                } else {
                    console.log("RESUME TIMER::" + data.status);
                }
                }
            );
    };

    const guesserChosen = (name) => {
        console.log(name);
        playersAPI.guessWord({lobby_code: playCode, player_name: name, word: playWord})
            .then((data)=>{
                if (data.status == 200){
                    console.log(name);
                    // TODO: guess word
                } else {
                    console.log("Guess Word Status:" + data.status);
                }
            })

    };

    const continueGame = () => {
        playersAPI.setResumeTimer(playCode)
            .then(()=>{
                console.log("Oh no, no one guessed! We continue the round");
                navigation.navigate("LeaderPage");
            }).catch( error => {
            console.log("Resume Timer Error. Status:" + error.response.status);
        });
    };

    return (
        <>
            <WelcomeContainer>
                <TopSection>
                    <BackButton onPress={continueGame} children={''}></BackButton>
                        <MainIcon source={logo_main}></MainIcon>
                    <WordSection>
                        <SecretWord>{playWord}</SecretWord>
                    </WordSection>
                    {/*<BoldItalicText textStyles={{color:colors.yellow_code, fontSize:55, position:"absolute", right:0, marginRight:10, marginTop:80}}>QBCA</BoldItalicText>
                */}</TopSection>

                <MiddleSection>
                    <ListSection>
                        <ChoosePlayersList textStyles={{ width: "100%"}}
                                           onChoose={guesserChosen}
                                           allPlayers={players} /*onPlayerChosen={onPlayerChosen}*/ ></ChoosePlayersList>
                    </ListSection>
                </MiddleSection>

                <BottomSection>
                </BottomSection>
            </WelcomeContainer>
        </>
    );
}

export default ChoosePlayerPage;
