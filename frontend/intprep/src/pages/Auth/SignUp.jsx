import { useNavigate } from "react-router-dom";
import Inputs from "../../components/inputs/Inputs";
import { useContext, useState } from "react";
import ProfilePicSelector from "../../components/inputs/ProfilePicSelector";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/UserContext";
import uploadImage from "../../utils/uploadImage";
import axiosinstance from "../../utils/axiosInstance";

export default function SignUp({ setCurrentPage, setOpenModal }) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { updateUser } = useContext(UserContext);


    const handleSignUp = async (e) => {
        e.preventDefault();
        let imageUrl = ''
        if (!name) {
            setError("Enter Your Name")
            return false
        }
        if (!validateEmail(email)) {
            setError("Enter Valid Email")
            return false
        }

        if (!password) {
            setError("Enter Valid Password")
            return false
        }
        setError("")
        try {
            if (profilePic) {
                const imgUploadRes = await uploadImage(profilePic);
                imageUrl = imgUploadRes.imgUrl || '';
            }


            const response = await axiosinstance.post('http://localhost:5000/api/auth/register', { name, email, password, profileImgUrl: imageUrl })
            const { token } = response.data;
            if (token) {
                localStorage.setItem('token', response.data.token);
                updateUser(response.data);
                navigate('/dashboard');
                setOpenModal(false);
                console.log(response.data)
                console.log("Sign Up Successful");
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            console.log(err);
            setError("Sign Up Failed. Please try again.")
        }

    }
    return (

        <div className="flex flex-col -mt-2 -my-5 gap-3 p-5">
            <div className="">
                <form onSubmit={handleSignUp} className="w-full my-4 flex items-start flex-col gap-3">
                    <div className="flex flex-col justify-center items-center mx-auto -mt-10">
                        <ProfilePicSelector image={profilePic} setImage={setProfilePic} />
                    </div>
                    <div className="w-full flex flex-col gap-1">
                        <label>Name :</label>
                        <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Your Name" className="outline-none w-full h-auto px-5 p-3 flex justify-between bg-slate-200 rounded-lg" />
                    </div>
                    <div className="w-full flex flex-col gap-1">
                        <label>Email :</label>
                        <Inputs type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="ex: Test@gmail.com " />
                    </div>
                    <div className="w-full flex flex-col gap-1">
                        <label>Password :</label>
                        <Inputs type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="ex: @12345 " />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button type="submit" className="bg-linear-to-r from-orange-400 font-medium to-orange-500 rounded-xl px-10 cursor-pointer text-white text-lg p-2 w-full mt-5">Sign Up</button>
                    <p className="text-sm">Already have an account? <span className="text-orange-500 underline cursor-pointer" onClick={() => setCurrentPage('login')}>Login</span></p>
                </form>
            </div>
        </div>
    );
}