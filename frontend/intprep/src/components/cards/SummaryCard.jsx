import { LuTrash } from "react-icons/lu"
import { initialGenerator } from "../../utils/helper"

export default function SummaryCard({ role, colors, topicsToFocus, questions, lastUpdated, description, experience, onclick, ondelete }) {

    let intExperience = parseInt(experience);
    if (isNaN(intExperience)) {
        intExperience = 0;
    }

    return (
        <div className={`w-fit max-w-2/7 bg-white mx-auto h-fit p-3 py-4 flex flex-col items-center shadow-lg justify-evenly hover:shadow-2xl rounded-xl mb-5 cursor-pointer`}
            onClick={onclick}>
            <div className={`flex gap-7 w-full h-fit p-3 rounded-lg mb-2`}
                style={{ backgroundColor: colors.bg }}
            >
                <div className="w-15 h-15 flex items-center justify-center rounded-xl bg-white">
                    {initialGenerator(role)}
                </div>
                <div className="flex flex-col font-light text-lg">
                    <p className="text-lg text-black font-bold mb-1">{role}</p>
                    <p className="text-sm text-slate-400 mb-1">{topicsToFocus}</p>
                </div>
            </div>
            <div className="flex justify-between items-end gap-3">
                <div className="flex flex-wrap gap-2 w-5/6">
                    <p className="text-sm border-2 p-1 px-3 border-gray-300 text-slate-500 rounded-2xl">{intExperience === 0 ? 'Experience : Fresher' : `Experience : ${experience} years`}</p>
                    <p className="text-sm border-2 p-1 px-3 border-gray-300 text-slate-500 rounded-2xl">{questions.length} Q&A</p>
                    <p className="text-sm border-2 p-1 px-3 border-gray-300 text-slate-500 rounded-2xl"> Last Updated : {lastUpdated}</p>
                    <p className="text-sm w-full text-gray-600 p-1 px-3 rounded-2xl">{description}</p>
                </div>

                <button className="text-red-500 cursor-pointer" onClick={(e) => {
                    e.stopPropagation()
                    ondelete()
                }}><LuTrash size={25} fill="#FFE5E5" /></button>
            </div>
        </div>
    )
}