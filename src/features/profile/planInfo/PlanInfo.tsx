import styles from "./PlanInfo.module.css"
import ellipse1 from "../../../app/assets/ellipse1.svg"
import ellipse2 from "../../../app/assets/ellipse2.svg"
import ellipse3 from "../../../app/assets/ellipse3.svg"
import icon1 from "./icon1.svg"
import icon2 from "./icon2.svg"
import { PlanList } from "../../planList/PlanList"
import { useEffect, useState } from "react"
import { get, readServerError } from "../../../utils/api"
import { useSelector } from "react-redux"
import { selectToken } from "../../../utils/authSlice"


export type Plan = {
  planType: string;
  expiryDate: string;
  planAccess: string;
  status: string;
  invitationCode?: string;
  isTrial?: boolean;


}
type Props = {
  savedPlan: Plan | null;
  onChange: () => void;

}

export function PlanInfo({ savedPlan, onChange }: Props) {

  const token = useSelector(selectToken)
  const [trialApplicable, setTrialApplicable] = useState(false)


  const fetchPreviousPlans = async () => {
    try {

      const response = await get('plans/', token)
      if (JSON.parse(response.text).data == null) {
        setTrialApplicable(true)

      } else {
        setTrialApplicable(false)
      }


    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }


  }

  useEffect(() => {
    if (savedPlan == null)
      fetchPreviousPlans()

  }, [savedPlan]);



  return (
    <div id="plan_info">

      <div className={styles.container}>
        <div className={styles.ellipse1}>
          <img src={ellipse1} />
        </div>
        <div className={styles.ellipse2}>
          <img src={ellipse2} />
        </div>
        <div className={styles.ellipse3}>
          <img src={ellipse3} />
        </div>
        <div className={styles.icon1}>
          <img src={icon1} />
        </div>
        <div className={styles.icon2}>
          <img src={icon2} />
        </div>


        <div className={styles.title}>
          Доступ
        </div>
        <PlanList isLogged={true} planInfo={savedPlan} trialApplicable={trialApplicable} onChange={onChange} />

      </div>
    </div>
  )
}