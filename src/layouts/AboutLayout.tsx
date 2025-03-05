import Navbar from "../components/Global_Component/Navbar";
import ContactUs from "../components/Global_Component/ContactUs";
import Footer from "../components/Global_Component/Footer";

const AboutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <ContactUs />
      <Footer />
    </div>
  );
};

export default AboutLayout;
