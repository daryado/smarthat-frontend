import {
    GestureResponderEvent,
    StyleProp,
    TextStyle,
    ViewStyle,
} from "react-native";
import {FormEvent} from "react";

export interface ButtonProps {
    btnStyles?: StyleProp<ViewStyle>;
    onPress: ((event: GestureResponderEvent) => void) | ((e?: FormEvent<HTMLFormElement>) => void) |undefined;
    textStyles?: StyleProp<TextStyle>;
    disabled?: boolean;
    children?: React.ReactNode;
}
