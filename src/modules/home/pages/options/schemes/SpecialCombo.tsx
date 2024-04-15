import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import colors from "../../../../../../colors";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { Colors } from "react-native-paper";
import { Table, Row, Rows } from "react-native-table-component";
import Buttons from "../../../../../components/Buttons";

import { useNavigation } from "@react-navigation/native";
const SpecialCombo = () => {
  const navigation = useNavigation();
  const comboOffer = [
    {
      schemeId: "1",
      schemeTitle: "Cross Selling Scheme",
      schemeDesc1:
        "Complete 15 scans in any two of the above categories and earn 10% extra bonus.",
      schemeDesc2:
        "Complete 15 scans in any 3 of the above categories and earn 30% extra bonus.",
      schemeDesc3: "",
      schemeDesc4: "",
      btnText: "SCAN",
      tableData: [
        ["Product", " Scans Done", " Pending"],
        ["Wires", "0", "1"],
        ["Switches", "0", "15"],
        ["Switch Gear", "0", "15"],
        [""],
      ],
    },
    {
      schemeId: "2",
      schemeTitle: "Slab Based Scheme",
      schemeDesc1:
        "Reach slabs to earn different bonus multiplier in the\r\nscheme end.",
      schemeDesc2: "",
      schemeDesc3: "",
      schemeDesc4: "",
      btnText: "VIEW",
      tableData: [
        ["Qty", "Scans Done", "Pending"],
        ["6", "0", "6"],
        ["10", "0", "10"],
        ["15", "0", "15"],
        ["25", "0", "25"],
      ],
    },
  ];
  const getProgess = () => {
  };
  const openScanner = () => {
    navigation.navigate("Progress");
  };

  const ComboOffer = ({ element }) => {
    let schemeDesc = [
      element?.schemeDesc1,
      element?.schemeDesc2,
      element?.schemeDesc3,
      element?.schemeDesc4,
    ];
    let tableRow = [];
    if (element?.tableData?.length > 1) {
      element?.tableData?.map((rowElement, rowIndex) => {
        if (rowIndex > 0 && rowElement[0] != "") {
          tableRow.push(rowElement);
        }
      });
    } else {
      tableRow = [];
    }
    let tableHeader =
      element?.tableData?.length > 0 ? element?.tableData?.[0] : [];
    return (
      <View style={styles.card}>
        <View style={styles.header}>
          {element?.schemeTitle && (
            <Text style={styles.textHeader}>{element?.schemeTitle}</Text>
          )}
        </View>
        <View style={styles.body}>
          {element?.tableData?.length > 0 && (
            <Table borderStyle={{ borderWidth: 1, borderColor: "#000000" }}>
              {element?.tableData?.[0] && (
                <Row
                  data={element?.tableData?.[0]}
                  style={styles.head}
                  textStyle={styles.text}
                />
              )}
              {tableRow?.length === 0 ? (
                <Rows
                  data={[["No Data"]]}
                  textStyle={[styles.text, styles.emptyDataStyle]}
                />
              ) : (
                <>
                  <Rows
                    borderStyle={{ borderWidth: 1, borderColor: "#000000" }}
                    data={tableRow}
                    textStyle={styles.text2}
                  />
                </>
              )}
            </Table>
          )}
          <View style={styles.notesWrapper}>
            {schemeDesc?.length > 0 &&
              schemeDesc?.map((eachNote) => <Notes text={eachNote} />)}
          </View>
        </View>

        <View style={styles.btn}>
          <Buttons
            label={element?.btnText || "SCAN"}
            wrapperCustomStyle={{ width: 100, borderRadius: 20 }}
            onPress={element?.btnText === "VIEW" ? openScanner : getProgess}
          />
        </View>
      </View>
    );
  };

  const Notes = ({ text }) => {
    return (
      <View style={styles.description}>
        {text && <Text style={styles.notes}>● </Text>}
        {text && <Text style={styles.notes}>{text}</Text>}
      </View>
    );
  };
  return (
    <ScrollView style={styles.specialComboWrapper}>
      {comboOffer?.length > 0 &&
        comboOffer.map((ele) => {
          return <ComboOffer element={ele} />;
        })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  specialComboWrapper: {
    backgroundColor: colors.white,
  },
  offerCardWrapper: {
    margin: responsiveWidth(5),
  },
  card: {
    width: responsiveWidth(90),
    margin: responsiveWidth(5),
    borderRadius: 30,
    backgroundColor: colors.white,
    shadowColor: "rgba(0, 0, 0, 0.8)",
    elevation: 5,
    borderRadius: 40,
    padding: 10,
  },
  head: {
    // backgroundColor: colors.lightGrey,
    // backgroundColor: "#000000",
  },
  body: {
    marginLeft: 20,
    marginRight: 20,
  },
  emptyDataStyle: {
    color: colors.grey,
    fontWeight: "bold",
  },
  text2: {
    // marginLeft: 10,
    color: Colors.black,
    textAlign: "center",
    margin: 10,
    fontWeight: 700,
  },
  text: {
    color: colors.black,
    fontWeight: 700,
    textAlign: "center",
    margin: 10,
  },
  textHeader: {
    color: Colors.grey800,
    fontSize: 20,
    fontWeight: 300,
  },
  header: {
    borderBottomWidth: 1,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 4,
    borderBottomColor: Colors.amber400,
    margin: 10,
  },
  notes: {
    color: Colors.black,
  },
  btn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  notesWrapper: {
    marginTop: 10,
  },
  description: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
});

export default SpecialCombo;
