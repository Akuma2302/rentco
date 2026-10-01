import { useState } from "react";
import { currentUser } from "./mockData";

export interface ProfileDetails {
  name: string;
  email: string;
  phone: string;
  university: string;
  campus: string;
  bio: string;
}

const PROFILE_KEY = "rentco.profile";

const defaultProfile: ProfileDetails = {
  name: currentUser.name,
  email: currentUser.email,
  phone: "",
  university: currentUser.university,
  campus: "",
  bio: "",
};

function readProfile(): ProfileDetails {
  try {
    const saved = localStorage.getItem(PROFILE_KEY);
    return saved ? { ...defaultProfile, ...JSON.parse(saved) } : defaultProfile;
  } catch {
    return defaultProfile;
  }
}

/** The signed-in user's editable profile, remembered in this browser. */
export function useProfile() {
  const [profile, setProfile] = useState(readProfile);

  const saveProfile = (next: ProfileDetails) => {
    setProfile(next);
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(next));
    } catch {
      // Storage unavailable; keep the changes for this session only.
    }
  };

  return { profile, saveProfile };
}
