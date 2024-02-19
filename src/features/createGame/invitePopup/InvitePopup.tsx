
import { useState } from "react";
import { Button } from "../../../components/button/Button"
import styles from "./InvitePopup.module.css"
import validator from "validator";

type Props = {
  closePopup: () => void;
}




export function InvitePopup(props: Props) {

  const [email, setEmail] = useState("")

  const[formSubmitted, setFormSubmitted] = useState(false)


  const getEmailErrorMessage = () => {

    if (!validator.isEmail(email)) {
      return "Некорректно введен адрес эл. почты"
    }

    return null
  }
  var emailErrorMessage = getEmailErrorMessage()


  const sendInvite = () => { ///////////////////////////////
    setFormSubmitted(true)
    if (emailErrorMessage != null) {
      return;
    }



  }


  return (
    <div className={styles.background}>
      <div className={styles.container}>

      <div className={styles.close}>
      <Button text={""} onClick={props.closePopup}  className={styles.closeButton} />
          </div>


        <div className={styles.title}>
        Укажите электронный адрес приглашаемого пользователя
        </div>

        <input className={styles.input} placeholder="Эл. адрес" value={email} onChange={(event) => { setEmail((event.target.value).replace(/\s/g, '')) }} />

        {formSubmitted && (emailErrorMessage) ? (
            <div className={styles.errorMessage}>
              {emailErrorMessage}

            </div>

          ) : (
            <div />
          )}

        <Button text={"Отправить"} onClick={sendInvite} className={styles.sendButton} />

      </div>

    </div>
  )
}