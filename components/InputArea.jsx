import { KeyboardAvoidingView, StyleSheet, TextInput } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';

const InputArea = ({
  background,
  Changer,
  placeholder,
  secureTextEntry,
  value,
  iconStyle,
  iconStart,
  iconEnd,
  keyboardType,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const handleFocus = () => {
    setIsFocus(true);
  };
  const handleBlur = () => {
    setIsFocus(false);
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
        onChangeText={Changer}
        placeholder={placeholder}
        placeholderTextColor={'rgb(107, 106, 106)'}
        secureTextEntry={secureTextEntry}
        value={value}
        keyboardType={keyboardType}
      />
    </KeyboardAvoidingView>
  );
};

export default InputArea;

const styles = StyleSheet.create({
  main: {},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    height: 45,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  inferno: {
    flex: 1,
    color: 'black',
  },
  onFocus: {
    borderColor: 'black',
    borderWidth: 2,
  },
  icon: {
    marginRight: 10,
    color: 'black',
    fontSize: 25,
  },
});
