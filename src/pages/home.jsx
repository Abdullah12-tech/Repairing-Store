import HeroSection from "../components/sections/Hero";
import RepairSection from "../components/sections/RepairSection";
const Home = () => {
    return (
        <div className="">
            <HeroSection />
            <RepairSection />
            <button className="fixed z-50 max-w-[100px] text-center p-4 bottom-6 right-6 bg-yellow-400 text-black font-semibold rounded-full shadow-lg hover:scale-105 transition"
            >CONTACT
            </button>
        </div>
    )
}
export default Home;