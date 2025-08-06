/**
 * Authentication Service
 * Handles user authentication related operations with Firebase
 */

import { auth, db } from "@/lib/firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";

// Global recaptcha verifier
let recaptchaVerifier: RecaptchaVerifier | null = null;

export function initializeRecaptcha(containerId: string) {
  if (!recaptchaVerifier) {
    recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: 'invisible',
      callback: () => {
        console.log('reCAPTCHA solved');
      },
    });
  }
  return recaptchaVerifier;
}

/**
 * Send verification code to phone number
 * @param phoneNumber - Phone number to send verification code to
 * @param containerId - Container ID for reCAPTCHA
 * @returns Promise with confirmation result
 */
export async function verifyNumber(phoneNumber: string, containerId: string) {
  try {
    const verifier = new RecaptchaVerifier(auth, containerId, { size: 'invisible' });
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, verifier);
    return { success: true, verificationId: confirmationResult.verificationId };
  } catch (error: any) {
    console.error('Error sending verification code:', error);
    throw new Error(error.message || 'Failed to send verification code');
  }
}

/**
 * Confirm verification code
 * @param confirmationResult - Result from verifyNumber
 * @param code - Verification code entered by user
 * @returns Promise with user credential
 */
export async function confirmCode(verificationId: string, code: string) {
  try {
    const credential = PhoneAuthProvider.credential(verificationId, code);
    const result = await signInWithCredential(auth, credential);
    return { success: true, user: result.user };
  } catch (error: any) {
    console.error('Error confirming code:', error);
    throw new Error(error.message || 'Invalid verification code');
  }
}

/**
 * Check if user exists in database
 * @param phoneNumber - Phone number to check
 * @returns Promise with user data or null
 */
export async function checkUserExists(phoneNumber: string) {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('phoneNumber', '==', phoneNumber));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      return { exists: true, userData: userDoc.data() };
    }

    return { exists: false, userData: null };
  } catch (error: any) {
    console.error('Error checking user existence:', error);
    throw new Error('Failed to check user existence');
  }
}

/**
 * Save new user to database
 * @param userData - User data to save
 * @returns Promise with success status
 */
export async function saveUser(userData: {
  uid: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  email?: string;
  address?: string;
  birthdate?: string;
  gender?: string;
}) {
  try {
    const userRef = doc(db, 'users', userData.uid);
    await setDoc(userRef, {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return { success: true };
  } catch (error: any) {
    console.error('Error saving user:', error);
    throw new Error('Failed to save user data');
  }
}

/**
 * Get current authenticated user
 * @returns Promise with user data or null
 */
export async function getCurrentUser() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

/**
 * Sign out user
 * @returns Promise
 */
export async function logout() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    console.error('Error signing out:', error);
    throw new Error('Failed to sign out');
  }
}