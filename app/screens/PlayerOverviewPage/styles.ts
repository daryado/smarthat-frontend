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
    margin-top: 60px;
    margin-bottom: 30px;
`;

export const ActiveSection = styled.View`
  flex-direction: row;
`;

export const MiddleSection = styled.View`
    width: 100%;
    height: 70%;
    /*margin-left: 15px;
    margin-right: 10px;*/
`;

export const MiddleSection2 = styled.View`
    width: 100%;
    max-height: 100%;
    position: absolute;
    flex: 0;
    flexDirection : row;
    margin-top: 450px;
    margin-bottom: 50px;
    /*margin-left: 30px;
    margin-right: 10px;*/
`;

export const MiddleSection3 = styled.View`
    width: 100%;
    max-height: 100%;
    position: absolute;
    alignContent : center;
    flex: 0;
    flexDirection : row;
    margin-top: 300px;
    margin-bottom: 50px;
    /*margin-left: 30px;
    margin-right: 10px;*/
`;

export const BottomSection = styled.View`
  width: 100%;
  max-height: 30%;
  flex: 1;
  margin-left: 5px;
`;

export const TouchableText = styled.TouchableOpacity`
  margin-top: 20px;
  margin-left: 20px;
`
