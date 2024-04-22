"use client";
export default async function LogoutPage({}) {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("token");
    window.location.href = "/login";
  }
}
