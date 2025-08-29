import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SignupForm from "@/components/SignupForm";

const Signup = () => {
  return (
    <div className=" h-screen w-screen">
      <Header />
      <div className="w-screen h-screen flex grow justify-center">
        <SignupForm />
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
