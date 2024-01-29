
import { useState } from "react";
import { Button } from "../../../../components/button/Button"
import styles from "./ChangePasswordPopup.module.css"
import request from "superagent";


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
    alert(content)
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
    alert("old p " + oldPassword)
    const data = {
      new_password: password,
      old_password: oldPassword
    }
    try {

      const response = await request.patch('http://localhost:5432/users/change-password')
        .set('Access-Control-Allow-Origin', '*')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${props.token}`)
        .send(data)
        .then(

        )
        .catch(error => {
          setServerError(readChangeError(error.response.text));
          throw new Error;

        })
        props.closePopup();
        

    }
    catch (error: any) {
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
                className={styles.input} placeholder="Старый пароль" value={oldPassword} onChange={(event) => { setOldPassword(event.target.value) }} />

              <Button text={""} onClick={handleChange} className={showPassword ? styles.eye : styles.eyeClosed}
              />
            </div>
            <input type={showPassword ? "text" : "password"}
              className={styles.input} placeholder="Новый пароль" value={password} onChange={(event) => { setPassword(event.target.value) }} />
            <input type={showPassword ? "text" : "password"}
              className={styles.input} placeholder="Повторите пароль" value={passwordRepeated} onChange={(event) => { setPasswordRepeated(event.target.value) }} />
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