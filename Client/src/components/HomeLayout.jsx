import React from "react"
import { Outlet } from "react-router-dom"
import HomeHeader from "./HomeHeader"
import Footer from "./Footer"
import AdminHeader from "./AdminHeader"

export default function HomeLayout({ setUserData, userData }) {
    return (
        <div className="site-wrapper">
            {userData.role_id == 1 ? <AdminHeader /> : <HomeHeader setUserData={setUserData} />}


            <main>
                <Outlet />
            </main>

            <Footer />
        </div>
    )
}