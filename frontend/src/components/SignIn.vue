<template>
    <div>
      <h2>Sign In</h2>
      <button @click="signInWithGoogle">Sign in with Google</button>
    </div>
  </template>
  
  <script>
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

export default {
  methods: {
    signInWithGoogle() {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      signInWithPopup(auth, provider)
        .then((result) => {
          // Successfully signed in
          this.$router.push('/admin'); // Redirect to admin page after sign-in
        })
        .catch((error) => {
          console.error("Error signing in: ", error);
        });
    },
    signOutUser() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.$router.push('/signin'); // Redirect to sign-in page after sign-out
        })
        .catch((error) => {
          console.error("Error signing out: ", error);
        });
    }
  }
}

  </script>
  