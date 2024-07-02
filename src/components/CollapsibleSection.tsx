import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "@/src/utils/colors";

function CollapsibleSection({
  title,
  defaultExpanded,
  children,
}: {
  title: string;
  defaultExpanded: boolean;
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState<boolean>(defaultExpanded);
  const handlePress = () => {
    setExpanded(!expanded);
  };

  return (
    <View>
      <TouchableOpacity style={styles.itemContainer} onPress={handlePress}>
        <Text style={styles.itemText}>{title}</Text>
        {expanded ? (
          <Ionicons name="arrow-up-circle" size={24} color={colors.yellow} />
        ) : (
          <Ionicons name="arrow-down-circle" size={24} color={colors.yellow} />
        )}
      </TouchableOpacity>
      {expanded && <View style={styles.sectionContent}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  itemText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  sectionContent: {
    paddingHorizontal: 4,
    marginBottom: 8,
  },
});

export default CollapsibleSection;
