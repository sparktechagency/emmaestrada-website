import Container from "@/components/shared/Container";
import Campaign from "@/components/shared/Campaign";
import ArtAndInfluencerBanner from "./ArtAndInfluencerBanner";
import ArtistsSection from "./ArtistsSection";
import HeroSection from "./HeroSection";
import BehindProcess from "./BehindProcess";
import Statics from "./Statics";
import FooterBanner from "@/components/shared/FooterBanner";
import Testimonial from "./Testimonial";
import WhyChooseUs from "./WhyChooseUs";
import { myFetch } from "@/utils/myFetch";
import getProfile from "@/utils/getProfile";

const HomePage = async ({ searchParams }: any) => {
  // const {role} = await searchParams;
  // console.log('role', role);
  const { data: campaigns } = await myFetch("/campaigns/active-campaigns");
  const { data: creators } = await myFetch("/creators");  

  console.log("campaigns home", campaigns);
  console.log("campaigns creators", creators);
  
  return (
    <div className="">
      <HeroSection />
      <Container>
        <ArtAndInfluencerBanner />
        <ArtistsSection creators={creators}/>
        <WhyChooseUs />
      </Container>
      <BehindProcess />
      <Campaign campaigns={campaigns?.data?.result} />
      <Testimonial />
      <Statics />
      <FooterBanner />
      <div className="absolute -left-[350px] -z-99 rounded-full bg-[#FFA76A73]/50 blur-3xl top-[100vh] w-[700px] h-[700px]"></div>
      {/* <ShadowCom /> */}
    </div>
  );
};

export default HomePage;
