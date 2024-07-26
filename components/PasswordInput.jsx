import {
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

const PasswordInput = ({
	background,
	Changer,
	placeholder,
	value,
	iconStyle,
	iconStart,
	iconEnd,
}) => {
	const [isFocus, setIsFocus] = useState(false);
	const [isSecure, setIsSecure] = useState(true);
	const [showEye, setShowEye] = useState(true);
	const [isInputEmpty, setIsInputEmpty] = useState(true);

	const handleClick = () => {
		setIsSecure(!isSecure);
		setShowEye(false);
	};

	const handleFocus = () => {
		setIsFocus(true);
	};
	const handleBlur = () => {
		setIsFocus(false);
	};

	const handleChangeText = (text) => {
		Changer(text);
		setIsInputEmpty(text === "");
	};

	return (
		<KeyboardAvoidingView
			style={[styles.inputContainer, background, isFocus && styles.onFocus]}
			behavior="padding"
		>
			{iconStart && (
				<FontAwesome name={iconStart} style={[styles.icon, iconStyle]} />
			)}
			<TextInput
				style={[styles.inferno]}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onChangeText={handleChangeText}
				placeholder={placeholder}
				placeholderTextColor={"rgb(107, 106, 106)"}
				secureTextEntry={isSecure}
				value={value}
			/>
			<TouchableOpacity onPress={handleClick}>
				<FontAwesome
					name={isSecure ? "eye" : "eye-slash"}
					style={[styles.icon2, { display: isInputEmpty ? "none" : "flex" }]}
				/>
			</TouchableOpacity>
		</KeyboardAvoidingView>
	);
};

export default PasswordInput;

const styles = StyleSheet.create({
	main: {},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 0.5,
		height: 45,
		borderRadius: 10,
		paddingHorizontal: 10,
	},
	inferno: {
		flex: 1,
		color: "black",
	},
	onFocus: {
		borderColor: "black",
		borderWidth: 2,
	},
	icon: {
		marginRight: 10,
		color: "black",
		fontSize: 25,
	},
	icon2: {
		marginRight: 10,
		color: "black",
		fontSize: 25,
	},
	icon3: {
		marginRight: 10,
		color: "black",
		fontSize: 25,
		display: "none",
	},
});
