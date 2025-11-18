import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />      
      <main className="pt-[100px] mb-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default layout;
