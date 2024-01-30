
import { Field } from "../field/Field"
import styles from "./UserInfo.module.css"
import photo from "../photo.svg"
import ellipse1 from "../ellipse1.svg"
import { Button } from "../../../components/button/Button"
import React, { useEffect, useRef, useState } from "react"
import { ChangePasswordPopup } from "./changePasswordPopup/ChangePasswordPopup"
import disableScroll from 'disable-scroll';
import request from "superagent"
import { useNavigate } from "react-router-dom"
import validator from "validator"
import { EmailConfirmationPopup } from "../../registration/emailConfirmationPopup/EmailConfirmationPopup"
import { PasswordPopup } from "./passwordPopup/passwordPopup"

export type User = {
  name: string;
  surname: string;
  about: string;
  email: string;

}
type Props = {
  token: string;
  savedUser: User;

}

export function UserInfo({ savedUser, token }: Props) {



  // const navigate = useNavigate()

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");

  // const readUserInfo = (message: any) => {
  //   var messageParsed = JSON.parse(message);
  //   setName(messageParsed.first_name)
  //   setSurname(messageParsed.second_name)
  //   setEmail(messageParsed.email)
  //   setAbout("")///////////

  // }

  // const readServerError = (message: any) => {
  //   var messageParsed = JSON.parse(message);
  //   var content = messageParsed.message

  //   if (content.includes("token is expired")) {
  //     navigate("/login")
  //     return ("Срок действия токена вышел.")

  //   }
  //   alert(content);

  // }

  // const fetchUserPage = async () => {
  //   try {

  //     const response = await request.get('http://localhost:5432/users/me')
  //       .set('Access-Control-Allow-Origin', '*')
  //       .set('Accept', 'application/json')
  //       .set('Content-Type', 'application/json')
  //       .set('Authorization', `Bearer ${props.token}`)
  //       .then(

  //         response => readUserInfo(response.text)

  //       )
  //       .catch(error => {
  //         readServerError(error.response.text)
  //         throw new Error;

  //       })

  //   }
  //   catch (error: any) {
  //     // alert(error.text)
  //     console.log("error:", error)
  //   }


  // }



  const [isDataChanging, setIsDataChanging] = React.useState(false);

  // const [oldName, setOldName] = useState("");
  // const [oldSurname, setOldSurname] = useState("");
  // const [oldAbout, setOldAbout] = useState("");


  const handleDataChange = () => {
    if (!isDataChanging) {
      // setOldName(name);
      // setOldSurname(surname);
      // setOldAbout(about);
    }

    if (isDataChanging) {
      if (dataErrorMessage != null) {
        return;
      }

      else if ((savedUser.name != name) || (savedUser.surname != surname) || (savedUser.about != about)) {
        alert("datachange")
      }
      else {
        setIsDataChanging(!isDataChanging);
        alert("Ничего не сохраняем")
      }
    }
    setIsDataChanging(!isDataChanging); /////////
  };

  const [isEmailChanging, setIsEmailChanging] = React.useState(false);
  // const [oldEmail, setOldEmail] = useState("");

  const [passwordOpen, setPasswordOpen] = useState(false);
  const [passwordSubmitted, setPasswordSubmitted] = useState(false);
  const [password, setPassword] = useState("");


  const [verifyError, setVerifyError] = useState<undefined | string>('');





  const handleEmailChange = () => {
    if (!isEmailChanging) {
      setIsEmailChanging(!isEmailChanging);
      // setOldEmail(email);
    }

    if (isEmailChanging) {
      // setFormSubmitted(true)
      if (emailErrorMessage != null) {
        return;
      }

      else if (savedUser.email != email) {
        alert("emailchange")
        openPasswordPopup()
        // setIsEmailChanging(!isEmailChanging);

        // verifyEmail()


      } else {
        alert("Ничего не сохраняем")
        setIsEmailChanging(!isEmailChanging);
      }

    }





  };

  const openPasswordPopup = () => {
    disableScroll.on()
    setPasswordOpen(true)

  }
  const closePasswordPopup = () => {
    disableScroll.off()
    setPassword("")
    passwordError = "";
    setVerifyError("")
    setPasswordSubmitted(false)
    setPasswordOpen(false)

  }
  const getPasswordError = () => {
    if (password.length < 8) {
      return "Пароль должен содержать хотя бы 8 символов"

    }
    return null;

  };
  var passwordError = getPasswordError();

  const readVerifyError = (message: any) => {
    var messageParsed = JSON.parse(message);
    var content = messageParsed.message

    if (content.includes("Email is already taken")) {
      return ("Введенный эл. адрес уже используется другим пользователем.")
    }
    if (content.includes("Wrong password")) {
      return ("Пароль неверен. Пожалуйста, попробуйте еще раз.")
    }
    return content;

  }

  const verifyEmail = async () => { //проверяет новый email на незанятость а также пароль
    setPasswordSubmitted(true)
    if (passwordError != null) {
      return;
    }
    // setVerifySubmitted(true)
    const data = {
      email: email,
      password: password
    }
    try {

      const response = await request.post('http://localhost:5432/users/verify-email')
        .set('Access-Control-Allow-Origin', '*')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(data)
        .then(
          response => alert(response.text)
        )
        .catch(error => {
          setVerifyError(readVerifyError(error.response.text));
          throw new Error;

        })
      closePasswordPopup()
      openVerifyPopup()
    }
    catch (error: any) {
      // alert(error.text)
      console.log("error:", error)
    }


  }


  const openVerifyPopup = () => {
    disableScroll.on()
    setVerifyOpen(true)

  }
  const closeVerifyPopup = () => {
    disableScroll.off()
    setCodeValue("")
    setVerifyError("")
    setVerifySubmitted(false)
    setVerifyOpen(false)

  }
  const [verifyOpen, setVerifyOpen] = useState(false);

  const [codeValue, setCodeValue] = useState<undefined | string>('');

  const [verifySubmitted, setVerifySubmitted] = useState(false)


  const readChangeError = (message: any) => {
    var messageParsed = JSON.parse(message);
    var content = messageParsed.message
    alert(content)
    if (content.includes("Wrong verification code")) {
      return ("Введенный код неверен. Пожалуйста, попробуйте еще раз.")

    }

    return content;

  }

  const changeEmail = async () => { //меняет емаил если он подтвержден кодом
    setVerifySubmitted(true)
    const data = {
      new_email: email,
      code: codeValue
    }
    try {

      const response = await request.patch('http://localhost:5432/users/change-email')
        .set('Access-Control-Allow-Origin', '*')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(data)
        .then(
          response => alert(response.text)
        )
        .catch(error => {
          setVerifyError(readChangeError(error.response.text))
          throw new Error;

        })
      closeVerifyPopup()
      setIsEmailChanging(!isEmailChanging);
    }
    catch (error: any) {
      // alert(error.text)
      console.log("error:", error)
    }


  }





  const openChangePasswordPopup = () => {
    disableScroll.on()
    setChangePasswordOpen(true)

  }
  const closeChangePasswordPopup = () => {
    disableScroll.off()
    setChangePasswordOpen(false)

  }
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);




  const getDataErrorMessage = () => {

    if (name.length < 1 || surname.length < 1) {
      return "Поля имя и фамилия не могут быть пустыми"
    }

    return null
  }


  var dataErrorMessage = getDataErrorMessage()

  const getEmailErrorMessage = () => {

    if (!validator.isEmail(email)) {
      return "Некорректно введен адрес эл. почты"
    }

    return null
  }
  var emailErrorMessage = getEmailErrorMessage()













  useEffect(() => {

    disableScroll.off();
    setName(savedUser.name)
    setSurname(savedUser.surname)
    setAbout(savedUser.about)
    setEmail(savedUser.email)

  }, [savedUser]);






  return (
    <div>

      <div className={(!changePasswordOpen && !verifyOpen && !passwordOpen) ? styles.container : styles.containerDisabled} >
        <div className={styles.ellipse1}>
          <img src={ellipse1} />
        </div>

        <div className={styles.left}>
          <div className={styles.title}>
            Личные данные
          </div>
          <div className={styles.photo}>
            <img src={photo} />
          </div>
          <Button text={"Сменить фотографию профиля"} onClick={function (): void {
            throw new Error("Function not implemented.")
          }} className={styles.footerButton} />



        </div>


        <div className={styles.right}>
          {/* <div className={styles.settingsContainer}>
            <Button text={"Расширенные настройки  <"} onClick={function (): void {
              throw new Error("Function not implemented.")
            }} className={styles.settingsButton} />
          </div> */}

          <Field isInput={true} title={"Имя"} disabled={!isDataChanging} value={name} onValueChange={setName} />
          <Field isInput={true} title={"Фамилия"} disabled={!isDataChanging} value={surname} onValueChange={setSurname} />

          <Field isInput={false} title={"О себе"} placeholder="Напишите что-нибудь..." disabled={!isDataChanging} value={about} onValueChange={setAbout} />




          <div className={styles.footerButtons}>
            {dataErrorMessage && isDataChanging && (<div className={styles.errorMessage}>
              {dataErrorMessage}

            </div>)}

            <Button text={!isDataChanging ? "Редактировать данные" : "Сохранить"} onClick={handleDataChange} className={styles.footerButton} />
            <Button text={"Сменить пароль"} onClick={openChangePasswordPopup} className={styles.footerButton} />

          </div>
          <Field isInput={true} title={"Электронный адрес"} disabled={!isEmailChanging} value={email} onValueChange={setEmail} />

          <div className={styles.footerButtons}>
            {emailErrorMessage && isEmailChanging && (<div className={styles.errorMessage}>
              {emailErrorMessage}

            </div>)}

            <Button text={!isEmailChanging ? "Сменить эл. адрес" : "Сохранить"} onClick={handleEmailChange} className={styles.footerButton} />

          </div>

        </div>
      </div>
      {passwordOpen ? <PasswordPopup onClick={verifyEmail} value={password} onValueChange={setPassword} formSubmitted={passwordSubmitted}
        errorMessage={passwordError} serverError={verifyError} closePopup={closePasswordPopup} /> : null}
      {verifyOpen ? <EmailConfirmationPopup onClick={changeEmail}
        value={codeValue} onValueChange={setCodeValue}
        formSubmitted={verifySubmitted} errorMessage={verifyError} /> : null}
      {changePasswordOpen ? <ChangePasswordPopup closePopup={closeChangePasswordPopup} token={token} /> : null}

    </div>
  )
}