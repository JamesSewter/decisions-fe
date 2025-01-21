import React, { useState } from "react";
import { Text, View, StatusBar, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DropdownMenu, MenuOption } from "./DropdownMenu";
import Ionicons from "@expo/vector-icons/Ionicons";
import Overlay from "./Overlay";
import LogInForm from "./LogInForm";
import { useUser } from "@/contexts/UserContext";
import ToggleTheme from "./ToggleTheme";
import { useRouter } from "expo-router";
import { useTheme } from "../contexts/ThemeContext";
import Notifications from "./Notifications";

export default function Header() {
  const { colours, theme } = useTheme();
  const { user, removeUser } = useUser();
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] =
    useState(false);
  const [isNotificationDropdownVisible, setIsNotificationDropdownVisible] =
    useState(false);
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const router = useRouter();
  return (
    <>
      <Overlay
        isVisible={isLoginFormVisible}
        onClose={() => {
          setIsLoginFormVisible(false);
        }}
      >
        <LogInForm />
      </Overlay>
      <SafeAreaView
        style={{ backgroundColor: colours.background }}
        edges={["top", "left", "right"]}
      >
        {theme === "dark" && (
          <StatusBar
            barStyle="light-content"
            backgroundColor={colours.background}
          />
        )}

        <View
          style={[
            styles.headerContainer,
            { backgroundColor: colours.background },
          ]}
        >
          <Text style={[styles.title, { color: colours.text.primary }]}>
            Decisions
          </Text>

          <View style={styles.iconContainer}>
            <ToggleTheme />
            <DropdownMenu
              isVisible={isNotificationDropdownVisible}
              handleOpen={() => {
                setIsNotificationDropdownVisible(true);
              }}
              handleClose={() => {
                setIsNotificationDropdownVisible(false);
              }}
              trigger={
                <Ionicons
                  name={"notifications-outline"}
                  color={colours.text.primary}
                  size={35}
                />
              }
            >
              <Notifications
                setIsNotificationDropdownVisible={
                  setIsNotificationDropdownVisible
                }
              />
            </DropdownMenu>

            <DropdownMenu
              isVisible={isProfileDropdownVisible}
              handleOpen={() => {
                setIsProfileDropdownVisible(true);
              }}
              handleClose={() => {
                setIsProfileDropdownVisible(false);
              }}
              trigger={
                <Ionicons
                  name={"person-circle-outline"}
                  color={colours.text.primary}
                  size={35}
                />
              }
            >
              {user.username ? (
                <>
                  <MenuOption onSelect={() => {}}>
                    <Text>Welcome {user.name}!</Text>
                  </MenuOption>
                  <MenuOption
                    onSelect={() => {
                      setIsProfileDropdownVisible(false);
                      router.push("/User");
                    }}
                  >
                    <Text>View Profile</Text>
                  </MenuOption>
                  <MenuOption
                    onSelect={() => {
                      setIsProfileDropdownVisible(false);
                      router.push("/DecisionHistory");
                    }}
                  >
                    <Text>View Decision History</Text>
                  </MenuOption>
                  <MenuOption
                    onSelect={() => {
                      removeUser();
                    }}
                  >
                    <Text>Sign Out</Text>
                  </MenuOption>
                </>
              ) : (
                <>
                  <MenuOption
                    onSelect={() => {
                      setIsProfileDropdownVisible(false);
                      setIsLoginFormVisible(true);
                    }}
                  >
                    <Text>Log In</Text>
                  </MenuOption>
                  <MenuOption onSelect={() => {}}>
                    <Text>Register</Text>
                  </MenuOption>
                </>
              )}
            </DropdownMenu>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    flexDirection: "row",
  },
  title: {
    fontSize: 20,
  },
  iconContainer: {
    flexDirection: "row",
    marginRight: Platform.OS === "web" ? -5 : 80,
  },
});
