"use server"
import dotenv from "dotenv";
dotenv?.config();


export const config = {
  // serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "https://rakibur5000.binarybards.online",
  // baseURL: process.env.BASE_URL || "https://rakibur5000.binarybards.online/api/v1",

  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://10.10.7.48:5000",
  baseURL: process.env.BASE_URL || "http://10.10.7.48:5000/api/v1",
  socketURL : process.env.NEXT_PUBLIC_SOCKET_URL
};

export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export const BASE_URL = process.env.BASE_URL;