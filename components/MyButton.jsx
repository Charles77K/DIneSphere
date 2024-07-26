import {
	Pressable,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} from "react-native";
import React, { Children } from "react";

const MyButton = ({ Press, child, childStyle, onPress, rippleColor }) => {
	return (
		<TouchableOpacity
			style={[styles.Press, Press]}
			onPress={onPress}
			android_ripple={rippleColor}
		>
			<Text style={childStyle}>{child}</Text>
		</TouchableOpacity>
	);
};

export default MyButton;

const styles = StyleSheet.create({
	Press: {
		backgroundColor: "red",
		width: "90%",
		height: "50%",
		borderRadius: 20,
	},
});
