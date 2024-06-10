import React from "react"
import { Outlet } from "react-router-dom"

import Footer from "./Footer"

export default function Layout() {
    return (
        <div className="site-wrapper">
            
            <main>
                <Outlet />
            </main>
            <Footer />
            
        </div>
    )
}