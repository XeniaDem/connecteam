import { Button } from "../../../components/button/Button"
import styles from "./ChoosePlanPopup.module.css"
import { post, readServerError } from "../../../utils/api";
import ellipse1 from "../../../app/assets/ellipse1.svg"
import ellipse2 from "../../../app/assets/ellipse2.svg"
import { useSelector } from "react-redux";
import { selectToken } from "../../../utils/authSlice";



type Props = {
  closePopup: () => void;
  onChange: () => void;
  planType: string | undefined;
  isTrial: boolean;

}

export function ChoosePlanPopup(props: Props) {




  const token = useSelector(selectToken)


  const period = props.planType == "basic" ? (props.isTrial ? 14 : 30) : 30

  const readAccess = () => {
    if (props.planType == "basic")
      return ("Простой")
    if (props.planType == "advanced")
      return ("Расширенный")
    if (props.planType == "premium")
      return ("Широкий")
  }


  const sendRequest = async () => {
    const data = {
      duration: period,
      plan_type: props.planType

    }
    try {

      var response;
      if (props.planType == "basic" && props.isTrial)
        response = await post('plans/trial', data, token)
      else
        response = await post('plans/purchase', data, token)


      props.onChange()
      props.closePopup()


    }
    catch (error: any) {
      readServerError(error.response.text);
      console.log("error:", error)
    }
  }








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
            {props.planType == "basic" ? (!props.isTrial ? "Вы выбрали план" : "Пробный доступ") : "Вы выбрали план"}

          </div>
          <div className={styles.name}>
            {readAccess()}

          </div>
          <div className={styles.subtitle}>
            Период доступа {<br />} <span className={styles.duration}> {period} дней</span>

          </div>

        </div>



        <Button text={"Отправить запрос"} onClick={sendRequest} className={styles.sendButton} />

      </div>

    </div>
  )
}