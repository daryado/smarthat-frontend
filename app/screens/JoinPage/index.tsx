import React from "react";
import {
    TopSection,
    MiddleSection,
    MainContainer,
    BottomSection,
    ActiveSection,
    Hat,
    TextInputJoin,
    ErrorText,
    CaptionText
} from "./styles";


// custom components
import BackButton from "../../components/Buttons/BackButton";
import hat_main from "../../../assets/pics/hat.png";
import {playersAPI} from "../../api";
import {setJoinedPage} from "../../redux/actions/actions";
import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "../../navigators/types";
import {Formik} from "formik";
import * as Yup from 'yup';
import {useDispatch} from "react-redux";
import StandardYellowButton from "../../components/Buttons/StandardYellowButton";

type Props = StackScreenProps<RootStackParamList, "JoinPage">;

type PlayerColor = {
    red: number;
    green: number;
    blue: number;
};

type JoinLobbyResponse = {
    player_color: PlayerColor;
};

const JoinSchema = Yup.object().shape({
    playerName: Yup.string()
        .max(64, "Player name is too long")
        .required("Player name cannot be empty"),
    lobbyCode: Yup.string()
        .required("Lobby code cannot be empty"),
});

const JoinPage = ({navigation}: Props) => {
    const dispatch = useDispatch();

    const onLobbyJoinPressed = async (lobbyCode, playerName) => {
        try {
            lobbyCode = lobbyCode.trim();
            playerName = playerName.trim();

            console.log(lobbyCode + " " + playerName);
            //navigation.navigate('LobbyJoinerPage');

            const {data, status} = await playersAPI.joinLobby({
                player_name: playerName,
                lobby_code: lobbyCode
            });

            dispatch(setJoinedPage(lobbyCode,
                playerName,
                {
                    red: data.player_color.red,
                    green: data.player_color.green,
                    blue: data.player_color.blue
                }
            ));
            navigation.navigate('LobbyJoinerPage');
        } catch (error) {
            console.log('Failed to join the room. Status was:' + error.response.status)
        }
    };

    return (
        <Formik
            initialValues={{
                lobbyCode: '',
                playerName: '',
            }}
            validationSchema={JoinSchema}
            onSubmit={values => onLobbyJoinPressed(values.lobbyCode, values.playerName)}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  setFieldTouched,
                  isValid,
                  handleSubmit
              }) => (
                <MainContainer>
                    <TopSection>
                        <BackButton onPress={() => navigation.navigate("StartPage")} children={''}/>
                        <Hat source={hat_main}/>
                    </TopSection>

                    <MiddleSection>
                        <ActiveSection>
                            <CaptionText>Player Name</CaptionText>
                            <TextInputJoin
                                value={values.playerName}
                                onBlur={() => setFieldTouched('playerName')}
                                onChangeText={handleChange('playerName')}></TextInputJoin>
                            {touched.playerName && errors.playerName && (
                                <ErrorText>{errors.playerName}</ErrorText>
                            )}

                            <CaptionText>Lobby Code</CaptionText>
                            <TextInputJoin
                                value={values.lobbyCode}
                                onChangeText={handleChange('lobbyCode')}
                                onBlur={() => setFieldTouched('lobbyCode')}
                            ></TextInputJoin>
                            {touched.lobbyCode && errors.lobbyCode && (
                                <ErrorText>{errors.lobbyCode}</ErrorText>
                            )}
                            <StandardYellowButton disabled={!isValid}
                                                  onPress={handleSubmit}>Join the game</StandardYellowButton>
                        </ActiveSection>
                    </MiddleSection>

                </MainContainer>
            )}
        </Formik>
    );
}
/*
const styles = StyleSheet.create({
    submit: {
        fontSize: 40,
        height: 60,
        maxWidth: 350,
        marginTop: 70,
        borderRadius: 15,
        justifyContent: "center",
        backgroundColor: colors.yellow_button,
    }
});*/

export default JoinPage;
