
import { PackageInfo } from "./packageInfo/PackageInfo"
import styles from "./Profile.module.css"
import { CompanyInfo } from "./companyInfo/CompanyInfo"
import { UserInfo } from "./userInfo/UserInfo"
import { ChangePasswordPopup } from "./userInfo/changePasswordPopup/ChangePasswordPopup"
import { useState } from "react"



export function Profile() {

  return (
    <div className={styles.container}>
      <UserInfo />
      <div className={styles.divider}/>

    

      <CompanyInfo />
      <div className={styles.divider}/>
      <PackageInfo/>

      {/* <ChangePasswordPopup/> */}


    </div>
  )
}
