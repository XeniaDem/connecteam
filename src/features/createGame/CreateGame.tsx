
import { useState } from "react"
import { Button } from "../../components/button/Button"
import styles from "./CreateGame.module.css"
import { CopyPopup } from "./copyPopup/CopyPopup"
import ellipse1 from "./ellipse1.svg"
import ellipse2 from "./ellipse2.svg"
import icon from "./icon.svg"
import { InvitePopup } from "./invitePopup/InvitePopup"
import disableScroll from 'disable-scroll';


type Props = {
  name?: string;
}

CreateGame.defaultProps = { name: "имя" }
export function CreateGame(props: Props) {


  const [gameCreated, setGameCreated] = useState(false)


  const createGame = () => {
    ////////////////////
    setGameCreated(true);
  }

  const [inviteOpen, setInviteOpen] = useState(false);
  const [copyOpen, setCopyOpen] = useState(false);


  const openInvitePopup = () => {
    disableScroll.on()
    setInviteOpen(true)

  }
  const closeInvitePopup = () => {
    disableScroll.off()
    setInviteOpen(false)

  }
  const openCopyPopup = () => {
    setCopyOpen(true)
    setTimeout(() => {
      setCopyOpen(false);
    }, 3000);

  }


  return (
    <div>
      <div className={!inviteOpen ? styles.container : styles.containerDisabled}>
        <div className={styles.ellipse1}>
          <img src={ellipse1} />

        </div>
        <div className={styles.ellipse2}>
          <img src={ellipse2} />

        </div>
        <div className={styles.icon}>
          <img src={icon} />

        </div>

        <div className={styles.title}>
          Создание игры
        </div>
        <div className={styles.subtitle}>
          Имя создателя: {props.name}
        </div>

        <div className={styles.creation}>
          <div className={styles.items}>
            <input className={styles.input} placeholder="Название игры" disabled={gameCreated} />
            <input className={styles.input} placeholder="Дата и время игры" disabled={gameCreated} />

          </div>
          {/* <Button text={"Создать игру"} onClick={createGame} className={styles.createButton} disabled = {gameCreated} /> */}

          {!gameCreated ?
            <div className={styles.items} >
              <Button text={"Создать игру"} onClick={createGame} className={styles.createButton} />
            </div> :
            <div className={styles.items} >
              <div className={styles.text} >
                Игра успешно создана!
              </div>
            </div>
          }





          {!gameCreated ? null :
            <div className={styles.items} >
              <Button text={"Добавить участника"} onClick={openInvitePopup} className={styles.inviteButton} />

              <Button text={"Поделиться игрой"} onClick={openCopyPopup} className={styles.inviteButton} />
            </div>
          }
        </div>





      </div>
      {inviteOpen ? <InvitePopup closePopup={closeInvitePopup} /> : null}
      {copyOpen ? <CopyPopup /> : null}


    </div>
  )
}