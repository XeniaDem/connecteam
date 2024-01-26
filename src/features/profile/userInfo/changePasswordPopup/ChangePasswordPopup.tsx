
import { useState } from "react";
import { Button } from "../../../../components/button/Button"
import styles from "./ChangePasswordPopup.module.css"


type Props = {
  closePopup: () => void;
}

export function ChangePasswordPopup(props: Props) {


  const [oldPassword, setOldPassword] = useState("")
  const [password, setPassword] = useState("")
  const [passwordRepeated, setPasswordRepeated] = useState("")

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className={styles.background}>
      <div className={styles.container}>
          <div className={styles.close}>
            <Button text={""} onClick={props.closePopup} className={styles.closeButton} />
          </div>


          <div className={styles.title}>
            Для смены пароля укажите ваш старый и новый пароль.
          </div>



          <div className={styles.inputs}>
            <div className={styles.inputContainer}>
              <input type={showPassword ? "text" : "password"}
                className={styles.input} placeholder="Старый пароль" value={oldPassword} onChange={(event) => { setOldPassword(event.target.value) }} />

              <Button text={""} onClick={handleChange} className={showPassword ? styles.eye : styles.eyeClosed}
              />
            </div>
            <input type={showPassword ? "text" : "password"}
              className={styles.input} placeholder="Новый пароль" value={password} onChange={(event) => { setPassword(event.target.value) }} />
            <input type={showPassword ? "text" : "password"}
              className={styles.input} placeholder="Повторите пароль" value={passwordRepeated} onChange={(event) => { setPasswordRepeated(event.target.value) }} />
          </div>



          <Button text={"Сменить пароль"} onClick={function (): void {
            throw new Error("Function not implemented.")
          }} className={styles.sendButton} />

      </div>
    </div>
    </div>
  )
}