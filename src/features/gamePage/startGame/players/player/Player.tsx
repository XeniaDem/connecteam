
import styles from "./Player.module.css"

import smallCrown from "./smallCrown.svg"
import photo from "./samplePhoto.svg"
import disconnected from "./disconnected.svg"
import { Button } from "../../../../../components/button/Button";
import { InvitePopup } from "../../chooseTopics/InvitePopup/InvitePopup";
import disableScroll from 'disable-scroll';
import { useState } from "react";

export type PlayerModel = {

  isCreator: boolean;
  isYou: boolean;
  isAnswering: boolean;
  joined: boolean;
  connected: boolean;
  name: string;
  photoUrl: string;
}

type Props = {
  savedPlayer: PlayerModel;



}

Player.defaultProps = { isCreator: false, isYou: false, isAnswering: false, joined: true, connected: true, name: "Ксения", photoUrl: "" }


export function Player({savedPlayer}: Props) {


  const [inviteOpen, setInviteOpen] = useState(false);
  
  const openInvitePopup = () => {
    disableScroll.on()
    setInviteOpen(true)

  }
  const closeInvitePopup = () => {
    disableScroll.off()
    setInviteOpen(false)

  }

  if (savedPlayer.joined && savedPlayer.connected) {
    return (
      <div>
        {savedPlayer.isCreator ? (
          <div className={styles.container}>
            <div className={styles.smallCrown}>
              <img src={smallCrown} />
            </div>




          </div>
        ) : (
          <div className={styles.container}>

          </div>
        )}

        {savedPlayer.isAnswering ? (
          <div className={styles.photoAnswering}>
            <img src={photo} />
          </div>
        ) : (
          <div className={styles.photo}>
            <img src={photo} />
          </div>

        )
        }


        {savedPlayer.isYou ? (
          <div className={styles.nameYou}>
            Вы
          </div>
        ) : (
          <div className={styles.name}>
            {savedPlayer.name}
          </div>

        )
        }



      </div>
    )
  }
  else if (savedPlayer.joined && !savedPlayer.connected) {

    return (
      <div>
        <div className={styles.container}>
          <div className={styles.photoDisconnected}>
            <img src={disconnected} />
          </div>
          <div className={styles.nameDisconnected}>
            {savedPlayer.name}
          </div>

        </div>
      </div>


    )

  }
  else if (!savedPlayer.joined) {
    return (
      <div>
        <Button text={"+"} onClick={openInvitePopup} className={styles.addButton} />
        {inviteOpen ? <InvitePopup closePopup={closeInvitePopup} /> : null}
      </div>

    )

  }
}