import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';

const MultiSelectPicker = ({ items, selectedItems, onValueChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(selectedItems);

  useEffect(() => {
    setSelected(selectedItems);
  }, [selectedItems]);

  const handleSelectItem = (item) => {
    if (selected.find((selectedItem: { id: any; }) => selectedItem.id === item.id)) {
      setSelected(selected.filter((i: { id: any; }) => i.id !== item.id));
    } else {
      setSelected([...selected, item]);
    }
  };

  const handleDone = () => {
    onValueChange(selected);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.picker} onPress={() => setIsOpen(!isOpen)}>
        <Text style={styles.pickerText}>Select Items</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdown}>
          
          <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  picker: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  pickerText: {
    color: '#fff',
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    maxHeight: 200,  // Set a fixed maximum height for the dropdown
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    marginLeft: 10,
  },
  doneButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    margin: 20,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  checkbox: {
    margin: 8,
  },
});

export default MultiSelectPicker;
