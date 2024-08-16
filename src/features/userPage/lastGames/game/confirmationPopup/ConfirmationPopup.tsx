import { Button } from "../../../../../components/button/Button"
import styles from "./ConfirmationPopup.module.css"
import ellipse1 from "../../../../../app/assets/ellipse1.svg"
import ellipse2 from "../../../../../app/assets/ellipse2.svg"
import { useSelector } from "react-redux";
import { selectId, selectToken } from "../../../../../store/authSlice";
import { Delete, patch, readServerError } from "../../../../../utils/api";
import { GameModel } from "../Game";



type Props = {
  closePopup: () => void;
  isCancel: boolean;
  savedGame: GameModel;

}

export function ConfirmationPopup(props: Props) {

  const token = useSelector(selectToken)

  const deleteGame = async () => {
    try {
      const response = await Delete('games/' + props.savedGame.id, token)
      props.closePopup()
    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }
  }

  const cancelGame = async () => {
    try {
      const response = await patch('games/' + props.savedGame.id + '/cancel', undefined, token)
      props.closePopup()
    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }
  }



  return (
    <div>
      <div className={styles.background}>
        <div className={styles.container}>
          <div className={styles.close}>
            <Button text={""} onClick={props.closePopup} className={styles.closeButton} />
          </div>
          <div className={styles.body}>
            <div className={styles.ellipse1}>
              <img src={ellipse1} />
            </div>
            <div className={styles.ellipse2}>
              <img src={ellipse2} />
            </div>



            {props.isCancel ?
              <div className={styles.text}>
                Вы точно хотите отменить игру <br /> {props.savedGame.name}?
              </div>
              :
              <div className={styles.text}>
                Вы точно хотите удалить игру <br /> {props.savedGame.name}?
              </div>
            }


            <div className={styles.buttons}>
              <Button text={"Да"} onClick={() => { props.isCancel ? cancelGame() : deleteGame() }} className={styles.okButton} />
              <Button text={"Отмена"} onClick={props.closePopup} className={styles.cancelButton} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}