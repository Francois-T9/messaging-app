import { LoginForm } from "@/components/login-form";
import Header from "../components/Header";
import Footer from "@/components/Footer";

function Home() {
  return (
    <div className=" h-screen w-screen">
      <Header />
      <div className="w-screen h-screen flex grow justify-center">
        <LoginForm />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
