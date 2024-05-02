import styles from "./Notification.module.css"
import { useEffect, useState } from "react"
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import disableScroll from 'disable-scroll';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from "@mui/material"

import { Delete, patch, readServerError } from "../../../../../utils/api"
import { Button } from "../../../../../components/button/Button";
export enum NotificationType {
  CancelGameNotification    = "game-cancel",
  StartGameNotification     = "game-start",
  InviteGameNotification    = "invite-game",
  InviteSubNotification     = "invite-sub",
  DeleteFromSubNotification = "delete-sub"
}




export type NotificationModel = {
  type: NotificationType;
  payload: string;
  date: string;
  // name: string;
  // surname: string;


}

type Props = {
  savedNotification: NotificationModel;

  onChange: () => void;

}



export function Notification({ savedNotification, onChange }: Props) {






  useEffect(() => {
    console.log(savedNotification.type)




  }, []);



  if (savedNotification.type == NotificationType.CancelGameNotification) {
    return (
      <div>
        <div className={styles.container}>
          <div className={styles.group}>
            <div className={styles.text} >
              Игра {" "}
              <span className={styles.nameActive}>
                {" данные игры "}
              </span>
              отменена
            </div>

          </div>
        </div>

        <div className={styles.divider} />

      </div>

    )
  }



  if (savedNotification.type == NotificationType.InviteGameNotification) {
    return (
      <div>
        <div className={styles.container}>
          <div className={styles.group}>
            <div className={styles.text} >
              Пользователь {" "}
              <span className={styles.nameActive}>
                {" данные пользователя "}
              </span>
              пригласил Вас в игру {" "}
              <span className={styles.nameActive}>
                {" данные игры "}
              </span>
            </div>

          </div>
          <div className={styles.group}>

            <div className={styles.controlButtons}>
              <IconButton onClick={() => null}>

                <DoneIcon fontSize="medium" sx={{ fill: "url(#linearColors)" }} />
              </IconButton>
              <IconButton onClick={() => null}>

                <ClearIcon fontSize="medium" sx={{ fill: "url(#linearColors)" }} />
              </IconButton>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

      </div>

    )
  }


  if (savedNotification.type == NotificationType.StartGameNotification) {
    return (
      <div>
        <div className={styles.container}>
          <div className={styles.group}>
            <div className={styles.text} >
              Игра {" "}
              <span className={styles.nameActive}>
                {" данные игры "}
              </span>
              начинается
            </div>

          </div>
          <div className={styles.group}>

            <div className={styles.controlButtons}>
              <Button text={"Перейти"} onClick={() => null} className={styles.button} />


            </div>
          </div>
        </div>

        <div className={styles.divider} />

      </div>

    )
  }
  return (null)


}



