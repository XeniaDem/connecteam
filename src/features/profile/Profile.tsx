
import { Access, PackageInfo } from "./packageInfo/PackageInfo"
import styles from "./Profile.module.css"
import { Company, CompanyInfo } from "./companyInfo/CompanyInfo"
import { User, UserInfo } from "./userInfo/UserInfo"
import { ChangePasswordPopup } from "./userInfo/changePasswordPopup/ChangePasswordPopup"
import { useEffect, useRef, useState } from "react"
import { Header } from "../header/Header"
import { useLocation, useNavigate } from "react-router-dom"
import disableScroll from 'disable-scroll';
import request from "superagent"
import { useSelector } from "react-redux"
import { selectToken } from "../auth/authSlice"
import { get } from "../../utils/api"



export function Profile() {

  const navigate = useNavigate();

  // const { state } = useLocation();
  // const { token } = state;

  const token = useSelector(selectToken)

  const [userInfo, setUserInfo] = useState<User | null>(null)


  const readUserInfo = (message: any) => {
    const messageParsed = JSON.parse(message);
    const userInfo = {
      name: messageParsed.first_name,
      surname: messageParsed.second_name,
      email: messageParsed.email,
      about: messageParsed.description,
      photo: messageParsed.profile_image /////////////

    }
    setUserInfo(userInfo);

  }

  const [companyInfo, setCompanyInfo] = useState<Company | null>(null)


  const readCompanyInfo = (message: any) => {
    const messageParsed = JSON.parse(message);
    const companyInfo = {
      name: messageParsed.company_name,
      website: messageParsed.company_url,
      about: messageParsed.company_info,
      photo: messageParsed.company_logo

    }
    setCompanyInfo(companyInfo);

  }


  const [accessInfo, setAccessInfo] = useState<Access | null>(null)

  const readAccessInfo = (message: any) => {
    const messageParsed = JSON.parse(message);
    const accessInfo = {
      access: messageParsed.access

    }
    setAccessInfo(accessInfo);

  }









  const readServerError = (message: any) => {
    var messageParsed = JSON.parse(message);
    var content = messageParsed.message

    if (content.includes("token is expired")) {
      navigate("/login")
      return ("Срок действия токена вышел.")

    }
    alert(content);

  }

  const fetchUserPage = async () => {
    try {
      const response = await get('users/me', token)
      readUserInfo(response.text)
      readCompanyInfo(response.text)
      readAccessInfo(response.text)
    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }


  }


  useEffect(() => {
    disableScroll.off();
    fetchUserPage();

  }, []);



  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header loggedHeader={true}/>
      </div>

      {userInfo && (<UserInfo savedUser={userInfo} token={token} />)}

      <div className={styles.divider} />


      {companyInfo && (<CompanyInfo savedCompany={companyInfo} token={token} />)}

      <div className={styles.divider} />

      {accessInfo && (<PackageInfo savedAccess={accessInfo} token={token}/>)}



    </div>
  )
}
