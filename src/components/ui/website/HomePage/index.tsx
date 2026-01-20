import Campaign from "@/components/shared/Campaign";
import Container from "@/components/shared/Container";
import FooterBanner from "@/components/shared/FooterBanner";
import { myFetch } from "@/utils/myFetch";
import ArtAndInfluencerBanner from "./ArtAndInfluencerBanner";
import ArtistsSection from "./ArtistsSection";
import BehindProcess from "./BehindProcess";
import HeroSection from "./HeroSection";
import Statics from "./Statics";
import Testimonial from "./Testimonial";
import WhyChooseUs from "./WhyChooseUs";
import getProfile from "@/utils/getProfile";

const HomePage = async () => {
  const  campaigns  = await myFetch("/campaigns/active-campaigns");
  const creators  = await myFetch("/creators");  
const profile = await getProfile()

console.log("campaigns", campaigns);

  return (
    <div className="">
      <HeroSection />
      <Container>
        <ArtAndInfluencerBanner />
        <ArtistsSection creators={creators?.data} profile={profile}/>
        <WhyChooseUs />
      </Container>
      <BehindProcess />
      <Campaign campaigns={campaigns?.data} />
      <Testimonial />
      <Statics />
      <FooterBanner />
      <div className="absolute -left-[350px] -z-99 rounded-full bg-[#FFA76A73]/50 blur-3xl top-[100vh] w-[700px] h-[700px]"></div>
      {/* <ShadowCom /> */}
    </div>
  );
};

export default HomePage;
