
import styles from "./PlanInfo.module.css"
import icon from "./icon.svg"
import { PlanList } from "../../planList/PlanList"
import { BasicPlan } from "./basicPlan/BasicPlan"
import { AdvancedPlan } from "./advancedPlan/AdvancedPlan"
import { PremiumPlan } from "./premiumPlan/PremiumPlan"
import { Button } from "../../../components/button/Button"
import { Plan } from "../../profile/planInfo/PlanInfo"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { isMobile } from 'react-device-detect';
import { useGetDimensions } from "../../../app/hooks/useGetDimensions"
import { useSelector } from "react-redux"
import { selectToken } from "../../../store/authSlice"
import { get, readServerError } from "../../../utils/api"



type Props = {
  name: string;
  surname: string;

  savedPlan: Plan | null;

  onChange: () => void;



}



export function PlanInfo({ name, surname, savedPlan, onChange }: Props) {
  const token = useSelector(selectToken)

  const width = useGetDimensions()[0]
  const navigate = useNavigate()


  const [planType, setPlanType] = useState<string | undefined>()
  const [expiryDate, setExpiryDate] = useState<string | undefined>()
  const [isTrial, setIsTrial] = useState<boolean | undefined>()
  const [planStatus, setPlanStatus] = useState<string | undefined>()


  const [trialApplicable, setTrialApplicable] = useState(false)


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




  if (!(savedPlan == null)) {

    if (planType == "basic") {
      return (
        <div className={styles.container}>
          {!isMobile && width > 1110 && <div className={styles.icon}>
            <img src={icon} />
          </div>}
          <div className={styles.title}>
            Добро пожаловать, {name} {" "} {surname}!
          </div>
          <div className={styles.subtitle}>
            {planStatus == "active" ? (!isTrial ? "Вам доступен план:" : "У вас оформлен пробный доступ:") : null}
            {planStatus == "on_confirm" ? "Ваша заявка находится на рассмотрении администратором:" : null}
            {planStatus == "expired" ? "Срок действия плана истек:" : null}
          </div>
          <div className={styles.plan}>
            <BasicPlan />
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
            {planStatus == "active" ? (
              <Button text={"Управлять планом"} onClick={() => navigate("/user_page/profile", { state: { targetId: "plan_info" } })} className={styles.button} />
            ) : (
              null
            )
            }
            {planStatus == "on_confirm" ? (
              <Button text={"Изменить заявку"} onClick={() => navigate("/user_page/profile", { state: { targetId: "plan_info" } })} className={styles.button} />
            ) : (
              null
            )
            }
            {planStatus == "expired" ? (
              <Button text={"Продлить план"} onClick={() => navigate("/user_page/profile", { state: { targetId: "plan_info" } })} className={styles.button} />
            ) : (
              null
            )
            }
          </div>
        </div>
      )
    }
    else if (planType == "advanced") {
      return (
        <div>
          <div className={styles.container}>
            {!isMobile && width > 1110 && <div className={styles.icon}>
              <img src={icon} />
            </div>}
            <div className={styles.title}>
              Добро пожаловать, {name} {" "} {surname}!
            </div>
            <div className={styles.subtitle}>
              {planStatus == "active" ? (!isTrial ? "Вам доступен план:" : "У вас оформлен пробный доступ:") : null}
              {planStatus == "on_confirm" ? "Ваша заявка находится на рассмотрении администратором:" : null}
              {planStatus == "expired" ? "Срок действия плана истек:" : null}
            </div>
            <div className={styles.plan}>
              <AdvancedPlan />
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
              {planStatus == "active" ? (
                <Button text={"Управлять планом"} onClick={() => navigate("/user_page/profile", { state: { targetId: "plan_info" } })} className={styles.button} />
              ) : (
                null
              )
              }
              {planStatus == "on_confirm" ? (
                <Button text={"Изменить заявку"} onClick={() => navigate("/user_page/profile", { state: { targetId: "plan_info" } })} className={styles.button} />
              ) : (
                null
              )
              }
              {planStatus == "expired" ? (
                <Button text={"Продлить план"} onClick={() => navigate("/user_page/profile", { state: { targetId: "plan_info" } })} className={styles.button} />
              ) : (
                null
              )
              }


            </div>
          </div>
        </div>
      )
    }
    else if (planType == "premium") {
      return (
        <div>
          <div className={styles.container}>
            {!isMobile && width > 1110 && <div className={styles.icon}>
              <img src={icon} />
            </div>}
            <div className={styles.title}>
              Добро пожаловать, {name} {" "} {surname}!
            </div>
            <div className={styles.subtitle}>
              {planStatus == "active" ? (!isTrial ? "Вам доступен план:" : "У вас оформлен пробный доступ:") : null}
              {planStatus == "on_confirm" ? "Ваша заявка находится на рассмотрении администратором:" : null}
              {planStatus == "expired" ? "Срок действия плана истек:" : null}
            </div>
            <div className={styles.plan}>
              <PremiumPlan />
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

              {planStatus == "active" ? (
                <Button text={"Управлять планом"} onClick={() => navigate("/user_page/profile", { state: { targetId: "plan_info" } })} className={styles.button} />
              ) : (
                null
              )
              }
              {planStatus == "on_confirm" ? (
                <Button text={"Изменить заявку"} onClick={() => navigate("/user_page/profile", { state: { targetId: "plan_info" } })} className={styles.button} />
              ) : (
                null
              )
              }
              {planStatus == "expired" ? (
                <Button text={"Продлить план"} onClick={() => navigate("/user_page/profile", { state: { targetId: "plan_info" } })} className={styles.button} />
              ) : (
                null
              )
              }


            </div>

          </div>
        </div>
      )
    }
  }


  else if (savedPlan == null) { ////////////////////////////////////////////////////
    return (

      <div>

        <div className={styles.container}>
          <div className={styles.title}>
            Добро пожаловать, {name} {" "} {surname}!
          </div>
          <div className={styles.subtitle}>
            Выберите план:
          </div>
          <PlanList isLogged={true} onChange={onChange} trialApplicable={trialApplicable} />
        </div>


      </div>
    )


  }
}