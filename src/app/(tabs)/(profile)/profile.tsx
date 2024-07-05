import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import Buttons from "@/src/components/Buttons";
import { StatusMappings } from "@/src/utils/StatusMappings";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { ProfileCard, ProfileHeader } from "@/src/utils/interfaces";
import { useData } from "@/src/hooks/useData";
import CollapsibleSection from "@/src/components/CollapsibleSection";
import colors from "@/src/utils/colors";
import { responsiveFontSize } from "react-native-responsive-dimensions";

function Card({ label, value }: ProfileCard) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

function Header({ profile, router }: ProfileHeader) {
  return (
    <View style={styles.profileImageContainer}>
      <Image
        source={{ uri: profile.Selfie as string }}
        placeholder={{
          uri: "https://th.bing.com/th/id/OIG4.nmrti4QcluTglrqH8vtp",
        }}
        transition={1000}
        style={styles.profileImage}
        contentFit="cover"
      />
      <View>
        <Text style={{ fontSize: responsiveFontSize(1.7), fontWeight: "bold" }}>
          Rishta ID: {profile.RishtaID || "VGIL30000"}
        </Text>
      </View>
      <Buttons
        variant="filled"
        label="Edit Profile"
        onPress={() => router.push("edit-profile")}
      />
    </View>
  );
}

export default function Profile() {
  const router = useRouter();
  const { state } = useData();
  const statusMappings = new StatusMappings();
  const data = [{ type: "header" }, { type: "profile" }];

  const bankMap: { [key: string]: string } = {
    "Bank Account No.": state?.BankDetail?.bankAccNo ?? "NA",
    "Bank Account Holder Name": state?.BankDetail?.bankAccHolderName ?? "NA",
    "Bank Name and Branch": state?.BankDetail?.bankNameAndBranch ?? "NA",
    "Bank Address": state?.BankDetail?.branchAddress ?? "NA",
    "IFSC code": state?.BankDetail?.bankIfsc ?? "NA",
  };

  const labelMap: { [key: string]: string | boolean } = {
    Name: state?.Name ?? "NA",
    "Date of Birth": state?.DOB?.toString() ?? "NA",
    Gender: state?.Gender ?? "NA",
    Email: state?.EmailId ?? "NA",
    Aadhar: state?.Aadhar ?? "NA",
    PAN: state?.PAN ?? "NA",
    "TDS Slab": `${state?.TDSSlab ?? "NA"}%`,
    "Bank Details": state.BankDetail.bankDataPresent ?? false,
    "Profile Status":
      statusMappings.ActivationStatus[state?.ActivationStatus as number] ??
      "NA",
    "Transaction Status":
      statusMappings.TechnicianBlockStatus[state?.BlockStatus as number] ??
      "NA",
  };

  const renderItem: ListRenderItem<(typeof data)[0]> = ({ item }) => {
    switch (item.type) {
      case "header":
        return <Header profile={state} router={router} />;
      case "profile":
        return (
          <View style={styles.card}>
            <CollapsibleSection title="Profile Details" defaultExpanded={true}>
              {Object.keys(labelMap).map((key, id) =>
                !labelMap[key] ? (
                  <Card key={id} label={key} value={"NA"} />
                ) : key === "Bank Details" ? null : (
                  <Card key={id} label={key} value={labelMap[key]} />
                )
              )}
            </CollapsibleSection>
            {state.BankDetail.bankDataPresent ? (
              <CollapsibleSection title="Bank Details" defaultExpanded={false}>
                {Object.keys(bankMap).map((key) => (
                  <Card key={key} label={key} value={bankMap[key]} />
                ))}
              </CollapsibleSection>
            ) : null}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <FlashList data={data} renderItem={renderItem} estimatedItemSize={30} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  profileText: {
    flex: 1,
  },
  textDetail: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: responsiveFontSize(2),
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 8,
    elevation: 5,
  },
  infoRow: {
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  label: {
    fontSize: 16,
    color: colors.grey,
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  profileImageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    width: "100%",
    backgroundColor: "white",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
});
