import { Link } from "expo-router";
import { Text, View } from "react-native";
import apiClient from "../../utils/api-client";

export default function Index() {
  apiClient.get("/api");
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>
        <Link href="/User">This is a link to the User Info</Link>
      </Text>
    </View>
  );
}
