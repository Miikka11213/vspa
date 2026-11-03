"use client";
import Script from "next/script";
import { useEffect, useState } from "react";
import { GOOGLE_ADS_ID, initializeGoogleAds } from "./google-ads";

export function GoogleAdsTag() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => { setEnabled(initializeGoogleAds()); }, []);
  return enabled ? <Script id="vspa-google-ads" src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} strategy="afterInteractive" /> : null;
}
