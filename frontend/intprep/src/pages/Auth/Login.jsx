import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Inputs from "../../components/inputs/Inputs";
import { validateEmail } from "../../utils/helper";
import axiosinstance from "../../utils/axiosInstance";
import { UserContext } from "../../context/UserContext";

export default function Login({ setCurrentPage, setOpenModal }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { updateUser } = useContext(UserContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError("Enter Valid Email")
            return
        }

        if (!password) {
            setError("Enter Valid Password")
            return
        }
        setError("")

        try {
            const response = await axiosinstance.post('http://localhost:5000/api/auth/login', { email, password })

            const { token } = response.data;

            if (token) {
                localStorage.setItem('token', response.data.token);
                updateUser(response.data);
                navigate('/dashboard');
                setOpenModal(false);
            } else {
                setError(response.data.message);
            }

        } catch (err) {
            console.log(err);
            setError("Login Failed. Please try again.")
        }

    }

    return (
        <>
            <div className="flex flex-col mt-2 mx-3 gap-3 p-5">
                <div className="flex mx-auto items-start">
                    <p className="font-medium text-3xl text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324_0%,_#FCD760_100%)]">Welcome Back!</p>
                </div>
                <div className="">
                    <form onSubmit={handleLogin} className="w-full my-4 flex items-start flex-col gap-5">
                        <div className="w-full flex flex-col gap-1">
                            <label>Email :</label>
                            <Inputs type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="ex: Test@gmail.com " />
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <label>Password :</label>
                            <Inputs type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="ex: @12345 " />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button type="submit" className="bg-linear-to-r from-orange-400 font-medium to-orange-500 rounded-xl px-10 cursor-pointer text-white text-lg p-2 w-full mt-5">Log In</button>
                        <p className="text-sm">Don't have an account? <span className="text-orange-500 underline cursor-pointer" onClick={() => setCurrentPage('signup')}>Sign Up</span></p>
                    </form>
                </div>

            </div>

        </>
    );
}