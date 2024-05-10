import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import colors from '../../colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { height } from '../utils/dimensions';

interface DatePickerFieldProps {
    label: string;
    date: string | undefined;
    onDateChange: (date: string) => void;
    minDate?: string;
}


const DatePickerField: React.FC<DatePickerFieldProps> = ({ label, date, onDateChange, minDate }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (selectedDate: Date) => {
        hideDatePicker();
        const formattedDate = selectedDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        onDateChange(formattedDate);
    };

    return (
        <View style={styles.datePicker}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity onPress={showDatePicker}>
        <View style={styles.container}>
            {date ? (
                <Text style={styles.input}>{date}</Text>
            ) : (
                <Text style={styles.placeholder}>DD/MM/YYYY</Text>
            )}
        </View>
    </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                maximumDate={new Date()}
                minimumDate={new Date(minDate)}
            />
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        height: height/17,
        // marginTop: 20,
        borderColor: colors.grey,
        borderWidth: 2,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    datePicker: {
        flex: 1,
        maxWidth: '48%', // Adjust as needed, considering padding and margin
      },
    label: {
        // position: 'absolute',
        // top: -8,
        left: 10,
        marginTop: 20,
        fontSize: responsiveFontSize(1.8),
        color: colors.black,
        backgroundColor: "transparent",
        paddingHorizontal: 3,
        fontWeight: 'bold',
        // zIndex: 999
    },
    input: {
        color: colors.black,
        paddingTop: 10,
    },
    placeholder: {
        color: '#A9A9A9',
    },
});

export default DatePickerField;
