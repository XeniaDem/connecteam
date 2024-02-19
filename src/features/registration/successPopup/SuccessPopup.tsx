
import { useNavigate } from "react-router-dom"
import { Button } from "../../../components/button/Button"
import styles from "../Popup.module.css"
import disableScroll from 'disable-scroll';


export function SuccessPopup() {

  const navigate = useNavigate()
  return (
    <div className={styles.background}>
      <div className={styles.container}>

      <div className={styles.close}>
      <Button text={""} onClick = {() => {navigate("/"); disableScroll.off()}} className={styles.closeButton} />
          </div>


        <div className={styles.title}>
        Вы успешно зарегистрировались!
        </div>



        <Button text={"Войти"} onClick = {() => {navigate("/auth/login"); disableScroll.off()}} className={styles.button} />

      </div>

    </div>
  )
}