
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
import { ChooseTopic } from "../processGame/chooseTopic/ChooseTopic"
import { ChooseTopics } from "../startGame/chooseTopics/ChooseTopics"
import { Plan } from "../profile/packageInfo/PackageInfo"



export function UserPage() {

  const navigate = useNavigate();


  // const { state } = useLocation();
  // const { token } = state;
  const token = useSelector(selectToken)
  





  const [name, setName] = useState("");
  const [planInfo, setPlanInfo] = useState<Plan | null>(null)


  const readAnswer = (message: any) => {

    var messageParsed = JSON.parse(message);
    // alert(JSON.stringify(messageParsed));
    console.log(JSON.stringify(messageParsed));


    var name = messageParsed.first_name
    setName(name)



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

  const readPlanInfo = (message: any) => {
    const messageParsed = JSON.parse(message);
    const planInfo = {
      planType: messageParsed.plan_type,
      expiryDate: messageParsed.expiry_date.substring(0, 10),
      planAccess: messageParsed.plan_access,
      planConfirmed: messageParsed.confirmed ////////////

    }
    setPlanInfo(planInfo);

  }


  const fetchPlan = async () => {
    try {

      const response = await get('plans/current', token)
      readPlanInfo(response.text)

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }


  }



  const [userFetched, setUserFetched] = useState(false)

  const [planFetched, setPlanFetched] = useState(false)


  const onUserChange = () => {
    setUserFetched(!userFetched)

  }
  const onPlanChange = () => {
    setPlanFetched(!planFetched)

  }


  useEffect(() => {
    disableScroll.off()
    if (token == "") {
      navigate("/")
    }
    fetchUserPage();

  }, [userFetched]);

  useEffect(() => {
    disableScroll.off()
    if (token == "") {
      navigate("/")
    }
    fetchPlan();

  }, [planFetched]);



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
      <PackageInfo name={name} savedPlan = {planInfo} onChange={onPlanChange}/>
      <LastGames id="games" />
      <ChooseTopics/>

    </div>
  )
}
