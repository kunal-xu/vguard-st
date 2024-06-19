import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "@/src/utils/colors";
import { Image } from "expo-image";

export default function Profile() {
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
            style={{ width: 100, height: 100, borderRadius: 50 }}
            contentFit="cover"
          />
          <TouchableOpacity style={styles.editIconContainer}>
            <Ionicons name="camera" size={16} color="white" />
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value="Anwar Zeb"
          editable={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value="Anwar.zeb122@gmail.com"
          editable={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value="0342331****"
          editable={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Gender"
          value="Male"
          editable={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Date Of Birth"
          value="10/4/1997"
          editable={false}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.yellow,
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
    position: "relative",
  },
  profileImage: {
    width: 100,
    height: 100,
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
