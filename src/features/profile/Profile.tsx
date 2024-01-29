
import { PackageInfo } from "./packageInfo/PackageInfo"
import styles from "./Profile.module.css"
import { CompanyInfo } from "./companyInfo/CompanyInfo"
import { UserInfo } from "./userInfo/UserInfo"
import { ChangePasswordPopup } from "./userInfo/changePasswordPopup/ChangePasswordPopup"
import { useEffect, useRef, useState } from "react"
import { Header } from "../header/Header"
import { useLocation, useNavigate } from "react-router-dom"
import disableScroll from 'disable-scroll';
import request from "superagent"



export function Profile() {


  const navigate = useNavigate();
  const { state } = useLocation();

  const { token } = state;
  // alert("token on page:" + token)



  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header loggedHeader={true} token = {token}/>
      </div>
      <UserInfo token = {token} />
      <div className={styles.divider} />



      <CompanyInfo />
      <div className={styles.divider} />
      <PackageInfo />

      {/* <ChangePasswordPopup/> */}


    </div>
  )
}
