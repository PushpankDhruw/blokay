"use client";
let env = "dev";

if (typeof window !== "undefined" && window.location.hostname == "blokay.com") {
  env = "prod";
}

export const VERSION = "1.0.1";
export const ENV = env;
export const API_PROD = "https://blokay.com/api/";
export const API_SANDBOX = "http://localhost:3000/api/";
export const API_DEV = "http://localhost:3000/api/";
