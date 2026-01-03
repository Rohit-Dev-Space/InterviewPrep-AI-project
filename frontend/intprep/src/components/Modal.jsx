import React from 'react'
import { X } from 'lucide-react';
export default function Modal({ isOpen, onClose, children, title, hideHeader }) {
    return (
        <>
            <div className="fixed inset-0 bg-black/40 w-full h-full flex items-center justify-center z-40" style={{ display: isOpen ? 'flex' : 'none' }}>
                <div className="bg-white min-w-[500px] w-fit h-fit rounded-lg overflow-hidden relative z-50">
                    <div>{!hideHeader && (
                        <div className="flex justify-end p-2 border-b border-gray-300">
                            <h2 className="text-lg font-medium">{title}</h2>
                        </div>
                    )}</div>

                    <button type="button" className="" onClick={onClose}>
                        <X className="h-10 w-10 absolute top-5 right-5 cursor-pointer text-gray-600 hover:text-gray-900" />
                    </button>
                    <div className='flex-1 overflow-y-auto custom-scrollbar p-5'>
                        {children}
                    </div>
                </div>
            </div>

        </>
    )
}