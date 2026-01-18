import { use } from "react";
import { useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import axiosinstance from "../../utils/axiosInstance";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import RoleInfoHeader from "./components/RoleInfoHeader";
import moment from "moment";
import { motion, AnimatePresence } from "framer-motion";
import QuestionCard from "../../components/cards/QuestionCard";
import { LuChevronDown, LuCircleAlert } from "react-icons/lu";
import AiresponsePreview from "./components/Airesponsepreview";
import Drawer from "../../components/Drawer";
import LearnMoreDrawerSkeleton from "../../components/loader/SkeletonDrawer";
import { SpinLoader } from "../../components/loader/Loader";

export default function InterviewPrep() {
    const { sessionId } = useParams();

    const [sessionData, setSessionData] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [openMoreQuestions, setOpenMoreQuestions] = useState(false);
    const [learnMoreDrawer, setLearnMoreDrawer] = useState(false);
    const [explanation, setExplanation] = useState({
        title: '',
        explanation: ''
    });
    const [loading, setLoading] = useState(false);
    const [isUpdateLoader, setIsUpdateLoader] = useState(false);

    const fetchSessionDataById = async () => {
        try {
            const response = await axiosinstance.get(`/api/session/interview-prep/${sessionId}`);
            if (response.data || response.data.session) {
                setSessionData(response.data.session)
            }
        } catch (err) {
            console.log("Error fetching session data:", err);
        }
    }

    const generateConceptExplanantion = async (question) => {
        try {
            setLearnMoreDrawer(true)
            setLoading(true)
            const response = await axiosinstance.post('/api/ai/generate-explanation', { question })
            if (response) {
                console.log(response.data)
                setExplanation({ title: response?.data.data.title, explanation: response.data.data.explanation });
            }
        } catch (err) {
            setExplanation(null)
            setErrorMsg('Failed to generate Explanation')
        } finally {
            setLoading(false)
            setErrorMsg('')
        }
    }

    const togglePinStatus = async (questionid) => {
        try {
            const response = await axiosinstance.post(`/api/question/${questionid}/pin`)
            if (response || response.data) {
                fetchSessionDataById();
            }
        } catch (err) {
            setExplanation(null)
            setErrorMsg('Something went wrong in toggling pinStatus')
            console.log(err)
        }
    }

    const uploadMoreQuestions = async () => {
        try {
            setIsUpdateLoader(true)
            const airesponse = await axiosinstance.post('/api/ai/generate-question', {
                role: sessionData?.role,
                experience: sessionData?.experience,
                topicsToFocus: sessionData?.topicsToFocus,
                NumberofQuestions: 10
            })
            const generatedQuestions = airesponse.data.data;
            console.log(generatedQuestions)

            const response = await axiosinstance.post('/api/question/add', { sessionId, questions: generatedQuestions })
            if (response.data) {
                fetchSessionDataById()
            }
        } catch (err) {
            setExplanation(null)
            setErrorMsg('Failed to generate More Questions')
            console.log(err.response?.data)
        } finally {
            setIsUpdateLoader(false)
        }
    }

    useEffect(() => {
        if (sessionId) {
            fetchSessionDataById();
        }
    }, [])

    return (
        <DashboardLayout>
            <div className="pt-29">
                <RoleInfoHeader
                    key={sessionData._id}
                    role={sessionData?.role || '-'}
                    topicsToFocus={sessionData?.topicsToFocus || '-'}
                    experience={sessionData?.experience || '-'}
                    questions={sessionData?.questions || '-'}
                    description={sessionData?.description || '-'}
                    lastUpdated={
                        sessionData?.updatedAt
                            ? moment(sessionData.updatedAt).format("MMM DD, YYYY")
                            : '-'
                    }
                />
            </div>
            <div className="px-10 mt-10 flex flex-col gap-5">
                <h1 className="text-2xl font-bold">Interview Prep Q&A</h1>
                <div>
                    <div className={`w-full h-auto mb-5`}>
                        <AnimatePresence>

                            {sessionData?.questions?.map((data, index) => {
                                return (
                                    <motion.div
                                        key={data._id}
                                        layout
                                        layoutId={`question-${data._id}`}
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 120,
                                            delay: index * 0.1,
                                            damping: 20,
                                        }}
                                    >
                                        <>
                                            <QuestionCard
                                                question={data.question}
                                                answer={data.answer}
                                                learnMore={() => generateConceptExplanantion(data.question)}
                                                isPinned={data.isPinned}
                                                togglePinStatus={() => togglePinStatus(data._id)}
                                                learnMoreDrawer={learnMoreDrawer}
                                            />

                                            {!loading &&
                                                sessionData.questions.length == index + 1 && (
                                                    <div className="flex items-center justify-center -ml-50 mt-5">
                                                        <button className="p-2 px-4 rounded-2xl cursor-pointer flex bg-black items-center text-lg shadow-xl shadow-orange-200 text-white" disabled={loading || isUpdateLoader} onClick={uploadMoreQuestions}>
                                                            {isUpdateLoader ? (
                                                                <SpinLoader isLoading={isUpdateLoader} />
                                                            ) : (
                                                                <LuChevronDown size={20} />
                                                            )} Load More
                                                        </button>
                                                    </div>
                                                )}
                                        </>

                                    </motion.div>

                                )
                            })}
                            <Drawer
                                isOpen={learnMoreDrawer}
                                onClose={() => { setLearnMoreDrawer(false) }}
                                title={!loading && explanation?.title}>
                                {errorMsg && (
                                    <p className="flex items-center justify-center"><LuCircleAlert size={16} className="m-2" /> {errorMsg}</p>
                                )}
                                {loading && <LearnMoreDrawerSkeleton isOpen={loading} />}
                                {!loading && explanation && (
                                    <AiresponsePreview content={explanation.explanation} />
                                )}
                            </Drawer>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
            <div>

            </div>
        </DashboardLayout>
    );
}