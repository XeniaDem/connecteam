
import styles from "./LinkSent.module.css"
import padlock from "../../../../app/assets/padlock.svg"
import ellipse1 from "../../../../app/assets/ellipse1.svg"
import ellipse2 from "../../../../app/assets/ellipse2.svg"
import { Button } from "../../../../components/button/Button"
import { useLocation, useNavigate } from "react-router-dom"
import {isMobile} from 'react-device-detect';
import { useEffect, useState } from "react"


export function LinkSent() {
  const navigate = useNavigate()

  const { state } = useLocation();
  const { email } = state || {};


  const [maskedEmail, setMaskedEmail] = useState("")
  const maskEmail = (email: string) => {

    var name = email.split('@')[0]; 
    var domen = email.split('@')[1]; 
    var newName = name[0] + name.slice(0, name.length - 1).replace(/./g, '*')
    setMaskedEmail(newName + "@" + domen)
  }

  useEffect(() => {
    console.log(email)
    
    if (!email) {
      navigate("/user_page")
      return;
    }
    maskEmail(email)
    
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
        {!isMobile && <div className={styles.padlock}>
          <img src={padlock} />

        </div>}
        <div className={styles.title}>
          Письмо отправлено

        </div>
        <div className={styles.text}>
          Мы отправили электронное письмо на адрес {" "}
          <span className={styles.email}>
            {maskedEmail}
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