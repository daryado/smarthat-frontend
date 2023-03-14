import React, {FunctionComponent, useRef, useEffect, useState} from "react";
// custom components
import hat_main from "../../../assets/pics/hat.png";

import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "../../navigators/types";
import {createNewGame} from "../../redux/actions/actions";
import {PlayerColor} from "../../types";
import {playersAPI} from "../../api";
import {MainContainer,
    MiddleSection,
    TopSection,
    TextInputCreate,
    ActiveSection,
    Hat,
    CaptionText} from "./styles";
import BackButton from "../../components/Buttons/BackButton";
import ErrorText from "../../components/Texts/ErrorText";
import {Formik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import StandardYellowButton from "../../components/Buttons/StandardYellowButton";

type Props = StackScreenProps<RootStackParamList, "CreatePage">;

type CreateGameResponse = {
    lobby_code: string;
    player_color: PlayerColor;
};

const CreateSchema = Yup.object().shape({
    playerName: Yup.string()
        .max(64, "Player name is too long")
        .required("Player name cannot be empty"),
    roundTime: Yup.number()
        .required("Enter round time")
        .max(120, "Round time cannot be more than 120")
        .min(60, "Round time cannot be less than 60"),
    numWords: Yup.number()
        .required("Enter number of words")
        .max(20, "Enter a number less than 20")
        .min(10, "Please enter a number greater than 10")
});

const CreatePage = ({navigation}: Props) => {
    const dispatch = useDispatch();

    const onLobbyCreatePressed = async (playerName, time, words) => {

        console.log(playerName + " " + time + " " + words);

        await playersAPI.createGame({
            number_of_words: words,
            player_name: playerName,
            round_time: time
        }).then(response => {
            dispatch(createNewGame(response.data.lobby_code,
                playerName,
                {
                    red: response.data.player_color.red,
                    green: response.data.player_color.green,
                    blue: response.data.player_color.blue
                }
            ));
            navigation.navigate('LobbyCreatorPage');
        }).catch(error =>
            console.log('Unable to create a room. Status was:' + error)
        );
    };

    return (
        <Formik
            initialValues={{
                playerName: '',
                roundTime: 60,
                numWords: 10,
            }}
            validationSchema={CreateSchema}
            onSubmit={values => onLobbyCreatePressed(values.playerName, values.roundTime, values.numWords)}
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
                            <TextInputCreate
                                onBlur={() => setFieldTouched('playerName')}
                                onChangeText={handleChange('playerName')}
                                value={values.playerName}
                            ></TextInputCreate>
                            {touched.playerName && errors.playerName && (
                                <ErrorText>{errors.playerName}</ErrorText>
                            )}

                            <CaptionText>Round Time</CaptionText>
                            <TextInputCreate
                                onBlur={() => setFieldTouched('roundTime')}
                                onChangeText={handleChange('roundTime')}
                                keyboardType={"numeric"}
                                value={values.roundTime}
                            ></TextInputCreate>
                            {touched.roundTime && errors.roundTime && (
                                <ErrorText>{errors.roundTime}</ErrorText>
                            )}

                            <CaptionText>Number of words</CaptionText>
                            <TextInputCreate
                                onBlur={() => setFieldTouched('numWords')}
                                onChangeText={handleChange('numWords')}
                                keyboardType={"numeric"}
                                value={values.numWords}
                            ></TextInputCreate>
                            {touched.numWords && errors.numWords && (
                                <ErrorText>{errors.numWords}</ErrorText>
                            )}

                            <StandardYellowButton onPress={handleSubmit}
                                                  disabled={!isValid}>Create a game</StandardYellowButton>
                        </ActiveSection>

                    </MiddleSection>

                </MainContainer>
            )}
        </Formik>
    );
}


export default CreatePage;
