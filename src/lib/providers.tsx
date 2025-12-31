import ClientProviders from "@/contexts/ClientProvider";
import { cookies } from "next/headers";


const Providers = async ({ children }: { children: React.ReactNode }) => {
  const token = (await cookies()).get("token")?.value || null;

  const user = (await cookies()).get("user")?.value || null;
  return (
    <ClientProviders token={token} user={user}>
      {children}
    </ClientProviders>
  );
};

export default Providers;





