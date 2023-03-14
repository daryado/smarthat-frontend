import React, {FunctionComponent, useState, useEffect, useRef} from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import { colors } from "../../components/colors";
import {Animated, SafeAreaView, View} from 'react-native';

// custom components
import { Container } from "../../components/shared";
import BigText from "../../components/Texts/BigText";
import UsualText from "../../components/Texts/UsualText";
import BackButton from "../../components/Buttons/BackButton";

import logo_main from "../../../assets/pics/hat_img.png";
import { MainIcon } from "../../components/Icons/MainLogo";

import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "../../navigators/types";

import AliveTarget from "../../components/Animate/AliveTarget";
import {playersAPI} from "../../api";

import GuessWordTextInput from "../../components/TextInput/GuessWordTextInput";
import AnimatableText from "../../components/Texts/AnimatableText";
import {
    ActiveSection,
    BottomSection,
    MiddleSection,
    MiddleSection2,
    MiddleSection3,
    TopSection,
    WelcomeContainer
} from "./styles";
import { GameResult, InGameSetWord, playerCleanOffGame} from "../../redux/actions/actions";
import {useDispatch, useSelector} from "react-redux";
//import { gameSelectors } from "app/redux";
import {GameCycle} from "../../redux/reducers/initialReducer";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {lobbyCode, username, allPlayers, gameStage} from "../../redux/selectors";
import StandardYellowButton from "../../components/Buttons/StandardYellowButton";

//import Vosk from 'react-native-vosk';

type Props = StackScreenProps<RootStackParamList, "PlayerOverviewPage">;

const PlayerOverviewPage = ({ navigation }: Props) => {

    const dispatch = useDispatch();
    //const WordTextInputRef = useRef();

    const playCode = useSelector(lobbyCode);
    const playerName = useSelector(username);
    const playStage = useSelector(gameStage);

    const [players, setPlayers] = useState(useSelector(allPlayers));

    const [attempt, setAttempt] = useState('');

    const [board, setBoard] = useState([]);
    const [leaderWord, setLeaderWord] = useState("");
    const [prevLeaderWord, setPrevLeaderWord] = useState("");
    let [animTime, setAnimTime] = useState(0.0);

    //console.log(appState.appState);

    useEffect(() => {
          const interval = setInterval(() => {

                playersAPI.getRoomState(playCode)
                    .then(data => {
                       if (playStage == GameCycle.Started)
                       {
                          playersAPI.getLeaderGuessWord(playCode)
                                .then(response => {
                                    console.log("in=" + response.data.word);
                                    /*if (data1.data.word != leaderWord && leaderWord != "")
                                    {
                                        setAnimTime(1);
                                    }*/
                                    dispatch(InGameSetWord(data.data.word));
                                    setLeaderWord(response.data.word);
                                });

                            setPlayers(data.data.players);

                            setBoard(data.data.semantic_board);
                            if (data.data.game_finished)
                            {
                                setLeaderWord("");
                                clearInterval(interval);

                                dispatch(GameResult());
                                navigation.navigate("GameResultPage");
                            }
                            //TODO
                            /*if (data.data.time_left > 1000)
                            {
                                setLeaderWord("");
                                dispatch(GameResult());
                                navigation.navigate('RoundResultPage');
                                //appState.appState.is_result = true;
                            }*/
                        }
                    }).catch(error =>
                    {
                        console.log("Player Overview State Status:" + error.response.status);
                        disconnect();
                    }
                )
          }, 1000);
          return () => {
            clearInterval(interval);
          };
    }, []);

    useEffect(() => {
            console.log("cur=" + leaderWord);
            if (prevLeaderWord != "")
            {
                setAnimTime(1);
            }
            setPrevLeaderWord(leaderWord);
        }, [leaderWord]);

    useEffect(() => {
            console.log("prev=" + leaderWord);
        }, [prevLeaderWord]);

    useEffect(() => {
              const interval = setInterval(() => {
                    if (animTime > 0)
                    {
                        setAnimTime(animTime - 0.025);
                    }
                    else
                    {
                        clearInterval(interval);
                    }
              }, 10);
              return () => {
                clearInterval(interval);
              };
        }, [animTime]);

    //console.log(allPlayers);

    const onWordGuess = async () => {
        if (!attempt?.trim()) return;

        playersAPI.guessWord({lobby_code: playCode, player_name: playerName, word: attempt}).catch(
            error => {
                console.log('Unable to send word. Status was:' + error.response.status)
            }
        );
        setAttempt('');
            //console.log(RoomIdTextInputRef.current);
            /*var word = WordTextInputRef.current._internalFiberInstanceHandleDEV.memoizedProps.value;
            word = word == null ? "" : word.trim();

            playersAPI.guessWord({lobby_code: playCode, player_name: playerName, word: word});
            WordTextInputRef.current._internalFiberInstanceHandleDEV.memoizedProps.onChangeText("");*/
        };

    /*const vosk = new Vosk();

      useEffect(() => {
        vosk
          .loadModel('vosk-model-small-en-us-0.15')
          // .loadModel('model-en-us')
          .then(() => setReady(true))
          .catch((e: any) => console.log(e));

        const resultEvent = vosk.onResult((res) => {
          console.log('A onResult event has been caught: ' + res.data);
        });

        return () => {
          resultEvent.remove();
        };
      }, []);

    //const grammar = ['gauche', 'droite', '[unk]'];
      const grammar = ['left', 'right', '[unk]'];

      const record = () => {
        console.log('Starting recognition...');

        setReady(false);

        vosk
          .start(grammar)
          .then((res: any) => {
            console.log('Result is: ' + res);
            setResult(res);
          })
          .catch((e: any) => {
            console.log('Error: ' + e);
          })
          .finally(() => {
            setReady(true);
          });
      };*/

    const disconnect = () => {
        playersAPI.disconnectPlayer({
            player_name: playerName,
            lobby_code: playCode
        })
            .then((response) => {
                        dispatch(playerCleanOffGame());
                        navigation.navigate("StartPage");
                }
            ).catch( error => {
            console.log('Disconnect error. Status was: ' + error.response.status );
        })
    }


    return (
        <>
            <WelcomeContainer>
                <TopSection>
                    <BackButton onPress={()=> disconnect()}></BackButton>
                </TopSection>
                <ActiveSection>
                    <GuessWordTextInput
                        onTextChange={setAttempt}></GuessWordTextInput>
                    <StandardYellowButton onPress={onWordGuess} btnStyles={{width: "20%", alignSelf: "flex-end", margin: 10}}>+</StandardYellowButton>

                </ActiveSection>
                <MiddleSection>
                    <AliveTarget board={board} color={''} distance={0}></AliveTarget>
                </MiddleSection>
{/*
                <MiddleSection3>
                    <AnimatableText time={animTime}></AnimatableText>
                </MiddleSection3>*/}

                {/*<MiddleSection2>
                    <GuessWordTextInput ref1={WordTextInputRef}></GuessWordTextInput>
                    <GuessWordTextInput
                        onTextChange={setAttempt}></GuessWordTextInput>
                    <GuessWordButton onPress={onWordGuess}  children={''}></GuessWordButton>
                </MiddleSection2>*/}

                <BottomSection>

{/*<PlayUserSection2 navigation={navigation} allPlayers={allPlayers}/>*/}
                </BottomSection>
            </WelcomeContainer>
        </>
    );

}

export default PlayerOverviewPage;

