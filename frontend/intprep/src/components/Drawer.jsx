import { LuX } from "react-icons/lu"

export default function Drawer({ isOpen, onClose, title, children }) {
    return (
        <div className={`fixed top-[80px] right-0 z-40 h-dvh overflow-y-auto p-4 flex flex-col transition-transform bg-white w-full md:w-[40vw] shadow-2xl shadow-cyan-50 
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            tabIndex="-1"
        >
            <div className="flex w-full justify-between gap-5 mb-5 items-center">
                <h5 className="text-xl font-bold underline">{title}</h5>
                <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600"><LuX size={25} /></button>
            </div>
            <div className="text-sm pb-15 break-words font-medium">
                {children}
            </div>
        </div>

    )
}