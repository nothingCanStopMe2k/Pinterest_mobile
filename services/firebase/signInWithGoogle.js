import * as Google from "expo-google-app-auth";
import firebase from "firebase";
import {
  authenticateWithFirebase,
  createNewCredential,
} from "./authenticateWithFirebase";

export const onSignInWithGoogleAsync = async (setGoogleSubmitting) => {
  try {
    setGoogleSubmitting(true);
    const result = await Google.logInAsync({
      androidClientId:
        "502082121211-devtmjqqgfieipuejmtgnj1fftrvla3u.apps.googleusercontent.com",
      //iosClientId: YOUR_CLIENT_ID_HERE,
      scopes: ["profile", "email"],
    });

    if (result.type === "success") {
      authenticateWithFirebase(result, setGoogleSubmitting);
      return;
    }
    console.log("error");
    setGoogleSubmitting(false);
    //return { cancelled: true };
  } catch (e) {
    console.log("error network");
    setGoogleSubmitting(false);
    return { error: true };
  }
};
