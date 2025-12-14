import InfluencerHeader from "@/components/ui/website/Influencer/InfluencerHeader";

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
    <div className="">
        <InfluencerHeader />
        <main className="mb-auto">{children}</main>     
        </div>
    );
};

export default layout;
