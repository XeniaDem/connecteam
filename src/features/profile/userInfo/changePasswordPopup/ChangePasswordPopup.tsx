
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

  const getPasswordError = () => {
    if (oldPassword.length < 8) {
      return "Пароль должен содержать хотя бы 8 символов"

    }
    return null;

  };
  var passwordError = getPasswordError();



  // const changePassword = async () => {
  //   setPasswordSubmitted(true)
  //   if (passwordError != null) {
  //     return;
  //   }
  //   setVerifySubmitted(true)
  //   const data = {
  //     email: email,
  //     password: password
  //   }
  //   try {

  //     const response = await request.post('http://localhost:5432/users/verify-email')
  //       .set('Access-Control-Allow-Origin', '*')
  //       .set('Accept', 'application/json')
  //       .set('Content-Type', 'application/json')
  //       .set('Authorization', `Bearer ${props.token}`)
  //       .send(data)
  //       .then(

  //       response => alert(response.text)

  //     )
  //       .catch(error => {
  //         setVerifyError(readVerifyError(error.response.text));
  //         throw new Error;

  //       })

  //     openVerifyPopup()
  //   }
  //   catch (error: any) {
  //     // alert(error.text)
  //     console.log("error:", error)
  //   }


  // }




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