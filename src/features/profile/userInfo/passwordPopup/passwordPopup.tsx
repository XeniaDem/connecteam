
import { useState } from "react";
import { Button } from "../../../../components/button/Button"
import styles from "./passwordPopup.module.css"


type Props = {
  onClick: () => void
  closePopup: () => void;
  value: string;
  onValueChange?: (newValue: string) => void;
  formSubmitted?: boolean;
  errorMessage?: string | null;
  serverError?: string;
}

export function PasswordPopup(props: Props) {




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
            Введите пароль.
          </div>



          <div className={styles.inputs}>
            <div className={styles.inputContainer}>
              <input type={showPassword ? "text" : "password"}
                className={styles.input} placeholder="Пароль" value={props.value} onChange={(event) => { props.onValueChange?.((event.target.value).replace(/\s/g, '')) }} />

              <Button text={""} onClick={handleChange} className={showPassword ? styles.eye : styles.eyeClosed}
              />
            </div>
          </div>
          {props.formSubmitted && (props.errorMessage) ? (
            <div className={styles.errorMessage}>
              {props.errorMessage}

            </div>

          ) : (
            <div />
          )}

          {props.formSubmitted && (props.serverError) ? (
            <div className={styles.errorMessage}>
              {props.serverError}

            </div>

          ) : (
            <div />
          )}




          <Button text={"Продолжить"} onClick={props.onClick} className={styles.sendButton} />

        </div>
      </div>
    </div>
  )
}