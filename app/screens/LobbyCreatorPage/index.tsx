import React, {FunctionComponent, useState, useEffect} from "react";

// custom components
import { Container } from "../../components/shared";
import BackButton from "../../components/Buttons/BackButton";

import logo_main from "../../../assets/pics/hat_img.png";
import { MainIcon } from "../../components/Icons/MainLogo";
import BoldItalicText from "../../components/Texts/BoldItalicText";
import PlayersList from "../../components/Lists/PlayersList";

import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "../../navigators/types";
import PlayCode from "../../components/Details/PlayCode";
import {creatorStartsGame, playerCleanOffGame} from "../../redux/actions/actions";
import store from "../../redux/store/store";
import {playersAPI} from "../../api";
import {BottomSection, MiddleSection, TopSection, MainContainer, CodeSection} from "./styles";
import {useDispatch, useSelector} from "react-redux";
import {lobbyCode, current_state} from "../../redux/selectors";
import StandardYellowButton from "../../components/Buttons/StandardYellowButton";

type Props = StackScreenProps<RootStackParamList, "LobbyCreatorPage">;

const LobbyCreatorPage = ({navigation}: Props) => {
    const dispatch = useDispatch();
    const playCode = useSelector(lobbyCode);
    const currentState = useSelector(current_state);

    const [players, setPlayers] = useState([]);

    useEffect(() => {
        console.log(playCode)
        const interval = setInterval(() => {
            playersAPI.getRoomState(playCode)
                .then(data => {
                    setPlayers(data.data.players);
                    if (data.data.game_started) {
                        dispatch(creatorStartsGame());
                        clearInterval(interval);

                        console.log('Game started...')
                        navigation.navigate("LeaderPage");
                    }
                }).catch(error =>
                console.log('Lobby leader. Error:' + error)
            )
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const onPlayButtonPressed = () => {

        playersAPI.startGame({lobby_code: playCode})
            .then((data) => {
                    console.log("The leader started the game");
                    store.dispatch(creatorStartsGame());


                    console.log(currentState)
                    navigation.navigate("LeaderPage");
                    // appState.appState.is_result = true;
                    //navigation.navigate('RoundResultPage');
                }
            ).catch(error => {
            console.log('Failed to start the game. Status was: ' + error.response.status);
        })
    };

    const onBackButtonPressed = () => {
        playersAPI.creatorEndGame(playCode)
            .then((data) => {
                    console.log("The creator has deleted the game");
                    dispatch(playerCleanOffGame());
                    navigation.navigate("CreatePage")
                }
            ).catch(error => {
            console.log('Failed to clear the game. Status was: ' + error.response.status);
        })
    }

    return (
        <>
            <MainContainer>
                <TopSection>
                    <BackButton onPress={() => {
                        onBackButtonPressed();
                    }}>
                        Get Started
                    </BackButton>
                    <CodeSection>
                        <MainIcon source={logo_main}></MainIcon>
                        <PlayCode>{playCode}</PlayCode>
                    </CodeSection>
                </TopSection>

                <MiddleSection>
                    <PlayersList textStyles={{width: "90%", marginBottom: 10}} players={players}
                                 showScore={false}></PlayersList>
                </MiddleSection>

                <BottomSection>{
                    players.length >= 0 ?

                        <StandardYellowButton onPress={() => {
                            onPlayButtonPressed();
                        }}>
                            Start game
                        </StandardYellowButton>
                        :
                        <BoldItalicText textStyles={{width: "90%", marginBottom: 10, alignSelf: "center"}}>
                            At least 3 players are needed!...
                        </BoldItalicText>
                }
                </BottomSection>
            </MainContainer>
        </>
    );
}

export default LobbyCreatorPage;
