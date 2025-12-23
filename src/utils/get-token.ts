"use server";

import { cookies } from "next/headers";

export async function getToken(): Promise<string | undefined> {
  // Server-side: Retrieve token using next/headers cookies
  const cookieStore = await cookies();

  console.log("cookieStore", cookieStore.get("accessToken")?.value);
  
  return cookieStore.get("accessToken")?.value;
}