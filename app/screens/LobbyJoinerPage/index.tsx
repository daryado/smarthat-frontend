import React, {FunctionComponent, useState, useEffect} from "react";
import { Alert } from "react-native";

// custom components
import BackButton from "../../components/Buttons/BackButton";

import logo_main from "../../../assets/pics/hat_img.png";
import { MainIcon } from "../../components/Icons/MainLogo";
import BoldItalicText from "../../components/Texts/BoldItalicText";
import PlayersList from "../../components/Lists/PlayersList";

import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "../../navigators/types";
import PlayCode from "../../components/Details/PlayCode";
import store from "../../redux/store/store";
import {playerCleanOffGame} from "../../redux/actions/actions";
import {playersAPI} from "../../api";
import {useDispatch, useSelector} from "react-redux";
import {BottomSection, MiddleSection, TopSection, MainContainer } from "./styles";
import {lobbyCode, username} from "../../redux/selectors";

type Props = StackScreenProps<RootStackParamList, "LobbyJoinerPage">;

const LobbyJoinerPage = ({navigation}: Props) => {
    const dispatch = useDispatch();
    const playCode = useSelector(lobbyCode);

    const playerName = useSelector(username);
    //console.log(playerName);

    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            playersAPI.getRoomState(playCode)
                .then(response => {
                    setPlayers(response.data.players);
                    //console.log(response.data);
                    if (response.data.game_started) {
                        clearInterval(interval);
                        navigation.navigate('PlayerOverviewPage');
                    }
                })
                .catch((error) => {
                        if (error.response.status == 404) {
                            Alert.alert(
                                "Error",
                                "Creator disconnected"
                            );
                        }
                        clearInterval(interval);
                        disconnect();
                    }
                )
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const disconnect = () => {
        playersAPI.disconnectPlayer({
            player_name: playerName,
            lobby_code: playCode
        })
            .catch(error => {
                console.log('Disconnect Error. Status:' + error.response.status);
            }
        )
    }

    return (
        <>
            <MainContainer>
                <TopSection>
                    <BackButton onPress={() => {
                        disconnect();
                    }}>
                    </BackButton>
                    <MainIcon source={logo_main}></MainIcon>
                    <PlayCode>{playCode}</PlayCode>

                </TopSection>

                <MiddleSection>
                    <PlayersList textStyles={{width: "90%", marginBottom: 10}} players={players}
                                 showScore={false}></PlayersList>
                </MiddleSection>

                <BottomSection>
                    <BoldItalicText textStyles={{width: "90%", alignSelf: "center", marginBottom: 10, fontSize: 25}}>
                        We are waiting for the creator of the room to start the game...
                    </BoldItalicText>
                </BottomSection>
            </MainContainer>
        </>
    );
}

export default LobbyJoinerPage;
