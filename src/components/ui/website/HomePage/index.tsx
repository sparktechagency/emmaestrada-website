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

const HomePage = async ({ searchParams }: any) => {
  // const {role} = await searchParams;
  // console.log('role', role);

  return (
    <div className="">
      <HeroSection />
      <Container>
        <ArtAndInfluencerBanner />
        <ArtistsSection />
      <WhyChooseUs />
      </Container>
      <BehindProcess />
      <Campaign />
      <Testimonial />
      <Statics />
      <FooterBanner />
      <div className="absolute -left-[350px] -z-99 rounded-full bg-[#FFA76A73]/50 blur-3xl top-[100vh] w-[700px] h-[700px]"></div>
      {/* <ShadowCom /> */}
    </div>
  );
};

export default HomePage;
