import firebase from "firebase";
import { auth } from "./configure";

const googleAuthProvider = firebase.auth.GoogleAuthProvider;

export const authenticateWithFirebase = (googleUser, setGoogleSubmitting) => {
  console.log("Google Auth Response", googleUser);
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  const unsubcribe = auth.onAuthStateChanged((firebaseUser) => {
    // Check if we are already signed-in Firebase with the correct user.
    unsubcribe();
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      const credential = googleAuthProvider.credential(
        googleUser.idToken,
        googleUser.accessToken
      );
      // Sign in with credential from the Google user.
      firebase
        .auth()
        .signInWithCredential(credential)
        .then(() => {
          console.log("User signed in");
          setGoogleSubmitting(false);
          //navigation.replace("home");
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("Error: ", errorCode + "      ", errorMessage);
          // The email of the user's account used.
          const email = error.email;
          // The credential that was used.
          //const credential = googleAuthProvider.credentialFromError(error);
          // ...
        });
    } else {
      console.log("User already signed-in Firebase.");
      setGoogleSubmitting(false);
    }
  });
};

export const isUserEqual = (googleUser, firebaseUser) => {
  if (firebaseUser) {
    const providerData = firebaseUser.providerData;
    for (let i = 0; i < providerData.length; i++) {
      if (
        providerData[i].providerId === googleAuthProvider.PROVIDER_ID &&
        providerData[i].uid === googleUser.user?.id
      ) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
};
