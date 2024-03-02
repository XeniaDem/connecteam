
import styles from "./LinkSent.module.css"
import padlock from "../padlock.svg"
import ellipse1 from "../ellipse1.svg"
import ellipse2 from "../ellipse2.svg"
import { Button } from "../../../components/button/Button"
import { useLocation, useNavigate } from "react-router-dom"
import { useIsMobile } from "../../../app/hooks/useIsMobile"




export function LinkSent() {
  const isMobile = useIsMobile()
  const navigate = useNavigate()

  const { state } = useLocation();
  const { email } = state || {};


  const maskEmail = (email: string) => {
    var name = email.split('@')[0]; 
    var domen = email.split('@')[1]; 
    var newName = name[0] + name.slice(0, name.length - 1).replace(/./g, '*')
    // var newDomen = domen.slice(0, domen.length - 2).replace(/./g, '*') + domen.substring(domen.length - 2, domen.length)
    return newName + "@" + domen;

  }

  return (
    <div>
      <div className={styles.container}>
        {!isMobile && <div className={styles.ellipse1}>
          <img src={ellipse1} />

        </div>}
        {!isMobile && <div className={styles.ellipse2}>
          <img src={ellipse2} />

        </div>}
        <div className={styles.padlock}>
          <img src={padlock} />

        </div>
        <div className={styles.title}>
          Ссылка отправлена

        </div>
        <div className={styles.text}>
          Мы отправили электронное письмо на адрес {" "}
          <span className={styles.email}>
            {/* {email.substr(0, 2) + email.slice(2, -2).replace(/./g, '*') + email.substr(-4)} */}
            {maskEmail(email)}
          </span>
          {" "} с временным паролем.

        </div>

        <Button text={"Хорошо"} onClick={() => {
          navigate("/auth/login")
        }} className={styles.button} />
      </div>
    </div>
  )
}