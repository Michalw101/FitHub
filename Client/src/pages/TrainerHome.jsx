import React from "react"
import MyClasses from "../pages/MyClasses"

export default function TrainerHome({userData}) {
    return (
        <div>
        <MyClasses userData={userData}/>
      </div>
    )
}