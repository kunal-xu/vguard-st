import colors from "@/src/utils/colors";
import { Stack } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import CustomHeader from "@/src/components/CustomHeader";

export default function RegisterLayout() {
  const headerHeight = useHeaderHeight();
  return (
    <Stack
      screenOptions={({ route, navigation }) => ({
        header: ({ options }) => {
          const title =
            options.title !== undefined ? options.title : route.name;

          return <CustomHeader title={title} />;
        },
        headerStyle: {
          backgroundColor: colors.yellow,
        },
      })}
    >
      <Stack.Screen
        name="registration"
        options={{
          title: "Registration",
        }}
      />
      <Stack.Screen
        name="registration-bank-details"
        options={{
          title: "Bank Details",
        }}
      />
      <Stack.Screen
        name="credentials"
        options={{
          title: "Credentials",
        }}
      />
    </Stack>
  );
}
