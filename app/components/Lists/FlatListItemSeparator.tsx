import {View} from "react-native";
import {colors} from "../colors";


const FlatListItemSeparator = () => {
    return (
        <View
            style={{
                height: 1,
                width: "100%",
                backgroundColor: colors.white,
            }}
        />
    );
}

export default FlatListItemSeparator;
