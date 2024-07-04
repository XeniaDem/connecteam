
import { useEffect, useState } from "react";
import { Button } from "../../../../components/button/Button"
import styles from "./InvitePopup.module.css"
import { selectToken } from "../../../../store/authSlice";
import { useSelector } from "react-redux";
import { get, readServerError } from "../../../../utils/api";

type Props = {
  gameId?: string;
  closePopup: () => void;

}




export function InvitePopup(props: Props) {
  const token = useSelector(selectToken)
  const [copiedHidden, setCopiedHidden] = useState(true);
  const copyLink = () => {
    navigator.clipboard.writeText(link)
    setCopiedHidden(false)
    setTimeout(() => {
      setCopiedHidden(true);
    }, 3000);

  }

  const [link, setLink] = useState("")


  const readInvitationCode = (message: any) => {
    const messageParsed = JSON.parse(message);
    setLink("https://connecteam.ru/invite/game/" + messageParsed.invitation_code)

  }

  const fetchGame = async () => {
    try {

      const response = await get('games/' + props.gameId, token)
      readInvitationCode(response.text)

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }


  }


  useEffect(() => {
    fetchGame();


  }, []);




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
            {link && link}
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