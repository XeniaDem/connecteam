
import { useEffect, useState } from "react";
import { Button } from "../../../../components/button/Button"
import styles from "./NotificationsCenter.module.css"
import { OutsideClick } from 'outsideclick-react'


type Props = {
  onBlur: () => void;
}


export function NotificationsCenter(props: Props) {
  const [copiedHidden, setCopiedHidden] = useState(true);
  const copyLink = () => {
    navigator.clipboard.writeText(link)
    setCopiedHidden(false)
    setTimeout(() => {
      setCopiedHidden(true);
    }, 3000);

  }

  const [link, setLink] = useState("")

  const fetchData = () => {


  }


  useEffect(() => {

    fetchData()
  }, []);





  return (
    <OutsideClick
      onOutsideClick={() => {
        props.onBlur()
      }}
      ignoreElement=".ignore"
    >
      <div className={styles.container}>


        <div className={styles.title}>
          Пригласите участника
        </div>
        <div className={styles.linkContainer}>
          <div className={styles.subtitle}>
            Ссылка
          </div>
          <div className={styles.link}>
            {link}
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
        <div className={styles.buttons}>
          <Button text={"Отправить приглашение"} onClick={() => null} className={styles.copyButton} />

          <Button text={"Копировать"} onClick={copyLink} className={styles.copyButton} />
        </div>

      </div>
    </OutsideClick>

  )
}