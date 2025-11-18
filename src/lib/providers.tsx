
import { AuthProvider } from "@/contexts/AuthContext";
import { cookies } from "next/headers";
import { Toaster } from "sonner";

const Providers = async ({ children }: { children: React.ReactNode }) => {
  const token = (await cookies()).get("token")?.value || null;
  
  const user = (await cookies()).get("user")?.value || null;

  return (
    <>
      <AuthProvider initialToken={token} initialUser={user}>
        {children}
      </AuthProvider>
      <Toaster
        position="top-center"
        richColors={true}        
        toastOptions={{ duration: 5000 }}
      />
    </>
  );
};

export default Providers;