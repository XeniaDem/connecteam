
import { useNavigate } from "react-router-dom"
import { Button } from "../../../components/button/Button"
import styles from "../Popup.module.css"



export function SuccessPopup() {

  const navigate = useNavigate()
  return (
    <div>
      <div className={styles.container}>

      <div className={styles.close}>
      <Button text={""} onClick = {() =>navigate("/")} className={styles.closeButton} />
          </div>


        <div className={styles.title}>
        Вы успешно зарегистрировались!
        </div>



        <Button text={"Войти"} onClick = {() =>navigate("/login")} className={styles.button} />

      </div>

    </div>
  )
}