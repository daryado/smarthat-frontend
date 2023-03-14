import React, { useEffect, useState} from "react";

// custom components
import { Container } from "../../components/shared";
import BackButton from "../../components/Buttons/BackButton";

import logo_main from "../../../assets/pics/hat_img.png";
import { MainIcon } from "../../components/Icons/MainLogo";
import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "../../navigators/types";
import SecretWord from "../../components/Details/SecretWord";
import {
    playerCleanOffGame,
    InGameSetWord,
    GameResult
} from "../../redux/actions/actions";
import {playersAPI} from "../../api";
import BoldItalicText from "../../components/Texts/BoldItalicText";
import {BottomSection, MiddleSection, TopSection, WelcomeContainer } from "./styles";
import {useDispatch, useSelector} from "react-redux";
import {lobbyCode, username} from "../../redux/selectors";
import StandardYellowButton from "../../components/Buttons/StandardYellowButton";

type Props = StackScreenProps<RootStackParamList, "LeaderPage">;

const LeaderPage = ({ navigation }: Props) => {
    /*useEffect(()=>{
        const interval = setInterval(() => {
            if (store.getState().initReducer.started){
                navigation.navigate("PlayerOverview");
            }
            if (store.getState().initReducer.leader == ""){
                store.dispatch(playerCleanOffGame());
                navigation.navigate("JoinPage");
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);*/
    const dispatch = useDispatch();
    const [time, setTime] = useState(0);
    const [word, setWord] = useState("");
    const playCode = useSelector(lobbyCode);
    const playerName = useSelector(username);

    useEffect(()=>{
        /*playersAPI.startRound({lobby_code: store.getState().initReducer.lobbyCode})
            .then((data) => {
                    if (data.status == 200) {
                        console.log("CREATOR_STARTS_ROUND");
                        store.dispatch(creatorStartsRound());

                    } else {
                        console.log('Status was: ' + data.status);
                    }
                }
            );
        */
        const interval = setInterval(() => {
            updateTimer(interval);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const updateTimer = (interval) => {
        playersAPI.getRoomState(playCode)
            .then((data) => {
                    setTime(data.data.time_left);
                    if (data.data.game_finished)
                    {
                        dispatch(GameResult());
                        clearInterval(interval);
                        navigation.navigate("GameResultPage");
                    }
                    if (data.data.time_left < 0 ) //data.data.time_left > 1000
                    {
                        playersAPI.endRound(playCode).then( () => {
                                //window.location.reload(false);
                                //appState.appState.is_result = true;
                            }
                        );
                        dispatch(GameResult());
                        clearInterval(interval);
                        navigation.navigate("RoundResultPage");
                    }
                }
            ).catch(error => {
            console.log("Leader Get State Error. Status:" + error.response.status);

            dispatch(playerCleanOffGame());

            playersAPI.disconnectPlayer({lobby_code: playCode, player_name: playerName})
                .catch(error => {
                    console.log("Leader Disconnect Error. Status:" + error.response.status);
                }
            );
            clearInterval(interval);
            navigation.navigate("StartPage");
        });

        playersAPI.getLeaderGuessWord(playCode)
            .then((data)=>{
                    setWord(data.data.word);
                    dispatch(InGameSetWord(data.data.word));
            }).catch(error => {
                console.log("Leader Get Word Error. Status:" + error.response.status);
            }
        )}

    const skipWord = () => {
        playersAPI.setNextWord(playCode)
            .then((data) => {
                    console.log("Skip Word" + data.data.word);
                    dispatch(InGameSetWord(data.data.word));
                }
            ).catch( error => {
            console.log("Skip Word Error. Status:" + error.response.status);
        });
    };

    const wordGuessed =  () => {
         playersAPI.setStopTimer(playCode)
            .then((data) => {
                    console.log("Timer stopped");
                    navigation.navigate("ChoosePlayerPage");
                }
            ).catch( error => {
            console.log("Guess Word Error. Status:" + error.response.status);
        });
    };

    const onBackButtonPressed = () => {
        playersAPI.creatorEndGame(playCode)
            .then(() => {
                        console.log("The leader interrupts the game");
                }
            ).catch(error => {
                console.log("The leader cannot interrupt the game. Status:" + error.response.status);
                playersAPI.disconnectPlayer({player_name: playerName, lobby_code: playCode})
        })
            .finally( () => {
            dispatch(playerCleanOffGame())
            navigation.navigate("CreatePage");
        }
        );
    }

  return (
      <>
        <WelcomeContainer>
          <TopSection>
            <BackButton onPress={()=>{onBackButtonPressed()}}>
              Get Started
            </BackButton>
            <MainIcon source={logo_main}></MainIcon>
          </TopSection>

          <MiddleSection>
              <SecretWord>{word}</SecretWord>
              <BoldItalicText>{time}</BoldItalicText>
          </MiddleSection>

          <BottomSection>
              <StandardYellowButton onPress={skipWord}>Skip this word</StandardYellowButton>
              <StandardYellowButton onPress={wordGuessed}>The word is guessed</StandardYellowButton>
          </BottomSection>
        </WelcomeContainer>
      </>
  );
}

export default LeaderPage;
