import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

export default function ProfileInfoCard() {

    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate()

    const handleLogOut = () => {
        localStorage.clear()
        clearUser();
        navigate('/');
    }

    return (
        <div className="flex justify-center items-center gap-3">
            <div className="flex items-center justify-center">
                <img src={user.profileImgUrl} onError={(e) => (e.target.src = "/defaultImg.png")} alt="user Image" className="w-11 h-11 object-cover bg-white rounded-full" />
            </div>
            <div className="flex flex-col items-center px-2">
                <div>
                    <h1 className="text-black text-lg font-bold">{user.name || ""}</h1>
                </div>
                <button className="text-orange-600 text-sm font-semibold cursor-pointer hover:underline" onClick={handleLogOut}>
                    Logout
                </button>
            </div>

        </div>
    )
}