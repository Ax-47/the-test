"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import TokenPayloadType from "@/type/token";

export default function useAuth(cookieName: string = "token") {
  const [payload, setPayload] = useState<TokenPayloadType | null>(null);
  const [loading, setLoading] = useState(true); // เพิ่ม loading state

  useEffect(() => {
    if (typeof document === "undefined") return;
    const raw = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${cookieName}=`));

    if (!raw) {
      setLoading(false);
      return;
    }

    const value = raw.split("=")[1];
    try {
      const decoded = jwtDecode<TokenPayloadType>(value);
      setPayload(decoded);
    } catch (err) {
      console.error("Failed to decode token", err);
      setPayload(null);
    } finally {
      setLoading(false);
    }
  }, [cookieName]);

  return { payload, loading };
}
