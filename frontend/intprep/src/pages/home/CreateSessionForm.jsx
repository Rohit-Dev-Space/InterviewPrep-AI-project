import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosinstance from "../../utils/axiosInstance";
import Inputs from "../../components/inputs/Inputs.jsx"
import Loader from "../../components/loader/Loader.jsx";

export default function CreateSessionForm({ closeModal }) {

    const [formData, setFormData] = useState({
        role: '',
        experience: '',
        topicsToFocus: '',
        description: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleCreateSession = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const { role, experience, topicsToFocus, description } = formData;

        if (!role || !experience || !topicsToFocus) {
            setError("Please fill in all required fields.");
            setIsLoading(false);
            return;
        } else {
            setError(null);
        }
        try {
            const aiResponse = await axiosinstance.post('http://localhost:5000/api/ai/generate-question', { role, experience, topicsToFocus, NumberofQuestions: 10 });
            console.log(aiResponse.data);
            const generatedQuestions = aiResponse.data;

            const response = await axiosinstance.post('http://localhost:5000/api/session/create-session', {
                role,
                experience: String(formData.experience),
                topicsToFocus,
                description: description || '',
                questions: generatedQuestions.data
            });
            if (response.data) {
                console.log("Session created successfully");
                setIsLoading(false);
                closeModal(false);
            }
            console.log(formData)
        } catch (err) {
            console.log(err.response?.data);
            console.log("Error creating session:", err);
            setError("An error occurred while creating the session. Please try again.");
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col gap-5 w-full h-full">
            <h3 className="text-black text-2xl font-bold">
                Start a new Interview Journey
            </h3>
            <p className="text-slate-400 text-lg font-medium">
                Fill in simple details to create a personalized and new interview preparation session.
            </p>
            <form onSubmit={handleCreateSession} className="flex flex-col gap-2 text-slate-500 mt-5">
                <label htmlFor="" className=" text-slate-700">Role :</label>
                <Inputs
                    label="Role"
                    type={'text'}
                    name="role"
                    placeholder="e.g : Software Engineer,Frontend Developer etc.."
                    value={formData.role}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="" className=" text-slate-700">Experience :</label>
                <Inputs
                    label="Experience"
                    name="experience"
                    placeholder="e.g : 0-1 years, 2-4 years etc.."
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    type="number"
                />
                <label htmlFor="" className=" text-slate-700">Topics to Focus On :</label>
                <Inputs
                    label="Topics to Focus On"
                    name="topicsToFocus"
                    placeholder="e.g : Data Structures, Algorithms etc.."
                    value={formData.topicsToFocus}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="" className=" text-slate-700">Description :</label>
                <textarea
                    label="Description"
                    name="description"
                    placeholder="Additional details (optional)"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full h-20 rounded-2xl border-2 border-gray-400 p-2"
                />
                {error && <p className="text-red-500">{error}</p>}
                <button type="submit" className="bg-black text-white w-full h-auto px-4 py-2 mt-3 rounded-lg hover:shadow-lg hover:shadow-orange-200 transition-colors" disabled={isLoading}>
                    {isLoading ? (
                        <div>
                            <Loader isLoading={isLoading} />
                            <p>Creating Session ...</p>
                        </div>
                    ) : 'Create Session'}
                </button>
            </form>
        </div>
    )
}
