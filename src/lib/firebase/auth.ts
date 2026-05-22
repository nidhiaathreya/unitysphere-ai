import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import type { UserRole } from "@/types";
import { getFirebaseAuth, getFirebaseDb, isFirebaseConfigured } from "./config";

const googleProvider = new GoogleAuthProvider();

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
  organizationId?: string;
}

export async function signUpWithEmail(
  email: string,
  password: string,
  displayName: string,
  role: UserRole
): Promise<AuthUser> {
  if (!isFirebaseConfigured()) {
    return mockAuthUser(email, displayName, role);
  }
  const auth = getFirebaseAuth()!;
  const db = getFirebaseDb()!;
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName });
  const userData = buildUserDoc(cred.user, role, displayName);
  await setDoc(doc(db, "users", cred.user.uid), {
    ...userData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return userData;
}

export async function signInWithEmail(
  email: string,
  password: string
): Promise<AuthUser> {
  if (!isFirebaseConfigured()) {
    return mockAuthUser(email, "Demo User", "ngo");
  }
  const auth = getFirebaseAuth()!;
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return buildUserDoc(cred.user, "ngo", cred.user.displayName || "");
}

export async function signInWithGoogle(role: UserRole): Promise<AuthUser> {
  if (!isFirebaseConfigured()) {
    return mockAuthUser("demo@unitysphere.ai", "Demo User", role);
  }
  const auth = getFirebaseAuth()!;
  const db = getFirebaseDb()!;
  const cred = await signInWithPopup(auth, googleProvider);
  const userData = buildUserDoc(
    cred.user,
    role,
    cred.user.displayName || "User"
  );
  await setDoc(
    doc(db, "users", cred.user.uid),
    { ...userData, updatedAt: serverTimestamp() },
    { merge: true }
  );
  return userData;
}

export async function logout(): Promise<void> {
  if (!isFirebaseConfigured()) return;
  const auth = getFirebaseAuth();
  if (auth) await signOut(auth);
}

function buildUserDoc(user: User, role: UserRole, displayName: string): AuthUser {
  return {
    uid: user.uid,
    email: user.email,
    displayName: displayName || user.displayName,
    photoURL: user.photoURL,
    role,
  };
}

function mockAuthUser(
  email: string,
  displayName: string,
  role: UserRole
): AuthUser {
  return {
    uid: "demo-user-id",
    email,
    displayName,
    photoURL: null,
    role,
    organizationId: "org-1",
  };
}
