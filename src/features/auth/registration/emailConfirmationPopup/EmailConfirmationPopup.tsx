
import { Button } from "../../../../components/button/Button"
import styles from "../Popup.module.css"

type Props = {
  onClick: () => void
  value?: string;
  onValueChange?: (newValue: string) => void;
  formSubmitted?: boolean;
  errorMessage?: string;

}


export function EmailConfirmationPopup(props: Props) {
  return (
    <div>
      <div className={styles.background}>
        <div className={styles.container}>

          <div className={styles.title}>
            Введите код из письма, отправленного на указанный электронный адрес
          </div>

          <input className={styles.inputSmall} maxLength={4} placeholder="Код из письма" value={props.value}
            onChange={(event) => { props.onValueChange?.((event.target.value).replace(/\D/g, "")) }} />

          {props.formSubmitted && props.errorMessage ? (
            <div className={styles.errorMessage}>
              {props.errorMessage}
            </div>
          ) : (
            null
          )}

          <Button text={"Отправить"} onClick={props.onClick} className={styles.button} />

        </div>
      </div>
    </div>
  )
}