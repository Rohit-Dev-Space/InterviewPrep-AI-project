import { useContext, useState } from "react";
import HEROimg from '../assets/hero-img.png'
import { APP_FEATURES } from '../utils/data'
import { useNavigate } from "react-router-dom";
import { LuSparkles } from 'react-icons/lu'
import Modal from "../components/Modal";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import { UserContext } from "../context/UserContext";
import ProfileInfoCard from "../components/cards/ProfileInfoCard";

export default function LandingPage() {
    const navigate = useNavigate();

    const [openModal, setOpenModal] = useState(false);
    const [currentpage, setCurrentPage] = useState('login');
    const { user } = useContext(UserContext);

    const handleCTA = () => {
        if (!user) {
            setOpenModal(true);
        } else {
            navigate('/dashboard');
            console.log("Navigating to dashboard");
        }
    }

    return (
        <>
            <div className="w-full h-full bg-[#FFFCEF]">
                <div className="w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0 z-10"></div>

                <div className="w-full h-full mx-auto px-5 py-3 z-20">
                    <header className="w-full p-4 flex items-center justify-between">
                        <h1 className="text-black font-bold text-2xl">Interview Prep AI</h1>
                        {user ? <ProfileInfoCard /> : <button className="bg-linear-to-r from-orange-400 font-medium to-orange-500 rounded-full px-10 cursor-pointer text-white text-lg p-2" onClick={() => setOpenModal(true)}>
                            Login / SignUp
                        </button>}
                    </header>
                </div>
                <div className="w-full h-auto flex flex-col md:flex-row items-start mt-4 gap-24 p-20">
                    <div className="flex flex-col gap-5">
                        <h1 className="border-2 w-fit bg-amber-100 font-semibold border-orange-500 text-orange-500 flex gap-2 items-center px-5 py-2 rounded-full"><LuSparkles size={20} /> AI powered</h1>
                        <h1 className="w-[18ch] text-5xl font-medium">Ace Interviews with <span className="bg-clip-text text-transparent bg-[radial-gradient(circle,_#FF9324_0%,_#FCD760_100%)] animate-text-shine ">AI Powered </span>Learning</h1>
                    </div>
                    <div className="w-[70ch] md:-w-1/2 space-y-10">
                        <p className="text-lg">
                            Get role specific interview questions, practice answers, and receive AI-driven feedback to boost your confidence and performance. Preparation to Mastery - your ultimate interview companion.
                        </p>
                        <button className="bg-black text-white border-none border-white rounded-full px-4 py-2 hover:bg-amber-200 hover:boder-4 hover:border-amber-300 hover:text-black cursor-pointer" onClick={handleCTA}>Get started</button>
                    </div>
                </div>
                <div className="w-full min-h-full relative p-10">
                    <div className="">
                        <section>
                            <img src={HEROimg} alt="Hero Image" className="w-[80vh] md:w-[200vh] border-2 border-amber-500 mx-auto h-auto rounded-xl" />
                            <div className="w-full h-auto mx-auto flex flex-col gap-10 my-20">
                                <div className="mx-auto text-center">
                                    <h2 className="text-4xl font-medium mb-5">Feature that make <br /> you shine</h2>
                                </div>
                                <div className="flex flex-col md:flex-row gap-30 justify-center items-center w-fit mx-auto">
                                    {APP_FEATURES.slice(0, 3).map((feature, index) => {
                                        return (
                                            <div key={index} className="flex flex-col gap-5 p-5 w-fit hover:shadow-2xl bg-gray-100 border-2 border-amber-100 rounded-xl my-5">
                                                <div className="text-xl text-black font-medium">{feature.title}</div>
                                                <div className="space-y-2">
                                                    <h3 className="text-sm w-[35ch] font-extralight">{feature.description}</h3>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="flex flex-col md:flex-row gap-30 justify-center items-center w-fit mx-auto">
                                    {APP_FEATURES.slice(3).map((feature, index) => {
                                        return (
                                            <div key={index} className="flex flex-col gap-5 p-5 w-fit hover:shadow-2xl bg-gray-100 border-2 border-amber-100 rounded-xl my-5">
                                                <div className="text-xl text-black font-medium">{feature.title}</div>
                                                <div className="space-y-2">
                                                    <h3 className="text-sm w-[50ch] font-extralight">{feature.description}</h3>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div >
            <div className="p-5 text-center border-2 border-amber-100 text-2xl ">Made With Love by Rohit.R.Kharvi 😊</div>
            <Modal
                isOpen={openModal}
                onClose={() => {
                    setOpenModal(false)
                    setCurrentPage('login')
                }}
                hideHeader
                title={currentpage === 'login' ? 'Login' : 'Sign Up'}
            >
                <div className="w-3/4 h-15 rounded-2xl flex justify-between mx-auto mt-2 bg-slate-100 p-1">
                    <button onClick={() => { setCurrentPage('login') }} className={`${currentpage === 'login' && 'bg-white rounded-xl shadow-xl'} w-2/4 h-full text-center cursor-pointer text-xl`}>Login</button>
                    <button onClick={() => { setCurrentPage('signup') }} className={`${currentpage === 'signup' && 'bg-white rounded-xl shadow-xl'} w-2/4 h-full text-center cursor-pointer text-xl`}>Sign Up</button>
                </div>
                {currentpage === 'login' && (
                    <Login setCurrentPage={setCurrentPage} setOpenModal={setOpenModal} />
                )}
                {currentpage === 'signup' && (
                    <SignUp setCurrentPage={setCurrentPage} setOpenModal={setOpenModal} />
                )}
            </Modal>
        </>
    );
}