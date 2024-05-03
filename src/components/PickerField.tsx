import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import colors from '../../colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const MultiSelectPickerField = ({
  label,
  errorMessage,
  disabled,
  selectedValues,
  onValueChange,
  items,
  setIndex,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedItems, setSelectedItems] = useState(selectedValues || []);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const toggleItemSelection = (itemValue) => {
    const updatedSelectedItems = selectedItems.includes(itemValue)
      ? selectedItems.filter((value) => value !== itemValue)
      : [...selectedItems, itemValue];
    setSelectedItems(updatedSelectedItems);
    onValueChange(updatedSelectedItems);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.item,
        selectedItems.includes(item.value) && styles.selectedItem,
        disabled && styles.disabledItem,
      ]}
      onPress={() => toggleItemSelection(item.value)}
      activeOpacity={0.7}
    >
      <Text style={[styles.itemText, selectedItems.includes(item.value) && styles.selectedItemText]}>
        {item.label}
      </Text>
      {/* {selectedItems.includes(item.value) && <View style={styles.checkbox} />} */}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, isFocused ? styles.focusedContainer : null]}>
      <Text style={[styles.label, isFocused ? styles.focusedLabel : null]}>{label}</Text>
      <TouchableOpacity
        style={styles.dropdownContainer}
        onPress={handleFocus}
        activeOpacity={0.7}
        disabled={disabled}
      >
        <Text style={styles.dropdownText}>{selectedItems.length > 0 ? `${selectedItems.length} Selected` : 'Select'}</Text>
      </TouchableOpacity>
      {isFocused && (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.value.toString()}
          style={styles.dropdownList}
        />
      )}
      {/* {errorMessage && <Text style={styles.error}>{errorMessage}</Text>} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderColor: colors.lightGrey,
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
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
  dropdownContainer: {
    height: 40,
    justifyContent: 'center',
  },
  dropdownText: {
    fontSize: responsiveFontSize(1.7),
    color: colors.black,
  },
  dropdownList: {
    maxHeight: 200,
    marginTop: 5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
  },
  itemText: {
    fontSize: responsiveFontSize(1.7),
    color: colors.black,
  },
  selectedItem: {
    backgroundColor: colors.lightBlue,
  },
  selectedItemText: {
    fontWeight: 'bold',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.black,
    marginRight: 10,
    backgroundColor: colors.lightBlue,
  },
  disabledItem: {
    opacity: 0.5,
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
});

export default MultiSelectPickerField;
