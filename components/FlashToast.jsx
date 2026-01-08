"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSearchParams, useRouter } from "next/navigation";

const FlashToast = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const type = searchParams.get("type");
    const message = searchParams.get("msg");

    if (!type || !message) return;

    toast[type](decodeURIComponent(message));

    const url = new URL(window.location.href);
    url.searchParams.delete("type");
    url.searchParams.delete("msg");

    window.history.replaceState({}, "", url.toString());
  }, [searchParams]);

  return null;
};

export default FlashToast;
