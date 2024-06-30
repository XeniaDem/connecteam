import { Button } from "../../../components/button/Button"
import styles from "./ChoosePlanPopup.module.css"
import { post, readServerError } from "../../../utils/api";
import ellipse1 from "../../../app/assets/ellipse1.svg"
import ellipse2 from "../../../app/assets/ellipse2.svg"
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../../store/authSlice";
import { useEffect, useState } from "react";
import { setPurchaseData } from "../../../store/purchaseSlice";
import { Plan } from "../PlanList";



type Props = {
  closePopup: () => void;
  onChange: () => void;
  // currentPlanType: string | undefined;
  // currentPlanId: string | undefined;
  currentPlan?: Plan | null
  newPlanType: string;
  buyingTrial: boolean;

}

export function ChoosePlanPopup(props: Props) {
  const appUrl = process.env.REACT_APP_URL;

  const token = useSelector(selectToken)

  const dispatch = useDispatch()

  const period = props.newPlanType == "basic" ? (props.buyingTrial ? 14 : 30) : 30

  const [isUpgrade, setIsUpgrade] = useState(false)

  const [purchaseInfo, setPurchaseInfo] = useState("")


  const readAccess = () => {
    if (!props.currentPlan || props.currentPlan.isTrial) {
      if (props.newPlanType == "basic")
        setPurchaseInfo("Простой")
      if (props.newPlanType == "advanced")
        setPurchaseInfo("Расширенный")
      if (props.newPlanType == "premium")
        setPurchaseInfo("Широкий")
    } else {
      setIsUpgrade(true)
      if (props.currentPlan.planType == "basic" && props.newPlanType == "advanced") {
        setPurchaseInfo("Простой -> Расширенный")
      }
      if (props.currentPlan.planType == "basic" && props.newPlanType == "premium") {
        setPurchaseInfo("Простой -> Широкий")
      }
      if (props.currentPlan.planType == "advanced" && props.newPlanType == "premium") {
        setPurchaseInfo("Расширенный -> Широкий")
      }

    }
  }


  const purchasePlan = async () => {

    try {
      if (props.newPlanType == "basic" && props.buyingTrial) {
        const data = {
          "duration": 14,
          "plan_type": "basic"

        }
        const response = await post('plans/trial', data, token)
        props.onChange()
        props.closePopup()
      }
      else {
        if (!isUpgrade) {
          handlePurchase(props.newPlanType, appUrl + "purchase/plan")
        } else {
          props.currentPlan && handlePurchase(props.currentPlan.planType + "-to-" + props.newPlanType, appUrl + "purchase/upgrade")
        }

      }
      //   response = await post('plans/purchase', data, token)

    }
    catch (error: any) {
      readServerError(error.response.text);
      console.log("error:", error)
    }
  }



  const handlePurchase = async (plan: string, returnUrl: string) => {
    const data = {
      "plan": plan,
      "return_url": returnUrl
    }

    console.log(data)
    try {
      const response = await post('payment/', data, token)
      dispatch(setPurchaseData({ orderId: JSON.parse(response.text).order_id, planId: props.currentPlan?.id }));
      document.location.href = (JSON.parse(response.text).confirmation_url)
    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }
  }

  useEffect(() => {
    props.currentPlan && console.log(props.currentPlan)
    readAccess()
  }, []);



  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.close}>
          <Button text={""} onClick={props.closePopup} className={styles.closeButton} />
        </div>
        <div className={styles.body}>
          <div className={styles.ellipse1}>
            <img src={ellipse1} />
          </div>
          <div className={styles.ellipse2}>
            <img src={ellipse2} />
          </div>
          <div className={styles.title}>
            {!isUpgrade ?
              (props.newPlanType == "basic" ? (!props.buyingTrial ? "Вы выбрали план" : "Пробный доступ") : "Вы выбрали план")
              :
              "Вы выбрали апгрейд"
            }
          </div>
          <div className={styles.name}>
            {purchaseInfo}
          </div>
          {!isUpgrade ?
            <div className={styles.subtitle}>
              Период доступа {<br />} <span className={styles.duration}> {period} дней</span>
            </div>
            :
            <div className={styles.subtitle}>
              Период доступа {<br />} <span className={styles.duration}> до {props.currentPlan?.expiryDate}</span>
            </div>
          }
        </div>

        <Button text={"Приобрести"} onClick={purchasePlan} className={styles.sendButton} />
      </div>
    </div>
  )
}