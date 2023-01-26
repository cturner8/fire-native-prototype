import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";

import { auth } from "./firebase";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";

import { useEffect, useState } from "react";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, setUser);
  }, []);

  useEffect(() => {
    console.info({ user });
  }, [user]);

  const signIn = async () => {
    await signInAnonymously(auth);
  };

  return (
    <View style={styles.container}>
      <Button onPress={signIn} title="Sign In"></Button>
      <Text>{user ? "Logged in" : "Logged out"}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
