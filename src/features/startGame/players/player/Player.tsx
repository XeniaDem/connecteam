
import styles from "./Player.module.css"

import smallCrown from "./smallCrown.svg"
import photo from "./samplePhoto.svg"
import disconnected from "./disconnected.svg"
import { Button } from "../../../../components/button/Button";
import { InvitePopup } from "../../chooseTopics/InvitePopup/InvitePopup";
import disableScroll from 'disable-scroll';
import { useState } from "react";



type Props = {
  isCreator: boolean;
  isYou: boolean;
  isAnswering: boolean;
  joined: boolean;
  connected: boolean;
  name: string;
  photoUrl: string;


}

Player.defaultProps = { isCreator: false, isYou: false, isAnswering: false, joined: true, connected: true, name: "Ксения", photoUrl: "" }


export function Player(props: Props) {


  const [inviteOpen, setInviteOpen] = useState(false);
  
  const openInvitePopup = () => {
    disableScroll.on()
    setInviteOpen(true)

  }
  const closeInvitePopup = () => {
    disableScroll.off()
    setInviteOpen(false)

  }

  if (props.joined && props.connected) {
    return (
      <div>
        {props.isCreator ? (
          <div className={styles.container}>
            <div className={styles.smallCrown}>
              <img src={smallCrown} />
            </div>




          </div>
        ) : (
          <div className={styles.container}>

          </div>
        )}

        {props.isAnswering ? (
          <div className={styles.photoAnswering}>
            <img src={photo} />
          </div>
        ) : (
          <div className={styles.photo}>
            <img src={photo} />
          </div>

        )
        }


        {props.isYou ? (
          <div className={styles.nameYou}>
            Вы
          </div>
        ) : (
          <div className={styles.name}>
            {props.name}
          </div>

        )
        }



      </div>
    )
  }
  else if (props.joined && !props.connected) {

    return (
      <div>
        <div className={styles.container}>
          <div className={styles.photoDisconnected}>
            <img src={disconnected} />
          </div>
          <div className={styles.nameDisconnected}>
            {props.name}
          </div>

        </div>
      </div>


    )

  }
  else if (!props.joined) {
    return (
      <div>
        <Button text={"+"} onClick={openInvitePopup} className={styles.addButton} />
        {inviteOpen ? <InvitePopup closePopup={closeInvitePopup} /> : null}
      </div>

    )

  }
}