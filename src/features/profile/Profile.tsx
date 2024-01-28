
import { PackageInfo } from "./packageInfo/PackageInfo"
import styles from "./Profile.module.css"
import { CompanyInfo } from "./companyInfo/CompanyInfo"
import { UserInfo } from "./userInfo/UserInfo"
import { ChangePasswordPopup } from "./userInfo/changePasswordPopup/ChangePasswordPopup"
import { useState } from "react"
import { Header } from "../header/Header"



export function Profile() {

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header loggedHeader={true} />
      </div>
      <UserInfo />
      <div className={styles.divider} />



      <CompanyInfo />
      <div className={styles.divider} />
      <PackageInfo />

      {/* <ChangePasswordPopup/> */}


    </div>
  )
}
