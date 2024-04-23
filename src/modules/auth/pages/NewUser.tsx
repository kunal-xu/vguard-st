import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { height, width } from '../../../utils/dimensions';
import { Avatar, } from 'react-native-paper';
import Buttons from "../../../components/Buttons";
import Loader from '../../../components/Loader';
import Popup from '../../../components/Popup';
import { newUserFields } from '../fields/newUserFields';
import Field from '../../../components/Field';
import { NavigationProps } from '../../../utils/interfaces';
import React from 'react';
import { useForm } from '../../../components/FormContext';

const NewUser = ({ navigation }: NavigationProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const { state, dispatch } = useForm();
  // const maximum_date = new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate());
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={{ backgroundColor: "white" }}>
        <View
          style={{
            backgroundColor: "transparent",
            height: height / 8,
            margin: 20,
            flexDirection: "row",
            width: width / 2.1,
            justifyContent: "space-evenly",
            alignItems: "center",
            padding: 20,
          }}
        >
          {isLoading == true ? (
            <View style={{ flex: 1 }}>
              <Loader isLoading={isLoading} />
            </View>
          ) : null}
          {isPopupVisible && (
            <Popup
              isVisible={isPopupVisible}
              onClose={() => setIsPopupVisible(false)}
            >
              <Text>{popupMessage}</Text>
              {/* // <Text>ICORRECT OTP</Text> */}
            </Popup>
          )}
          <Avatar.Image
            size={84}
            source={require("../../../assets/images/ac_icon.png")}
          />
          <View
            style={{
              margin: 20,
              flexDirection: "column",
              padding: 10,
              height: height / 10,
            }}
          >
            <Text style={{ color: "grey" }}>Contact: {state.Contact}</Text>
            <Text style={{ color: "grey" }}>Unique ID: {state.UniqueId}</Text>
          </View>
        </View>
        {newUserFields.map(field => (
          <Field
            id={field.id}
            key={field.id}
            type={field.type}
            data={field.data}
            label={field.label}
            items={field.items}
            properties={field.properties}
            rules={field.rules}
            links={field.links}
          />
        ))}
        <View
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <Buttons
            label="Next"
            onPress={() => {
              // validateFields();
              console.log(state);
              navigation.navigate('Bank Details')
            }}
            variant="filled"
            width={350}
            icon={require("../../../assets/images/arrow.png")}
            iconWidth={50}
            iconHeight={20}
            iconGap={10}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white"
  },
  input: {
    padding: 5,
    height: height / 15,
    margin: 20,
    marginTop: 5,
    color: '#D3D3D3',
    borderRadius: 5,
    backgroundColor: 'white',
    borderColor: '#D3D3D3',
    borderWidth: 1.5,
    bottom: -5,
    // elevation: 1,
  },

  dropdownContainer: {
    height: 40,
  },
  dropdownStyle: {
    backgroundColor: '#fafafa',
  },
  dropDownStyle: {
    backgroundColor: '#fafafa',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelStyles: {
    backgroundColor: 'transparent',
    margin: 14,
    color: 'red',
    colorFocused: '#D3D3D3',
  },
});

export default NewUser;