import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, Image } from "react-native";

import { auth, db, storage } from "./firebase";
import { signInAnonymously, onAuthStateChanged, signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";
import {
  uploadString,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { useEffect, useState } from "react";

export default function App() {
  const [user, setUser] = useState(null);
  const [records, setRecords] = useState(0);
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.info({ user });
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const collectionQuery = query(
      collection(db, "users"),
      where("userId", "==", user.uid)
    );
    const unsubscribe = onSnapshot(collectionQuery, (snapshot) => {
      console.log("Current data: ", snapshot, snapshot.size);
      setRecords(snapshot.size);
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  const signIn = async () => {
    await signInAnonymously(auth);
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  const addDocument = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        userId: user.uid,
        created: serverTimestamp(),
        updated: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const addDataUrlFile = async () => {
    console.info("uploading");

    const storageRef = ref(storage, "file.txt");

    const message = "'This is my message.'";

    const result = await uploadString(storageRef, message);
    console.info("uploaded", { result });

    const newUrl = await getDownloadURL(storageRef);
    setUrl(newUrl);
  };

  const getFileUrl = async () => {
    const storageRef = ref(storage, "dog.jpg");
    const newUrl = await getDownloadURL(storageRef);
    console.info({ newUrl });
    setImageUrl(newUrl);
  };

  return (
    <View style={styles.container}>
      {user ? (
        <Button onPress={handleSignOut} title="Sign Out" />
      ) : (
        <Button onPress={signIn} title="Sign In" />
      )}
      {user ? (
        <View>
          <View>
            <Button title="Add firestore record" onPress={addDocument} />
            <Text>Current records: {records}</Text>
          </View>
          <View>
            <Button title="Add storage data URL" onPress={addDataUrlFile} />
            <Text>Download URL: {url}</Text>
            <Button title="Get image URL" onPress={getFileUrl} />
            {imageUrl ? (
              <Image
                style={styles.image}
                source={{ uri: imageUrl }}
                onError={(error) => {
                  console.info({ error });
                }}
                onLoad={(e) => {
                  console.info({ e });
                }}
              />
            ) : null}
            {/* {imageUrl ? <Image style={styles.image} source={imageUrl} /> : null} */}
          </View>
        </View>
      ) : null}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
    paddingTop: 50,
  },
  image: {
    width: 50,
    height: 50,
  },
});
