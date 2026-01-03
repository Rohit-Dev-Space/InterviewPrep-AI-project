import React, { use, useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Navbar from "./Navbar";
import { Navigate } from "react-router-dom";

export default function DashboardLayout({ children }) {
    const { user } = useContext(UserContext);
    return (
        <div className="w-full h-full">
            < Navbar />
            {user && <div>{children}</div>}
        </div >
    )
}