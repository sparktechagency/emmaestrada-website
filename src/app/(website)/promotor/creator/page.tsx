import Creator from "@/components/ui/website/Influencer/Creator";
import { myFetch } from "@/utils/myFetch";

type PageProps = {
  searchParams: {
    type?: "popular" | "followed" | "all";
  };
};

const page = async ({ searchParams }: any) => {

  const params = await searchParams;

  const {  type, ...rest } = params;
  
  console.log("type111", rest);

  const queryString = new URLSearchParams(rest).toString();

  let data;

  switch (type) {
    case "followed":

      data = await myFetch(queryString ? `/followers/following?${queryString}`
        : `/followers/following`, { tags: ["CREATOR"] });      
      break;

    case "all":
      data = await myFetch(queryString ? `/creators`
        : `/creators`, { tags: ["CREATOR"] });      
      break;

    case "popular":
    default:
      data  = await myFetch(queryString ? `/creators/popular?${queryString}` : `/creators/popular`, { tags: ["CREATOR"] });
      
      break;
  }

  
  console.log("pcreator", data);
  
  return (
    <Creator
      type={type}
      data={data}
    />
  );
};

export default page;
