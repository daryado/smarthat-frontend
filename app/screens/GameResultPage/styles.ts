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
  max-height: 15%;
  margin-top: 70px;
`;

export const MiddleSection = styled.View`
    width: 100%;
    max-height: 60%;
    flex: 1;
`;

export const ButtonSection = styled.View`
    width: 100%;
    max-height: 100%;
    flex: 1;
    margin-left: 15px;
    margin-right: 10px;
`;

export const BottomSection = styled.View`
    width: 100%;
    max-height: 30%;
    flex: 1;
    margin-left: 15px;
`;
