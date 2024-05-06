import styles from "./PurchaseResult.module.css"
import ellipse1 from "../../../app/assets/ellipse1.svg"
import ellipse2 from "../../../app/assets/ellipse2.svg"
import { Button } from "../../../components/button/Button"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { patch, post } from "../../../utils/api"
import { useDispatch, useSelector } from "react-redux"
import { selectOrderId, selectPlanId, setPurchaseData } from "../../../store/purchaseSlice"
import { selectToken } from "../../../store/authSlice"



export function PurchaseResult() {

  const navigate = useNavigate()

  const location = useLocation()

  const dispatch = useDispatch()

  const token = useSelector(selectToken)

  const orderId = useSelector(selectOrderId)
  const planId = useSelector(selectPlanId)



  const [purchaseResult, setPurchaseResult] = useState("")

  const readPurchaseResult = (message: any) => {
    var messageParsed = JSON.parse(message);
    var content = messageParsed.message;
    if (content.includes("already has") || content.includes("already succeeded")) { //////////////////
      return "Вы уже приобрели подписку"

    }
    if (content.includes("not paid")) {
      return "Не удалось приобрести подписку"
    }
    return content;


  }

  const handlePurchase = async (type: string) => {

    const data = {
      "order_id": orderId,
    }
    try {
      var response;
      if (type == "purchase") {
        response = await post('plans/', data, token)
      } else if (type == "upgrade")  {
        response = await patch('plans/upgrade/' + planId, data, token)
      }
      // response && setPurchaseResult(readPurchaseResult(response.text))
      setPurchaseResult("Вы успешно приобрели подписку")
      return;
    }
    catch (error: any) {
      setPurchaseResult(readPurchaseResult(error.response.text))
      console.log("error:", error)
    }
    // dispatch(setPurchaseData({orderId: "", planId: undefined}))

  }


  useEffect(() => {


    if (location.pathname == "/purchase/plan") {
      handlePurchase("purchase")
      return;

    } else if (location.pathname == "/purchase/upgrade") {
      handlePurchase("upgrade")

    }



  }, []);



  return (
    <div>
      <div className={styles.container}>
        <div className={styles.ellipse1}>
          <img src={ellipse1} />
        </div>
        <div className={styles.ellipse2}>
          <img src={ellipse2} />
        </div>

        <div className={styles.title}>
          {purchaseResult}
        </div>

        <Button text={"Хорошо"} onClick={() =>{ dispatch(setPurchaseData({orderId: "", planId: undefined})); navigate("/user_page")}} className={styles.button} />

      </div>
    </div>
  )
}