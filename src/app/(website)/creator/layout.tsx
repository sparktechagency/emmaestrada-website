import InfluencerHeader from "@/components/ui/website/Influencer/InfluencerHeader";
import getProfile from "@/utils/getProfile";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getProfile();
  
  return (
    <div className="">
      <InfluencerHeader profile={user} />
      <main className="mb-auto">{children}</main>
    </div>
  );
};

export default layout;
