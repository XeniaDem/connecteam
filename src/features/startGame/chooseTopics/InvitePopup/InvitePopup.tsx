
import { useState } from "react";
import { Button } from "../../../../components/button/Button"
import styles from "./InvitePopup.module.css"

type Props = {
  link: string;
  closePopup: () => void;

}

InvitePopup.defaultProps = { link: "https://connnecteam.com/forms/d/e/1FAIpQLSclRBDTVi0K" }



export function InvitePopup(props: Props) {
  const [copiedHidden, setCopiedHidden] = useState(true);
  const copyLink = () => {
    setCopiedHidden(false)
    setTimeout(() => {
      setCopiedHidden(true);
    }, 3000);

  }

  return (
    <div className={styles.background}>
      <div className={styles.container}>

        <div className={styles.close}>
          <Button text={""} onClick={props.closePopup} className={styles.closeButton} />
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
          <div className={styles.divider} />
          <div className={styles.info}>
          {!copiedHidden ? (<div className={styles.copied}>
            Скопировано!
          </div>
          ) : (
            null

          )}
          </div>


        </div>

        <Button text={"Копировать"} onClick={copyLink} className={styles.copyButton} />

      </div>

    </div>
  )
}