import { useEffect, useRef, useState } from "react"
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu"
import AiresponsePreview from "../../pages/interviewPrep/components/Airesponsepreview"

export default function QuestionCard({ question, answer, learnMore, learnMoreDrawer, isPinned, togglePinStatus }) {

    const [isExpanded, setIsExpanded] = useState(false)
    const [height, setHeight] = useState(0)
    const contentRef = useRef()

    useEffect(() => {
        if (isExpanded) {
            const contentHeight = contentRef.current.scrollHeight;
            setHeight(contentHeight + 10)
        } else {
            setHeight(0)
        }
    }, [isExpanded])

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <div>
            <div className={`flex flex-col justify-between group bg-white ${learnMoreDrawer ? 'w-4/7' : 'w-5/6'} mb-10 items-start shadow-md rounded-xl p-5`}>
                <div className="flex w-full justify-between">
                    <div className="flex w-2/3 items-start justify-start">
                        <span className="text-sm text-slate-400 font-medium pr-3 pt-1">Q .</span>
                        <div className="flex flex-wrap cursor-pointer w-3/4 items-start">
                            <p className="text-[16px] text-black font-medium" onClick={toggleExpanded}>{question}</p>
                        </div>
                    </div>
                    <div className="flex gap-5 items-center">
                        <div className={`group-hover:flex ${isExpanded ? 'flex' : 'hidden'} gap-7`}>
                            <button className="bg-purple-200 w-20 flex justify-center hover:border-[3px] hover:border-purple-500 h-auto cursor-pointer p-3 rounded-lg" onClick={togglePinStatus}>{isPinned ? <LuPinOff size={20} color="white" /> : <LuPin size={20} color="white" />}</button>
                            <button className="bg-teal-100 w-20 flex justify-center hover:border-[3px] hover:border-teal-500 h-auto cursor-pointer p-3 rounded-lg" onClick={learnMore}><LuSparkles size={20} /></button>
                        </div>
                        <div className="">
                            <button className="cursor-pointer" onClick={toggleExpanded}><LuChevronDown size={20} className={`transform transform-transition duration-300 ${isExpanded ? 'rotate-180' : ''}`} /></button>
                        </div>
                    </div>
                </div>
                <div className="w-full h-auto rounded-lg overflow-hidden transtion-all duration-300 ease-in-out"
                    style={{ maxHeight: `${height}px` }}>
                    <div
                        ref={contentRef}
                        className="mt-4 text-slate-600 rounded-lg bg-slate-100 p-5">
                        <AiresponsePreview content={answer} />
                    </div>
                </div>
            </div>
        </div>
    )
}