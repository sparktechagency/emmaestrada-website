"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { PhotoProvider } from "react-photo-view";
import { Toaster } from "sonner";
import "react-photo-view/dist/react-photo-view.css";

const ClientProviders = ({
  children,
  token,
  user,
}: {
  children: React.ReactNode;
  token: string | null;
  user: string | null;
}) => {
  return (
    <>
      <PhotoProvider>
        <AuthProvider initialToken={token} initialUser={user}>
          {children}
        </AuthProvider>
      </PhotoProvider>

      <Toaster
        position="top-center"
        richColors
        toastOptions={{ duration: 5000 }}
      />
    </>
  );
};

export default ClientProviders;
