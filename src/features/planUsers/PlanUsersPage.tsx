import styles from "./PlanUsersPage.module.css"
import { useEffect, useState } from "react"
import { get, readServerError } from "../../utils/api"
import { useSelector } from "react-redux"
import { selectToken } from "../auth/authSlice"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/button/Button"
import { PlanUser, PlanUserModel } from "./planUser/PlanUser"
import disableScroll from 'disable-scroll';
import { InvitePopup } from "./InvitePopup/InvitePopup"
import {isMobile} from 'react-device-detect';



export function PlanUsersPage() {

  const navigate = useNavigate()

  const token = useSelector(selectToken)

  const [planUsers, setPlanUsers] = useState<PlanUserModel[] | null>(null)

  const [usersNum, setUsersNum] = useState(0)

  // const isMobile = useIsMobile()


  const readPlanUsers = (message: any) => {
    const messageParsed = JSON.parse(message);

    const usersNum = (messageParsed.data.length);
    setUsersNum(usersNum)

    const userModels = [];
    for (let i = 0; i < usersNum; i++) {
      const planUserModel = {
        id: messageParsed.data[i].id,
        name: messageParsed.data[i].first_name,
        surname: messageParsed.data[i].second_name,
        email: messageParsed.data[i].email,
        photo: messageParsed.data[i].profile_image,
        plan: messageParsed.data[i].access, ///////////////////////

      }
      userModels.push(planUserModel)

    }
    setPlanUsers(userModels)
    setFetched(true)

  }



  const fetchPlanUsers = async () => {
    // alert("kd")
    // if (invitationCode == "") {
    //   setFetched(!fetched)
    //   return;
    // }

    try {
      const response = await get('plans/members/' + invitationCode, token)
      readPlanUsers(response.text)
      return;

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }


  }
  const [fetched, setFetched] = useState(false)


  const onChange = () => {
    setFetched(!fetched)

  }

  const [inviteUserOpen, setInviteUserOpen] = useState(false);



  const openInviteUserPopup = () => {
    disableScroll.on()
    setInviteUserOpen(true)

  }
  const closeInviteUserPopup = () => {
    disableScroll.off()
    setInviteUserOpen(false)
    onChange()



  }


  const [invitationCode, setInvitationCode] = useState("")

  const readPlanInfo = (message: any) => {
    if (message == "") {
      navigate("/user_page")
    }
    const messageParsed = JSON.parse(message);
    if (messageParsed.plan_type != "premium" || messageParsed.status != "active" || messageParsed.plan_access != "holder") {
      navigate("/user_page")
    }
    setInvitationCode(messageParsed.invitation_code)
   

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


  useEffect(() => {

    invitationCode && fetchPlanUsers()
  }, [invitationCode, fetched]);


  useEffect(() => {
    fetchPlan()


  }, []);

  return (
    <div>
  

      <div className={styles.container}>

        <div>
        <svg width={0} height={0}>
        <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
          <stop offset={0} stopColor="#55C6F7" />
          <stop offset={1} stopColor="#2AF8BA" />
        </linearGradient>
      </svg>
          {!isMobile && <div className={styles.back}>
            <Button text={""} onClick={() => { navigate(-1) }} className={styles.backButton} />
          </div>}
          <div className={styles.title}>
            Участники пакета
          </div>
          <div className={styles.subtitle}>
            Доступно мест {3 - usersNum} / 3
          </div>
          <div className={styles.users}>


            {planUsers != null ? (

              planUsers?.map(user =>
                <div>
                  <PlanUser planUser={user} token={token} onChange={onChange} />

                </div>

              )


            ) : (
              <div className={styles.empty}>
                Вы пока не добавляли участников

              </div>

            )}


          </div>
        </div>
        {usersNum < 3 ? (
          <div className={styles.buttonContainer}>
            <Button text={"+"} onClick={openInviteUserPopup} className={styles.button} />

          </div>
        ) : (
          null

        )}




      </div>
      {inviteUserOpen ? <InvitePopup token={token} closePopup={closeInviteUserPopup} invitationCode={invitationCode} /> : null}
    </div>
  )
}



