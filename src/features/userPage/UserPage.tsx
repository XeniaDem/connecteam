import styles from "./UserPage.module.css"
import { LastGames } from "./lastGames/LastGames"
import { PlanInfo } from "./planInfo/PlanInfo"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import disableScroll from 'disable-scroll';
import { useSelector } from "react-redux"
import { selectToken } from "../../store/authSlice"
import { get, readServerError } from "../../utils/api"

import { Plan } from "../profile/planInfo/PlanInfo"
import { GameResults } from "../gameResults/GameResults"
import { JoinGame } from "../joinGame/JoinGame"

import { ChooseTopic } from "../gamePage/screens/chooseTopic/ChooseTopic"
import { RateAnswer } from "../gamePage/screens/rateAnswer/RateAnswer"
import { ChooseTopics } from "../gamePage/screens/chooseTopics/ChooseTopics"
import { AnswerQuestion } from "../gamePage/screens/answerQuestion/AnswerQuestion"



export function UserPage() {

  const token = useSelector(selectToken)
  
  const [name, setName] = useState("");
  const [planInfo, setPlanInfo] = useState<Plan | null>(null)

  const readAnswer = (message: any) => {
    var messageParsed = JSON.parse(message);
    console.log(JSON.stringify(messageParsed));
    var name = messageParsed.first_name
    setName(name)
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
    fetchUserPage();

  }, [userFetched]);

  useEffect(() => {
    disableScroll.off()

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
      <PlanInfo name={name} savedPlan = {planInfo} onChange={onPlanChange}/>
      <LastGames id="games" />
      <JoinGame/>
      <ChooseTopics onButonClicked={()=> null}/>
      {/* <ChooseTopic/> */}
      <AnswerQuestion/>
      <RateAnswer/>
      <GameResults/>
    </div>
  )
}
