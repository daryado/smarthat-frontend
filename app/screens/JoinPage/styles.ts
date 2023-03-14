import styled from "styled-components/native";
import {Container} from "../../components/shared";
import {colors} from "../../components/colors";
import { HatIconJoin } from "../../components/Icons/HatIconJoin";
import UsualText from "../../components/Texts/UsualText";

export const MainContainer = styled(Container)`
    background-color: ${colors.background_start};
    width: 100%;
    height: 100%;
    flex: 1;
    justify-content: center;
`;

export const BottomSection = styled.View`
    width: 100%;
    max-height: 0%;
`;

export const TopSection = styled.View`
    width: 100%;
    flex: 1;
    max-height: 20%;
    top: 70px;
`;

export const MiddleSection = styled.View`
    width: 100%;
    max-height: 100%;
    flex: 1;
    top: 30px;
    margin-right: 0px;
    background-color: ${colors.white};
    border-radius: 50px;
`;

export const ActiveSection = styled.SafeAreaView`
  margin: 25px;
`

export const Hat = styled(HatIconJoin)`
  top: 20px;
  align-self: center;
`

export const TextInputJoin = styled.TextInput`
  align-self: center;
  height: 50px;
  width: 350px;
  margin: 15px;
  border-radius: 15px;
  font-size: 25px;
  padding-left: 15px;
  background-color: ${colors.light_grey};
`

export const ErrorText = styled.Text`
  font-size: 15px;
  color: ${colors.red};
  margin-bottom: 5px;
  text-align: right;
  font-family: Karla-Regular;
`

export const CaptionText = styled.Text`
  font-size: 25px;
  text-align: left;
  font-family: Karla-Regular;
  margin-left: 20px;
  color: ${colors.black};
`
