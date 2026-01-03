
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import ProfileInfoCard from "../cards/ProfileInfoCard";

export default function Navbar() {

    const { user } = useContext(UserContext)

    return (

        <div className="flex fixed w-full h-auto top-0 justify-between bg-[#1c1b1a]/10 backdrop-blur-sm border-white/30 items-center px-10 py-4 shadow-xl">
            <div>
                <Link to="/dashboard" className="text-2xl font-bold bg-[radial-gradient(circle,_#FF9324_0%,_#FCD760_100%)] text-transparent bg-clip-text">IntPrep AI</Link>
            </div>
            <div>
                {user && <ProfileInfoCard />}
            </div>
        </div>

    );
}