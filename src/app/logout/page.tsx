"use client";
export default async function LogoutPage({}) {
  window.localStorage.removeItem("token");
  window.location.href = "/login";
}
