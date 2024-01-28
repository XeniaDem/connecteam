
import { useNavigate } from "react-router-dom"
import { Button } from "../../../components/button/Button"
import styles from "../Popup.module.css"

type Props = {
  isLogin?: boolean;
}


export function SuccessPopup(props: Props) {

  const navigate = useNavigate()
  if (props.isLogin) {
    return (
      <div>
        <div className={styles.container}>
  
        <div className={styles.close}>
        <Button text={""} onClick = {() =>navigate("/user_page")} className={styles.closeButton} />
            </div>
  
  
          <div className={styles.title}>
          Вы успешно подтвердили почту!
          </div>
  
  
  
          <Button text={"Личный кабинет"} onClick = {() =>navigate("/user_page")} className={styles.button} />
  
        </div>
  
      </div>
    )



  }
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