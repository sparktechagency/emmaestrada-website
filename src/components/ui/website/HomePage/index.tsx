import Container from "@/components/shared/Container";
import Testimonial from "@/components/shared/Testimonial";
import { myFetch } from "@/utils/myFetch";
import UserList from "./UserList";
import ShadowCom from "@/components/shared/ShadowCom";

const HomePage = async ({ searchParams }: any) => {
  // const {role} = await searchParams;
  // console.log('role', role);

  const res = await myFetch("/api/users", { tags: ["users"] });

  console.log("HomePage", res);
  return (
    <div className="">
      <Container>
        <UserList data={res?.data} />
        <Testimonial />
      </Container>
        <div className="absolute -left-[350px] -z-99 rounded-full bg-[#FFA76A73] blur-3xl top-5 w-[700px] h-[700px]"></div>
      {/* <ShadowCom /> */}
    </div>
  );
};

export default HomePage;
