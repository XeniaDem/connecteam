
import { useState } from "react";
import { Button } from "../../../../components/button/Button"
import styles from "./ChangePasswordPopup.module.css"
import request from "superagent";
import { patch } from "../../../../utils/api";


type Props = {
  closePopup: () => void;
  token: string;
}

export function ChangePasswordPopup(props: Props) {


  const [oldPassword, setOldPassword] = useState("")
  const [password, setPassword] = useState("")
  const [passwordRepeated, setPasswordRepeated] = useState("")


  const [showPassword, setShowPassword] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const getPasswordError = () => {

    if (oldPassword.length < 8 || password.length < 8 || passwordRepeated.length < 8) {
      return "Пароли должны содержать хотя бы 8 символов"
    }
    if (password != passwordRepeated) {
      return "Пароли не совпадают"
    }
    return null;

  };

  var passwordError = getPasswordError();

  const [serverError, setServerError] = useState(false);


  const readChangeError = (message: any) => {
    var messageParsed = JSON.parse(message);
    var content = messageParsed.message
    if (content.includes("Wrong old password")) {
      return ("Текущий пароль неверен. Пожалуйста, попробуйте еще раз.")

    }
    return content;

  }

  const changePassword = async () => {
    setFormSubmitted(true)
    if (passwordError != null) {
      return;
    }
    const data = {
      new_password: password,
      old_password: oldPassword
    }
    try {

      const response = await patch('users/change-password', data, props.token)
      props.closePopup();


    }
    catch (error: any) {
      setServerError(readChangeError(error.response.text));
      // alert(error.text)
      console.log("error:", error)
    }
  }




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
                className={styles.input} placeholder="Старый пароль" value={oldPassword} onChange={(event) => { setOldPassword((event.target.value).replace(/\s/g, '')) }} />

              <Button text={""} onClick={handleChange} className={showPassword ? styles.eye : styles.eyeClosed}
              />
            </div>
            <input type={showPassword ? "text" : "password"}
              className={styles.input} placeholder="Новый пароль" value={password} onChange={(event) => { setPassword((event.target.value).replace(/\s/g, '')) }} />
            <input type={showPassword ? "text" : "password"}
              className={styles.input} placeholder="Повторите пароль" value={passwordRepeated} onChange={(event) => { setPasswordRepeated((event.target.value).replace(/\s/g, '')) }} />
          </div>

          {formSubmitted && (passwordError) ? (
            <div className={styles.errorMessage}>
              {passwordError}

            </div>

          ) : (
            <div />
          )}

          {formSubmitted && (serverError) ? (
            <div className={styles.errorMessage}>
              {serverError}

            </div>

          ) : (
            <div />
          )}
          <Button text={"Сменить пароль"} onClick={changePassword} className={styles.sendButton} />

        </div>
      </div>
    </div>
  )
}