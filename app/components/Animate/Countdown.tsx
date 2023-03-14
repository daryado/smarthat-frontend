import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import {useContext} from "react";
import {SettingsContext} from "../Context/SettingsContext";
import { useCountdown } from 'react-countdown-circle-timer'

const {
    path,
    pathLength,
    stroke,
    strokeDashoffset,
    remainingTime,
    elapsedTime,
    size,
    strokeWidth,
} = useCountdown({ isPlaying: true, duration: 7, colors: '#abc' })

// @ts-ignore
const Countdown = ({key = 1, timer = 20, animate = true, children}) => {
    // @ts-ignore

    return (
        <CountdownCircleTimer
            isPlaying
            duration={7}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
        >
            {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
    )
}

export default Countdown
