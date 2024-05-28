import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import colors from "@/src/utils/colors";
import { getTicketHistory } from "@/src/utils/apiservice";

const TicketHistory = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        let response = await getTicketHistory();
        if (response?.length > 0) {
          response.sort((a, b) => {
            return b?.ticketNo?.localeCompare(a?.ticketNo) || 0;
          });
        }
        setData(response);
      } catch (e) {
        console.error(e);
      } finally {
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
  const closedImage = require("../../../../../assets/images/ic_ticket_drop_donw1.png");
  const openedImage = require("../../../../../assets/images/ic_ticket_drop_down2.png");
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
            <Text style={styles.expaned}>Ticket No: {item.ticketNo}</Text>
            <Text style={styles.expaned}>Status: {item.status}</Text>
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
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
  },
  expaned: {
    color: colors.black,
  },
  tinyLogo: {
    width: 20,
    height: 20,
  },
});

export default TicketHistory;
