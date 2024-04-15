import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import colors from '../../colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const InputField = ({
  label,
  errorMessage,
  disabled,
  onChangeText,
  keyboardType, // Added keyboardType prop
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasInput = rest.value && rest.value.toString().trim() !== '';

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={[styles.container, isFocused || hasInput ? styles.focusedContainer : null]}>
      <Text style={[styles.label, isFocused || hasInput ? styles.focusedLabel : null]}>{label}</Text>
      {rest.isImage ? (
        <TouchableOpacity onPress={rest.onPressImage}>
          <Image source={{ uri: rest.imageSource }} style={styles.image} resizeMode="cover" />
        </TouchableOpacity>
      ) : (
        <TextInput
          style={[styles.input, disabled && styles.disabledInput]}
          editable={!disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={onChangeText}
          keyboardType={keyboardType || 'default'}
          {...rest}
        />
      )}
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    marginBottom: 20,
    borderColor: colors.lightGrey,
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  focusedContainer: {
    borderColor: colors.grey,
  },
  label: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: 'bold',
    color: colors.black,
    backgroundColor: colors.white,
    paddingHorizontal: 3,
  },
  focusedLabel: {
    position: 'absolute',
    top: -8,
    left: 10,
    fontSize: responsiveFontSize(1.5),
    color: colors.black,
  },
  input: {
    color: colors.black,
    paddingTop: 10,
    // width: '100%'
  },
  disabledInput: {
    color: colors.grey,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
});

export default InputField;
