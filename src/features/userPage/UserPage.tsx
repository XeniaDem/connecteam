
import request from "superagent"
import styles from "./UserPage.module.css"
import { LastGames } from "./lastGames/LastGames"
import { PackageInfo } from "./packageInfo/PackageInfo"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import disableScroll from 'disable-scroll';
import { Header } from "../header/Header"
import { useSelector } from "react-redux"
import { selectToken } from "../auth/authSlice"
import { get } from "../../utils/api"



export function UserPage() {

  const navigate = useNavigate();


  // const { state } = useLocation();
  // const { token } = state;
  const token = useSelector(selectToken)
  





  const [name, setName] = useState("");
  const [access, setAccess] = useState("");


  const readAnswer = (message: any) => {

    var messageParsed = JSON.parse(message);
    // alert(JSON.stringify(messageParsed));
    console.log(JSON.stringify(messageParsed));


    var name = messageParsed.first_name
    setName(name)
    var access = messageParsed.access
    setAccess(access)





    // alert("data: " + "\n access: " + access + "\n company: " + companyName +
    //   "\n name: " + name + " \n surname: " + surname +
    //   "\n id: " + id + "\n image: " + image + "\n email: " + email + "\n phone: " + phone)


  }

  const readServerError = (message: any) => {
    var messageParsed = JSON.parse(message);
    var content = messageParsed.message

    if (content.includes("token is expired")) {
      navigate("/login")
      return ("Срок действия токена вышел.")

    }
    // alert(content);

  }

  const fetchUserPage = async () => {
    try {

      const response = await get('users/me', token)
      readAnswer(response.text)

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }


  }



  useEffect(() => {
    disableScroll.off()
    if (token == "") {
      navigate("/")
    }
    fetchUserPage();
  }, []);


  const { state } = useLocation();
  const { targetId } = state || {};

  useEffect(() => {
    const element = document.getElementById(targetId);
    if (element /*&& gamesInfo*/) {
      element.scrollIntoView();
      window.history.replaceState({}, '')
    }
  }, [targetId, /*&& gamesInfo*/]);



  return (

    <div className={styles.container}>
      <div className={styles.header}>
        <Header loggedHeader={true} withPackage = {!(access == "user")}/>
      </div>
      <PackageInfo name={name} savedPlan = {null}/>
      <LastGames id="games" />

    </div>
  )
}
