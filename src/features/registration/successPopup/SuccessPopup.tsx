
import { useNavigate } from "react-router-dom"
import { Button } from "../../../components/button/Button"
import styles from "../Popup.module.css"
import disableScroll from 'disable-scroll';

type Props = {
  isLogin?: boolean;
}


export function SuccessPopup(props: Props) {

  const navigate = useNavigate()
  if (props.isLogin) {
    return (
      <div className={styles.background}>
        <div className={styles.container}>
  
        <div className={styles.close}>
        <Button text={""} onClick = {() => {navigate("/user_page"); disableScroll.off()}} className={styles.closeButton} />
            </div>
  
  
          <div className={styles.title}>
          Вы успешно подтвердили почту!
          </div>
  
  
  
          <Button text={"Личный кабинет"} onClick = {() => {navigate("/user_page"); disableScroll.off()}} className={styles.button} />
  
        </div>
  
      </div>
    )



  }
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