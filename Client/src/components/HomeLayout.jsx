import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import AdminHeader from "./AdminHeader";
import TrainerHeader from "./TrainerHeader"; 
import TraineeHeader from "./TraineeHeader";

const HomeLayout =({ setUserData, userData }) =>{
    const renderHeader = () => {
        switch (userData.role_id) {
            case 1:
                return <AdminHeader setUserData={setUserData} userData={userData} />;
            case 2:
                return <TrainerHeader setUserData={setUserData} userData={userData} />;
            case 3:
                return <TraineeHeader setUserData={setUserData} userData={userData} />;

            default:
                console.log('no role id');
                return null;
        }
    };

    return (
        <div className="site-wrapper">
            {renderHeader()}
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default HomeLayout
