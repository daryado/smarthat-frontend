import React, {FunctionComponent, useEffect, useState} from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import { colors } from "../../components/colors";

// custom components
import { Container } from "../../components/shared";
import BackButton from "../../components/Buttons/BackButton";
import BoldItalicText from "../../components/Texts/BoldItalicText";
import PlayersList from "../../components/Lists/PlayersList";

import logo_main from "../../../assets/pics/hat_img.png";
import { MainIcon } from "../../components/Icons/MainLogo";
import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "../../navigators/types";
import { creatorStartsGame, creatorStartsRound, playerCleanOffGame, InGameSetWord} from "../../redux/actions/actions";
import {playersAPI} from "../../api";
import {BottomSection, MiddleSection, TopSection, WelcomeContainer } from "./styles";
import {useDispatch, useSelector} from "react-redux";
//import { gameSelectors } from "app/redux";
import {lobbyCode, username} from "../../redux/selectors";


// Type checking
type Props = StackScreenProps<RootStackParamList, "GameResultPage">;


const GameResultPage = ({navigation}: Props) => {
    const dispatch = useDispatch();

    const playCode = useSelector(lobbyCode);
    const playerName = useSelector(username);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        playersAPI.getRoomState(playCode)
            .then(data => {
                setPlayers(data.data.players);
            })
    }, []);

    const disconnect = () => {
        playersAPI.disconnectPlayer({
            player_name: playerName,
            lobby_code: playCode
        })
            .catch(error => {
                console.log("Disconnect Player Error. Status:" + error.response.status);
            }).finally(() => {
            dispatch(playerCleanOffGame());
            navigation.navigate("StartPage");
        });
    }

    return (
        <>
            <WelcomeContainer>
                <TopSection>
                    <BackButton onPress={() => {
                        disconnect()
                    }}></BackButton>
                    <MainIcon source={logo_main}></MainIcon>
                </TopSection>

                <MiddleSection>
                    <PlayersList textStyles={{width: "90%", marginBottom: 10}} players={players}
                                 showScore={true}></PlayersList>
                </MiddleSection>

                <BottomSection>
                    <BoldItalicText textStyles={{width: "90%", marginBottom: 10}}>
                        Game is finished! You can return to main menu with the "Back" button at the top left.
                    </BoldItalicText>
                </BottomSection>
            </WelcomeContainer>
        </>
    );
}

export default GameResultPage;
