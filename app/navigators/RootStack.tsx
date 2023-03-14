import React, { FunctionComponent } from "react";

import { Ionicons } from "@expo/vector-icons";
// screens


// React Navigation
import { NavigationContainer} from "@react-navigation/native";
import { createStackNavigator} from "@react-navigation/stack";
import styled from "styled-components/native";
import {RootStackParamList} from "./types";
import StartPage from "../screens/StartPage";
import LobbyJoinerPage from "../screens/LobbyJoinerPage";
import LobbyCreatorPage from "../screens/LobbyCreatorPage";
import JoinPage from "../screens/JoinPage";
import CreatePage from "../screens/CreatePage";
import LeaderPage from "../screens/LeaderPage";
import LeaderPage2 from "../screens/LeaderPage2";
import ChoosePlayerPage from "../screens/ChoosePlayerPage";
import PlayerOverviewPage from "../screens/PlayerOverviewPage";
import RoundResultPage from "../screens/RoundResultPage";
import GameResultPage from "../screens/GameResultPage";

const BackImage = styled.Image`
    resize-mode: stretch;
    width: 66px;
    height: 57px;
`;

const Stack = createStackNavigator<RootStackParamList>();

const RootStack: FunctionComponent = () => {
    return <NavigationContainer>
        <Stack.Navigator
        initialRouteName="StartPage"
        >
          <Stack.Screen
          name="StartPage"
          component={StartPage}
          options={{ headerShown: false}}
          />
            <Stack.Screen
             name="JoinPage"
             options={{ headerShown: false}}
             component={JoinPage}

            />
            <Stack.Screen
                name="ChoosePlayerPage"
                component={ChoosePlayerPage}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="LeaderPage2"
                component={LeaderPage2}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="LeaderPage"
                options={{ headerShown: false}}
            >
                {props => <LeaderPage {...props} />}
            </Stack.Screen>

            <Stack.Screen
                name="PlayerOverviewPage"
                options={{headerShown: false}}
            >
                {props => <PlayerOverviewPage {...props} />}
            </Stack.Screen>

            <Stack.Screen
                name="LobbyJoinerPage"
                options={{ headerShown: false }}
            >
                {props => <LobbyJoinerPage {...props}/>}
            </Stack.Screen>

            <Stack.Screen
                name="LobbyCreatorPage"
                options={{ headerShown: false }}
            >
                {props => <LobbyCreatorPage {...props} />}
            </Stack.Screen>

            <Stack.Screen
                name="RoundResultPage"
                options={{ headerShown: false }}
            >
                {props => <RoundResultPage {...props} />}
            </Stack.Screen>

            <Stack.Screen
                name="GameResultPage"
                component={GameResultPage}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="CreatePage"
                component={CreatePage}
                options={{ headerShown: false }}
            />

            {/* <Stack.Screen name="" component={}/> */}
        </Stack.Navigator>
    </NavigationContainer>
}

export default RootStack;
