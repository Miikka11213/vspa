"use client";
import Script from "next/script";
import { useEffect, useState, useSyncExternalStore } from "react";
import { GOOGLE_ADS_ID, initializeGoogleAds, subscribeToPhoneNumber, getPhoneNumber, getBusinessPhone } from "./google-ads";

export function GoogleAdsTag() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => { setEnabled(initializeGoogleAds()); }, []);
  return enabled ? <Script id="vspa-google-ads" src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} strategy="afterInteractive" /> : null;
}

export function PhoneLink({ className, prefix = "" }) {
  const { phone, tel } = useSyncExternalStore(subscribeToPhoneNumber, getPhoneNumber, getBusinessPhone);
  return <a className={className} href={"tel:" + tel}>{prefix}{phone}</a>;
}
