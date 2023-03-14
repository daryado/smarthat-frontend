import { useState, createContext } from "react";

// @ts-ignore
export const SettingsContext = createContext()

// @ts-ignore
function SettingsContextProvider(props) {

    const [pomodoro, setPomodoro] = useState(0)
    const [executing, setExecuting] = useState({})
    const [startAnimate, setStartAnimate] = useState(false)

    // @ts-ignore
    function setCurrentTimer (active_state) {
        updateExecute({
            ...executing,
            active: active_state
        })
        setTimerTime(executing)
    }

    // start animation fn
    function startTimer() {
        setStartAnimate(true)
    }
    // pause animation fn
    function pauseTimer() {
        setStartAnimate(false)
    }
    // pass time to counter
    // @ts-ignore
    const children = ({ remainingTime }) => {
        const minutes = Math.floor(remainingTime / 60)
        const seconds = remainingTime % 60

        return `${minutes}:${seconds}`
    }

    // clear session storage
    const SettingsBtn = () => {
        setExecuting({})
        setPomodoro(0)
    }

    // @ts-ignore
    const updateExecute = updatedSettings => {
        setExecuting(updatedSettings)
        setTimerTime(updatedSettings)
    }

    // @ts-ignore
    const setTimerTime = (evaluate) => {
        switch (evaluate.active) {
            case 'work':
                setPomodoro(evaluate.work)
                break;
            case 'short':
                setPomodoro(evaluate.short)
                break;
            case 'long':
                setPomodoro(evaluate.long)
                break;
            default:
                setPomodoro(0)
                break;
        }
    }

    function stopAimate() {
        setStartAnimate(false)
    }

    return (
        <SettingsContext.Provider value={{
            pomodoro,
            executing,
            updateExecute,
            startAnimate,
            startTimer,
            pauseTimer,
            children,
            SettingsBtn,
            setCurrentTimer,
            stopAimate
        }}>
            {props.children}
        </SettingsContext.Provider>
    )

}

export default SettingsContextProvider
