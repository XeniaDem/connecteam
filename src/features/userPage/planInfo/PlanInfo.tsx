
import styles from "./PlanInfo.module.css"
import icon from "./icon.svg"
import { Plan, PlanList } from "../../planList/PlanList"
import { BasicPlan } from "./basicPlan/BasicPlan"
import { AdvancedPlan } from "./advancedPlan/AdvancedPlan"
import { PremiumPlan } from "./premiumPlan/PremiumPlan"
import { Button } from "../../../components/button/Button"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { isMobile } from 'react-device-detect';
import { useGetDimensions } from "../../../app/hooks/useGetDimensions"
import { useSelector } from "react-redux"
import { selectToken } from "../../../store/authSlice"
import { get, readServerError } from "../../../utils/api"
import NotificationsIcon from '@mui/icons-material/Notifications';
import { IconButton } from "@mui/material"
import { NotificationsCenter } from "./notificationCenter/NotificationsCenter"



type Props = {
  name: string;
  surname: string;

  savedPlan: Plan | null;

  onChange: () => void;



}



export function PlanInfo({ name, surname, savedPlan, onChange }: Props) {
  const token = useSelector(selectToken)

  const width = useGetDimensions()[0]
  const height = useGetDimensions()[1]
  const navigate = useNavigate()


  const [planType, setPlanType] = useState<string | undefined>()
  const [expiryDate, setExpiryDate] = useState<string | undefined>()
  const [isTrial, setIsTrial] = useState<boolean | undefined>()
  const [planStatus, setPlanStatus] = useState<string | undefined>()


  const [trialApplicable, setTrialApplicable] = useState(false)

  const [notificationsHidden, setNotificationsHidden] = useState(true)


  const fetchPreviousPlans = async () => {
    try {

      const response = await get('plans/', token)
      if (JSON.parse(response.text).data == null) {
        setTrialApplicable(true)
      }

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }


  }



  useEffect(() => {
    setPlanType(savedPlan?.planType)
    setExpiryDate(savedPlan?.expiryDate)
    setIsTrial(savedPlan?.isTrial)
    setPlanStatus(savedPlan?.status)
    if (savedPlan == null) {
      fetchPreviousPlans()
    }
    // alert(savedPlan?.status)



  }, [savedPlan]);




  return (
    <div>
      <div className={styles.container}>
        {!isMobile && width > 1110 && height > 763 && <div className={styles.icon}>
          <img src={icon} />
        </div>}
        <div className={styles.up}>
          <div className={styles.title}>
            Добро пожаловать, {name} {" "} {surname}!
          </div>
          <div className={styles.notifications}>
            <IconButton onClick={() => setNotificationsHidden(!notificationsHidden)}>
              <svg width={0} height={0}>
                <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
                  <stop offset={0} stopColor="#55C6F7" />
                  <stop offset={1} stopColor="#2AF8BA" />
                </linearGradient>
              </svg>
              <NotificationsIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />
            </IconButton>
            <div className={styles.new}>
              1
            </div>
          </div>
        </div>

        {savedPlan != null ?
          <div>
            <div className={styles.subtitle}>
              {planStatus == "active" ? (!isTrial ? "Вам доступен план:" : "У вас оформлен пробный доступ:") : null}
              {planStatus == "on_confirm" ? "Ваша заявка находится на рассмотрении администратором:" : null}
              {planStatus == "expired" ? "Срок действия плана истек:" : null}
            </div>
            <div className={styles.plan}>
              {planType == "basic" ?
                <BasicPlan />
                :
                <div>
                  {planType == "advanced" ?
                    <AdvancedPlan />
                    :
                    <PremiumPlan />
                  }
                </div>
              }

            </div>
            <div className={styles.footerContainer}>
              {planStatus == "active" ? (
                <div className={styles.footer}>
                  Дата истечения срока подписки {expiryDate}
                </div>
              ) : (
                null
              )
              }

              <Button text={planStatus == "active" ? "Управлять планом" : (planStatus == "on_confirm" ? "Изменить заявку" : "Продлить план")}
                onClick={() => navigate("/user_page/profile", { state: { targetId: "plan_info" } })} className={styles.button} />


            </div>
          </div>
          :
          <div>
            <div className={styles.subtitle}>
              Выберите план:
            </div>
            <PlanList isLogged={true} onChange={onChange} trialApplicable={trialApplicable} />
          </div>
        }



      </div>

      {!notificationsHidden ? <NotificationsCenter onBlur={() => setNotificationsHidden(true)}/> : null}

    </div>
  )
}






