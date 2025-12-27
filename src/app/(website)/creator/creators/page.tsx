import Creator from "@/components/ui/website/Influencer/Creator";
import { myFetch } from "@/utils/myFetch";

type PageProps = {
  searchParams: {
    type?: "popular" | "followed" | "all";
  };
};

const page = async ({ searchParams }: PageProps) => {
  const type = searchParams?.type || "popular";


  console.log("searchParams", type);
  
  let data;

  switch (type) {
    case "followed":
      data = await myFetch("/followers/following", { tags: ["CREATOR"] });
      break;

    case "all":
      data = await myFetch("/creators", { tags: ["CREATOR"] });
      break;

    case "popular":
    default:
      data = await myFetch("/creators/popular", { tags: ["CREATOR"] });
      break;
  }

  return (
    <Creator
      type={type}
      data={data?.data}
    />
  );
};

export default page;
