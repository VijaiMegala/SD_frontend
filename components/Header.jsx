import React from 'react'
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import headerStyles from "../styles/main.module.scss"

export const Header = () => {
  return (
    <div className={headerStyles.headerCon}>
        <div className={headerStyles.headerConMain}>
            <div className={headerStyles.headerConDashboard}>
              <MdKeyboardArrowLeft size={25} style={{color:"lightblue"}}/>
              <span>Dashboard</span>
            </div>
            <div className={headerStyles.headerConBtnGrp}>
                <div className={headerStyles.headerConBtnCancel}>
                  Cancel
                </div>
                <div className={headerStyles.headerConBtnDraft}>
                  Draft
                </div>
                <div className={headerStyles.headerConBtnSave}>
                  <span>Save</span>
                  <MdKeyboardArrowRight size={25}  style={{color:"white"}}/>
                </div>
            </div>
        </div>
    </div>
  )
}
