import Creator from "@/components/ui/website/Influencer/Creator";
import PCreatorsMain from "@/components/ui/website/promotor/PCreator";

import { myFetch } from "@/utils/myFetch";

type PageProps = {
  searchParams: {
    type?: "popular" | "followed" | "all";
  };
};

const page = async ({ searchParams }: any) => {

  const params = await searchParams;
  const {  type, ...rest } = params;
  const queryString = new URLSearchParams(rest).toString();
  let data;

  switch (type) {
    case "followed":

      data = await myFetch(queryString ? `/followers/following?${queryString}`
        : `/followers/following`, { tags: ["CREATOR"] });      
      break;

    case "all":        
      data = await myFetch(queryString ? `/creators?${queryString}`
        : `/creators`, { tags: ["CREATOR"] });      
      break;

    case "popular":
    default:
      data  = await myFetch(queryString ? `/creators/popular?${queryString}` : `/creators/popular`, { tags: ["CREATOR"] });
      
      break;
  }
  
  return (
    // <Creator
    //   type={type}
    //   data={data}
    // />

    <PCreatorsMain type={type}
      data={data}/>
  );
};

export default page;
