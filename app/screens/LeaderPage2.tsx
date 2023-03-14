import React, { FunctionComponent } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import { colors } from "../components/colors";

// custom components
import { Container } from "../components/shared";
import BackButton from "../components/Buttons/BackButton";

import logo_main from "../../assets/pics/hat_img.png";
import { MainIcon } from "../components/Icons/MainLogo";
import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "../navigators/types";
import SkipButton from "../components/Buttons/SkipButton";
import {View} from "react-native";
import CountDownTimer from "../components/Animate/CountDownTimer";
import SecretWord from "../components/Details/SecretWord";


const WelcomeContainer = styled(Container)`
    background-color: ${colors.back_violet};
    justify-content: space-between;
    width: 100%;
    height: 100%;
`;

const TopSection = styled.View`
    width: 100%;
    flex: 1;
    max-height: 20%;
    margin-left: 15px;
    margin-top: 30px;
`;

const MiddleSection = styled.View`
    width: 100%;
    max-height: 60%;
    flex: 1;
    justify-content: flex-end;
`;

const ButtonSection = styled.View`
    width: 100%;
    max-height: 100%;
    flex: 1;
    margin-left: 15px;
    margin-right: 10px;
`;

const BottomSection = styled.View`
    width: 100%;
    max-height: 30%;
    flex: 1;
    margin-left: 15px;
`;


// Type checking
type Props = StackScreenProps<RootStackParamList, "LeaderPage2">;


const LeaderPage2 = ({ navigation }: Props) => {

    return (
        <>
            <WelcomeContainer>
                <TopSection>
                    <BackButton onPress={()=>{}}>
                        Get Started
                    </BackButton>
                    <MainIcon source={logo_main}></MainIcon>
                </TopSection>

                <MiddleSection>
                    <SecretWord>Hat</SecretWord>
                    <CountDownTimer initialValue={10}></CountDownTimer>
                </MiddleSection>

                <BottomSection>
                    <ButtonSection>
                        <SkipButton onPress={() => navigation.navigate("LeaderPage")} textStyles={{color: colors.text_button, textAlign: "center", marginTop: 10}}>Пропуск</SkipButton>

                        <View style={{ marginTop:30}}>
                            <SkipButton onPress={()=>{}} textStyles={{color: colors.text_button, textAlign: "center", marginTop: 10}}>Слово угадано</SkipButton>
                        </View>
                    </ButtonSection>
                </BottomSection>
            </WelcomeContainer>
        </>
    );
}

export default LeaderPage2;
