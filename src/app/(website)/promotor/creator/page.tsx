import Creator from "@/components/ui/website/Influencer/Creator";
import { myFetch } from "@/utils/myFetch";

type PageProps = {
  searchParams: {
    type?: "popular" | "followed" | "all";
  };
};

const page = async ({ searchParams }: PageProps) => {
  const {type} = await searchParams;
  
  console.log("type111", type);
  
  let data;

switch (type) {
  case "followed":
    data = await myFetch("/followers/following", { tags: ["CREATOR"] });
    console.log("followed", data);
    break;

  case "all":
    data = await myFetch("/creators", { tags: ["CREATOR"] });
    console.log("all", data);
    break;

  case "popular":
  default:
    data = await myFetch("/creators/popular", { tags: ["CREATOR"] });
    console.log("popular", data);
    break;
}
  
  return (
    <Creator
      type={type}
      data={data}
    />
  );
};

export default page;
