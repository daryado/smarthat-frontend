import React from "react";

// custom components
import SubHeaderText from "../../components/Texts/SubHeaderText";
import hat_main from "../../../assets/pics/hat.png";
import group_main from "../../../assets/pics/start_game2.png";
import HeaderText from "../../components/Texts/HeaderText";


import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "../../navigators/types";
import {MiddleSection, TopSection, BottomSection, WelcomeContainer } from "./styles";
import {GroupIcon} from "../../components/Icons/GroupIcon";
import StandardYellowButton from "../../components/Buttons/StandardYellowButton";

type Props = StackScreenProps<RootStackParamList, "StartPage">;

const StartPage = ({ navigation }: Props) => {

    return (
        <>
        <WelcomeContainer>
            <TopSection>

              <HeaderText textStyles={{ width: "90%", top: 60, alignSelf: "center" }}>Smart Hat</HeaderText>

                <SubHeaderText textStyles={{ width: "90%", top: 80, alignSelf: "center" }}>
                    A fun game for a big company :) </SubHeaderText>
            {/*<HatIcon source={hat_main}></HatIcon>*/}

            </TopSection>

            <MiddleSection>

                <GroupIcon source={group_main}></GroupIcon>
{/*
                <VoiceIcon source={voice_main}></VoiceIcon>
                <BrainIcon source={brain_main}></BrainIcon>
                <PeopleIcon source={people_main}></PeopleIcon>*/}

            </MiddleSection>

            <BottomSection>
                <StandardYellowButton onPress={() => navigation.navigate("CreatePage")}
                                      textStyles={{ alignSelf: "center"}}>New game</StandardYellowButton>
                <StandardYellowButton onPress={() => navigation.navigate("JoinPage")} >Join</StandardYellowButton>
            </BottomSection>

        </WelcomeContainer>
        </>
    );
}

export default StartPage;
