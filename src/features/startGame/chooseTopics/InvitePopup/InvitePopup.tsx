
import { Button } from "../../../../components/button/Button"
import styles from "./InvitePopup.module.css"

type Props = {
  link: string;
  
}

InvitePopup.defaultProps = { link: "https://connnecteam.com/forms/d/e/1FAIpQLSclRBDTVi0K" }

export function InvitePopup(props: Props) {
  return (
    <div>
      <div className={styles.container}>

        <div className={styles.close}>
          <Button text={""} onClick={function (): void {
            throw new Error("Function not implemented.")
          }} className={styles.closeButton} />
        </div>


        <div className={styles.title}>
          Пригласите друзей
        </div>
        <div className={styles.linkContainer}>
          <div className={styles.subtitle}>
            Ссылка
          </div>
          <div className={styles.link}>
          {props.link}
          </div>
          <div className={styles.divider}/>


        </div>

        <Button text={"Копировать"} onClick={function (): void {
          throw new Error("Function not implemented.")
        }} className={styles.copyButton} />

      </div>

    </div>
  )
}