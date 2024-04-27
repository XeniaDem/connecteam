import styles from "./Notification.module.css"
import { useEffect, useState } from "react"
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import disableScroll from 'disable-scroll';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from "@mui/material"

import { Delete, patch, readServerError } from "../../../../../utils/api"


export type NotificationModel = {
  id: string;
  name: string;
  surname: string;


}

type Props = {
  savedNotification: NotificationModel;

  onChange: () => void;

}



export function Notification({ savedNotification, onChange }: Props) {






  useEffect(() => {




  }, []);




  return (
    <div className={styles.background}>


      <div className={styles.container}>


        <div className={styles.group}>


          <div className={styles.text} >
            Пользователь {" "}
            <span className={styles.nameActive}>
              {savedNotification.name} {" "} {savedNotification.surname} {" "}
            </span> 
            пригласил вас в игру
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



