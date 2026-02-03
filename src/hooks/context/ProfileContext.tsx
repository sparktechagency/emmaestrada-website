'use client'

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { myFetch } from "@/utils/myFetch";
import { IUser } from "@/types/profile";
interface ProfileContextType {
  profile: IUser | null;
  loading: boolean;
  error: string | null;
  refetchProfile: () => Promise<void>;
  clearProfile: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🛑 Prevent double fetch in React Strict Mode
  const fetchedRef = useRef(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await myFetch("/users/profile");

      if (res?.success) {
        setProfile(res?.data);
        if (typeof window !== 'undefined') {
          localStorage.setItem("role", res?.data?.role);
        }
      } else {
        setError(res?.message || "Failed to load profile");
      }
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Auto call once (client only)
  // useEffect(() => {
  //   if (fetchedRef.current) return;
  //   fetchedRef.current = true;
  //   fetchProfile();
  // }, []);

  useEffect(() => {
    if (fetchedRef.current || profile) return;
    fetchedRef.current = true;
    fetchProfile();
  }, [profile]);

  const clearProfile = () => {
    setProfile(null);
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        error,
        refetchProfile: fetchProfile,
        clearProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used inside ProfileProvider");
  }
  return context;
};
