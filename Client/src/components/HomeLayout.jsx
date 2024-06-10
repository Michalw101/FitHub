import React from "react"
import { Outlet } from "react-router-dom"
import HomeHeader from "./HomeHeader"
import Footer from "./Footer"

export default function HomeLayout({setUserData}) {
    return (
        <div className="site-wrapper">
            <HomeHeader setUserData={setUserData} />
            <main>
                <Outlet />
            </main>
            <Footer />
            
        </div>
    )
}