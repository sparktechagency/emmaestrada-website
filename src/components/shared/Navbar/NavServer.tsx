import getProfile from "@/utils/getProfile";
import Navbar from "./Navbar";

export default async function NavServer() {
  const user = await getProfile();      
  
  return <Navbar profile={user} />;
}
