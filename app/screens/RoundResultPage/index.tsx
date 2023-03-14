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
import {
    creatorStartsRound,
    playerCleanOffGame,
    GameResult, changeLeader, GameContinue
} from "../../redux/actions/actions";
import {playersAPI} from "../../api";
import {BottomSection, MiddleSection, TopSection, WelcomeContainer } from "./styles";
import {useDispatch, useSelector} from "react-redux";
import { gameLeader, gameStage, isLeader, lobbyCode, username} from "../../redux/selectors";
import {GameCycle} from "../../redux/reducers/initialReducer";
import StandardYellowButton from "../../components/Buttons/StandardYellowButton";

// Type checking
type Props = StackScreenProps<RootStackParamList, "RoundResultPage">;


const RoundResultPage = ({navigation}: Props) => {
    const dispatch = useDispatch();

    const playCode = useSelector(lobbyCode);
    const playerName = useSelector(username);
    const isLead = useSelector(isLeader);
    const lead = useSelector(gameLeader)

    const [players, setPlayers] = useState([]);

    const stage = useSelector(gameStage);

    useEffect(() => {
        const interval = setInterval(() => {
            playersAPI.getRoomState(playCode)
                .then(data => {
                    setPlayers(data.data.players);

                    //if (appState.appState.is_result)
                    if (data.data.game_finished) {
                        dispatch(GameResult());
                        navigation.navigate("GameResultPage");
                        clearInterval(interval);
                    } else if (stage == GameCycle.Result) {
                        data.data.players.forEach(player => {
                            //console.log(player.name);
                            if (player.role == "Explainer") {
                                dispatch(changeLeader(player.name));
                            }
                            if (player.name == playerName) {
                                if (player.role == "Guesser") {
                                    //setSelfGuesser(true);
                                    if (data.data.time_left < 1000) {
                                        navigation.navigate('PlayerOverviewPage');
                                        //appState.appState.is_result = false;
                                    }
                                } else {
                                    //setSelfGuesser(false);
                                    if (data.data.time_left < 1000) {
                                        navigation.navigate('LeaderPage');
                                        //appState.appState.is_result = false;
                                    }
                                }
                                //console.log(player.role);
                            }
                        });
                        dispatch(GameContinue());
                    }
                })
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const startRound = () => {
        playersAPI.startRound({lobby_code: playCode})
            .then((data) => {
                    if (stage == GameCycle.Started) {
                        console.log("The leader started the round");

                        dispatch(creatorStartsRound());

                        navigation.navigate('LeaderPage');
                    }
                }
            ).catch(error => {
            console.log("Start Round Error. Status:" + error.response.status);
        });
    }

    const onBackButtonPressed = () => {
        if (!isLead) {
            playersAPI.disconnectPlayer({
                player_name: playerName,
                lobby_code: playCode
            })
                .then((data) => {
                        navigation.navigate("JoinPage");
                    }
                ).catch(error => {
                console.log("Disconnect Player Error. Status:" + error.response.status);
            }).finally(() => {
                dispatch(playerCleanOffGame())
            });
        } else {
            playersAPI.creatorEndGame(playCode)
                .then(() => {
                        console.log("The leader ends the game");
                        navigation.navigate("CreatePage");
                    }
                ).catch(error => {
                console.log("The leader can't finish the game. Status:" + error.response.status);
                navigation.navigate("StartPage");
            }).finally(() => {
                dispatch(playerCleanOffGame())
            });
        }
    }

    if (!isLead) {
        return (
            <>
                <WelcomeContainer>
                    <TopSection>
                        <BackButton onPress={() => {
                            onBackButtonPressed()
                        }}></BackButton>
                        <MainIcon source={logo_main}></MainIcon>
                    </TopSection>

                    <MiddleSection>
                        <PlayersList textStyles={{width: "90%", marginBottom: 10}} players={players}
                                     showScore={true}></PlayersList>
                    </MiddleSection>

                    <BottomSection>
                        <BoldItalicText textStyles={{width: "90%", marginBottom: 10}}>
                            Be ready! Waiting for {lead} to start the next round...
                        </BoldItalicText>
                    </BottomSection>
                </WelcomeContainer>
            </>
        );
    } else {
        return (
            <>
                <WelcomeContainer>
                    <TopSection>
                        <BackButton onPress={() => {
                            onBackButtonPressed()
                        }}></BackButton>
                        <MainIcon source={logo_main}></MainIcon>
                    </TopSection>

                    <MiddleSection>
                        <PlayersList textStyles={{width: "90%", marginBottom: 10}} players={players}
                                     showScore={true}></PlayersList>
                    </MiddleSection>

                    <BottomSection>
                        <BoldItalicText textStyles={{width: "90%", marginBottom: 10, marginLeft: 10, fontSize: 30}}>
                            Everyone is waiting! Whenever you are ready to start the next round...
                        </BoldItalicText>
                        <StandardYellowButton onPress={startRound}>Start Round</StandardYellowButton>
                    </BottomSection>
                </WelcomeContainer>
            </>
        );
    }
}

export default RoundResultPage;
