import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "@/src/utils/colors";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import Buttons from "@/src/components/Buttons";
import useProfile from "@/src/hooks/useProfile";
import { StatusMappings } from "@/src/utils/StatusMappings";

function Card({
  label,
  value,
}: {
  label: string;
  value: string | undefined | null;
}) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

export default function Profile() {
  const [expandedItemId, setExpandedItemId] = useState(null);
  const router = useRouter();
  const { profile } = useProfile();
  const statusMappings = new StatusMappings();

  const data = [{ id: "1", label: "Bank Details" }];

  const ListItem = ({ item, label, value, onPress, expanded }) => {
    const bankMap = {
      "Bank Account No.": profile.BankDetail.bankAccNo,
      "Bank Account Holder Name": profile.BankDetail.bankAccHolderName,
      "Bank Account Type": profile.BankDetail.bankAccType,
      "Bank Name and Branch": profile.BankDetail.bankNameAndBranch,
      "Bank Address": profile.BankDetail.branchAddress,
      "IFSC code": profile.BankDetail.bankIfsc,
    };
    return (
      <View>
        <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
          <Text style={styles.itemText}>{item.label}</Text>
          {expanded ? (
            <Ionicons name="arrow-up-circle" size={24} color={colors.yellow} />
          ) : (
            <Ionicons
              name="arrow-down-circle"
              size={24}
              color={colors.yellow}
            />
          )}
        </TouchableOpacity>
        <View
          style={{
            paddingHorizontal: 15,
          }}
        >
          {expanded &&
            Object.keys(bankMap).map((key) => (
              <Card label={key} value={bankMap[key]} />
            ))}
        </View>
      </View>
    );
  };

  const handlePress = (id) => {
    setExpandedItemId(expandedItemId === id ? null : id);
  };

  const labelMap = {
    Name: profile.Name,
    "Date of Birth": profile.DOB,
    Gender: profile.Gender,
    Email: profile.EmailId,
    Aadhar: profile.Aadhar,
    PAN: profile.PAN,
    "Bank Details": profile.BankDetail.bankDataPresent,
    "TDS Slab": `${profile.TDSSlab}%`,
    "Profile Status":
      statusMappings.ActivationStatus[profile.ActivationStatus as number],
    "Transaction Status":
      statusMappings.TechnicianBlockStatus[profile.BlockStatus as number],
  };
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{
              uri: "https://th.bing.com/th/id/OIG4.nmrti4QcluTglrqH8vtp",
            }}
            placeholder={{ blurhash }}
            transition={1000}
            style={{ width: 80, height: 80, borderRadius: 50 }}
            contentFit="cover"
          />
          <Buttons
            variant="filled"
            label="Edit Profile"
            onPress={() => router.push("edit-profile")}
          />
        </View>
        <View style={styles.card}>
          {Object.keys(labelMap).map((key) =>
            !labelMap[key] ? (
              <Card label={key} value={"NA"} />
            ) : key === "Bank Details" ? (
              <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <ListItem
                    item={item}
                    onPress={() => handlePress(item.id)}
                    expanded={expandedItemId === item.id}
                  />
                )}
              />
            ) : (
              <Card label={key} value={labelMap[key]} />
            )
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 20,
    marginBottom: 20,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  infoRow: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  label: {
    fontSize: 16,
    color: "#999",
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "blue",
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerSave: {
    color: "white",
    fontSize: 16,
  },
  profileContainer: {
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingHorizontal: 15,
    marginTop: -20,
  },
  profileImageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  editIconContainer: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#e91e63",
    borderRadius: 15,
    padding: 5,
  },
  input: {
    width: "100%",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: 16,
    marginVertical: 10,
  },
});
