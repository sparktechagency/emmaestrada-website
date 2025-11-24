import Container from "@/components/shared/Container";
import Testimonial from "@/components/shared/Testimonial";
import ArtAndInfluencerBanner from "./ArtAndInfluencerBanner";
import ArtistsSection from "./ArtistsSection";
import HeroSection from "./HeroSection";
import BehindProcess from "./BehindProcess";

const HomePage = async ({ searchParams }: any) => {
  // const {role} = await searchParams;
  // console.log('role', role);

  return (
    <div className="">
      <HeroSection />      
      <Container>
        <ArtAndInfluencerBanner />
        <ArtistsSection />
        <BehindProcess />
        <Testimonial />
      </Container>
        <div className="absolute -left-[350px] -z-99 rounded-full bg-[#FFA76A73] blur-3xl top-5 w-[700px] h-[700px]"></div>
      {/* <ShadowCom /> */}
    </div>
  );
};

export default HomePage;
