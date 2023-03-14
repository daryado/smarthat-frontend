import {View} from "react-native";
import React from "react";
import BigText from "../Texts/BigText";
import {colors} from "../colors";

// @ts-ignore
/*function CountDownTimer(props) {*/
const CountDownTimer = (props: { initialValue: any; }) => {
    const [time, setTime] = React.useState(props.initialValue || 10);
    const timerRef = React.useRef(time);

    React.useEffect(() => {
        const timerId = setInterval(() => {
            timerRef.current -= 1;
            if (timerRef.current < 0) {
                clearInterval(timerId);
            } else {
                setTime(timerRef.current);
            }
        }, 1000);
        return () => {
            clearInterval(timerId);
        };
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <BigText textStyles={{ color: colors.countdown_color, fontSize: 64, textAlign: "center"}}> {time} </BigText>
        </View>
    )
}

export default CountDownTimer;
