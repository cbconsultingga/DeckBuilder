import { useEffect, useState } from "react";
import { readProfile, type OwnerProfile } from "@/lib/profile";

export function useOwner() {
  const [profile, setProfile] = useState<OwnerProfile | null>(null);

  useEffect(() => {
    setProfile(readProfile());
    const onProfileChange = () => setProfile(readProfile());
    window.addEventListener("jrd-profile", onProfileChange);
    return () => window.removeEventListener("jrd-profile", onProfileChange);
  }, []);

  return profile;
}
