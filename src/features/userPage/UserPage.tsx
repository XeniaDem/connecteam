import styles from "./UserPage.module.css"
import { LastGames } from "./lastGames/LastGames"
import { PlanInfo } from "./planInfo/PlanInfo"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import disableScroll from 'disable-scroll';
import { useSelector } from "react-redux"
import { selectId, selectToken } from "../../store/authSlice"
import { get, readServerError } from "../../utils/api"
import { Plan } from "../planList/PlanList"




export function UserPage() {

  const token = useSelector(selectToken)
  const id = useSelector(selectId)
  
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [userId, setUserId] = useState(null)
  const [planInfo, setPlanInfo] = useState<Plan | null>(null)

  const readAnswer = (message: any) => {
    var messageParsed = JSON.parse(message);
    var name = messageParsed.first_name
    var surname = messageParsed.second_name
    var userId = messageParsed.id
    setName(name)
    setSurname(surname)
    setUserId(userId)
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
    if (message == "") {
      setPlanInfo(null)
      return;
    }
    const messageParsed = JSON.parse(message);
    const planInfo = {
      id: messageParsed.id,
      planType: messageParsed.plan_type,
      expiryDate: new Date(messageParsed.expiry_date).toLocaleDateString(),
      planAccess: messageParsed.plan_access,
      status: messageParsed.status, ////////////
      invitationCode: messageParsed.invitation_code,
      isTrial: messageParsed.is_trial
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


  const onPlanChange = () => {
    window.location.reload()
  }


  useEffect(() => {
    disableScroll.off()
    fetchUserPage();
  }, []);

  useEffect(() => {
    disableScroll.off()
    fetchPlan();
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
      <PlanInfo name={name} surname = {surname} savedPlan = {planInfo} onChange={onPlanChange}/>
      {userId && <LastGames id="games" userId = {userId}/>}
    </div>
  )
}
