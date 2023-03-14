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
    max-height: 20%;
    margin-left: 15px;
    margin-top: 70px;
`;

export const MiddleSection = styled.View`
    width: 100%;
    max-height: 60%;
    flex: 1;
    margin-left: 15px;
    margin-right: 10px;
`;

export const WordSection = styled.View`
    width: 100%;
    max-height: 100%;
    flex: 1;
    margin-top: 10px;
`;

export const ListSection = styled.View`
    width: 100%;
    max-height: 90%;
    flex: 1;
    margin-top: 40px;
`;

export const BottomSection = styled.View`
    width: 100%;
    max-height: 20%;
    flex: 1;
    margin-left: 15px;
`;
