import styled from "styled-components/native";
import {Container} from "../../components/shared";
import {colors} from "../../components/colors";

export const WelcomeContainer = styled(Container)`
    background-color: ${colors.background_start};
    justify-content: space-between;
    width: 100%;
    height: 100%;
`;

export const TopSection = styled.View`
    width: 100%;
    flex: 1;
    max-height: 30%;
`;


export const MiddleSection = styled.View`
    width: 100%;
    flex: 1;
    align-content: center;
   // margin-bottom: 210px;
`;

export const BottomSection = styled.View`
    width: 100%;
    height: 30%;
`;

// const ButtonSection = styled.View`
//     width: 100%;
//     max-height: 100%;
//     flex: 1;
//     margin-left: 15px;
//     margin-right: 10px;
// `;
