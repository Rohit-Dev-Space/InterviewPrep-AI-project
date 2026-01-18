import { LuPlus } from "react-icons/lu";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { UserContext } from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import axiosinstance from "../../utils/axiosInstance";
import SummaryCard from "../../components/cards/SummaryCard";
import moment from "moment";
import Modal from "../../components/Modal";
import CreateSessionForm from "./CreateSessionForm.jsx";


export default function Dashboard() {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        open: false,
        data: null
    });
    const [session, setSession] = useState([]);

    const colorCombos = [
        { bg: "#FFE5E5", border: "#CC3A3A" }, // light red + dark red
        { bg: "#FFF1CC", border: "#D89A00" }, // light yellow + dark amber
        { bg: "#E6FFF5", border: "#0F9D58" }, // mint green + dark green
        { bg: "#E8F0FF", border: "#3A5ECC" }, // soft blue + deep blue
        { bg: "#F5E6FF", border: "#7A3ACB" }, // lavender + royal purple
        { bg: "#FFF0F7", border: "#C83278" }, // blush pink + dark pink
        { bg: "#EAFBFF", border: "#0077A7" }, // ice blue + dark cyan
        { bg: "#FFF6E6", border: "#D86A00" }, // light orange + dark orange
        { bg: "#F3FFE6", border: "#8AB900" }, // pale green + olive green
        { bg: "#F5F5F5", border: "#4F4F4F" }  // light gray + charcoal gray
    ];

    const fetchAllSessions = async () => {
        try {
            const response = await axiosinstance.get('/api/session/my-session');
            if (response.data) {
                console.log("Fetched sessions successfully :", response.data);
                if (Array.isArray(response.data.session)) {
                    setSession(response.data.session);
                } else {
                    setSession([]);
                }
            } else {
                console.log("No sessions found or error in fetching sessions.");
            }
        } catch (err) {
            console.log("Error fetching sessions:", err);
        }
    }

    const deleteSession = async (sessionId) => {
        try {
            const response = await axiosinstance.delete(`/api/session/${sessionId}`)
            if (response) {
                fetchAllSessions()
                setOpenDeleteAlert({ open: false, data: null })
            }
        }
        catch (err) {
            console.log("Error deleting session:", err);
        }
    }

    useEffect(() => {
        fetchAllSessions();
    }, []);
    return (
        <>
            <DashboardLayout>
                <div className="flex flex-wrap gap-10 pt-29 mx-10">
                    {session?.map((info, index) => (
                        console.log("Session info:", info) ||
                        <SummaryCard
                            key={info._id}
                            role={info?.role || '-'}
                            colors={colorCombos[index % colorCombos.length]}
                            topicsToFocus={info?.topicsToFocus || '-'}
                            experience={info?.experience || '-'}
                            questions={info?.questions || '-'}
                            description={info?.description || '-'}
                            lastUpdated={
                                info?.updatedAt
                                    ? moment(info.updatedAt).format("MMM DD, YYYY")
                                    : '-'
                            }
                            onclick={() => navigate(`/interview-prep/${info._id}`)}
                            ondelete={() => setOpenDeleteAlert({ open: true, data: info })}
                        />
                    ))}
                    <div className="top-[80%] left-[80%]">
                        <button className="flex w-auto h-auto items-center justify-center text-xl font-extrabold shadow-inner border-orange-500 text-white border-4 px-3 py-2 rounded-2xl hover:shadow-amber-500 hover:shadow-2xl  bg-orange-600 fixed bottom-10 right-10 cursor-pointer inner-shadow" onClick={() => setOpenCreateModal(true)}><LuPlus size={35} className="pr-3" />Add New</button>
                    </div>
                </div>
                <Modal
                    isOpen={openCreateModal}
                    onClose={() => setOpenCreateModal(false)}
                    hideHeader
                >
                    <div>
                        <CreateSessionForm closeModal={setOpenCreateModal} />
                    </div>
                </Modal>
                <Modal
                    isOpen={openDeleteAlert.open}
                    onClose={() => setOpenDeleteAlert({ open: false, data: null })}
                    hideHeader={true}>
                    <div className="flex flex-col mb-5 justify-end items-center">
                        <h1 className="text-lg font-medium">Do you want to <span className="text-red-700">Delete</span> these Session?</h1>
                        <div className="flex w-2/4 mt-5 justify-between">
                            <button className="px-5 py-2 bg-black rounded-xl cursor-pointer text-white" onClick={() => setOpenDeleteAlert(() => setOpenDeleteAlert({ open: false, data: null }))}>Cancel</button>
                            <button className="px-5 py-2 bg-red-500 rounded-xl cursor-pointer text-white" onClick={() => deleteSession(openDeleteAlert.data?._id)}>Delete</button>
                        </div>
                    </div>

                </Modal>
            </DashboardLayout>
        </>
    );
}