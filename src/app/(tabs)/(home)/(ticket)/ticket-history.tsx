import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import { getTicketHistory } from "@/src/utils/apiservice";

const TicketHistory = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        let response = await getTicketHistory();
        response = await response.data;
        setData(response);
        console.log(response, ">>>>>>>>got it");
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <ExpandableList data={data} />
    </View>
  );
};

const ExpandableListItem = ({ item }) => {
  const closedImage = require("@/src/assets/images/ic_ticket_drop_donw1.png");
  const openedImage = require("@/src/assets/images/ic_ticket_drop_down2.png");
  const [expanded, setExpanded] = useState(false);
  const [expandImage, setExpandImage] = useState(closedImage);
  const toggleExpand = () => {
    setExpanded(!expanded);
    if (expanded) {
      setExpandImage(closedImage);
    } else {
      setExpandImage(openedImage);
    }
  };

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={toggleExpand} style={styles.itemTouchable}>
        <Text style={{ fontWeight: 700, color: "#000000" }}>
          {item.createdDate}
        </Text>
        <Text style={{ fontWeight: 700, color: "#000000" }}>{item.name}</Text>
        <Image style={styles.tinyLogo} source={expandImage} />
        <View
          style={{
            backgroundColor: "#fcc630",
            width: "fit-content",
            padding: 8,
            borderRadius: 2,
          }}
        >
          <Text style={{ fontWeight: 700, color: "#000000" }}>
            {item.status}
          </Text>
        </View>
      </TouchableOpacity>
      {expanded && (
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View style={styles.itemContent}>
            <Text>Ticket No: {item.ticketNo}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const ExpandableList = ({ data }) => {
  const renderItem = ({ item }) => <ExpandableListItem item={item} />;

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id?.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 20,
    paddingLeft: 5,
    paddingRight: 5,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "green",
    textAlign: "center",
  },
  subheader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  itemContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 3,
  },
  itemTouchable: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  itemContent: {
    marginTop: 10,
    fontSize: 14,
    backgroundColor: "#f2d083",
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
  },
  tinyLogo: {
    width: 20,
    height: 20,
  },
});

export default TicketHistory;
