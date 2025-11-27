import { Bricolage_Grotesque } from "next/font/google";

 const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  weight: [
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800"
  ],
});

export {bricolage};