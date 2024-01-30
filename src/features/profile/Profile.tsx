
import { PackageInfo } from "./packageInfo/PackageInfo"
import styles from "./Profile.module.css"
import { CompanyInfo } from "./companyInfo/CompanyInfo"
import { User, UserInfo } from "./userInfo/UserInfo"
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


  const [userInfo, setUserInfo] = useState<User | null>(null)


  const readUserInfo = (message: any) => {
    const messageParsed = JSON.parse(message);
    const userInfo = {
      name: messageParsed.first_name,
      surname: messageParsed.second_name,
      email: messageParsed.email,
      about: ""

    }
    // alert(JSON.stringify(userInfo));
    setUserInfo(userInfo);

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

      const response = await request.get('http://localhost:5432/users/me')
        .set('Access-Control-Allow-Origin', '*')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .then(

          response => readUserInfo(response.text)

        )
        .catch(error => {
          readServerError(error.response.text)
          throw new Error;

        })

    }
    catch (error: any) {
      // alert(error.text)
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
        <Header loggedHeader={true} token={token} />
      </div>
      
      {userInfo && (<UserInfo savedUser = {userInfo} token={token} />)}

      <div className={styles.divider} />


      <CompanyInfo />
      <div className={styles.divider} />
      <PackageInfo />

      {/* <ChangePasswordPopup/> */}


    </div>
  )
}
