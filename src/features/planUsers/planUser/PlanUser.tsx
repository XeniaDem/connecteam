import styles from "./PlanUser.module.css"
import { useState } from "react"
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import disableScroll from 'disable-scroll';
import { IconButton } from "@mui/material"
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import { RemoveUserPopup } from "../removeUserPopup/RemoveUserPopup";
import { isMobile } from 'react-device-detect';


export type PlanUserModel = {
  id: string;
  name: string;
  surname: string;
  email: string;
  photo: string;
  isHolder: boolean;

}

type Props = {
  planUser: PlanUserModel;
  token: string;
  onChange: () => void;

}



export function PlanUser({ planUser, token, onChange }: Props) {



  const [removeUserOpen, setRemoveUserOpen] = useState(false);



  const openRemoveUserPopup = () => {
    disableScroll.on()
    setRemoveUserOpen(true)

  }
  const closeRemoveUserPopup = () => {
    disableScroll.off()
    setRemoveUserOpen(false)
    onChange()
  }




  return (

    <div className={styles.background}>

      <div className={styles.container}>
        <div className={styles.group}>
          <div className={styles.photo}>
            {/* <img src = {photo}/> */}
            {(planUser.photo == "") ? <PhotoCameraIcon fontSize={!isMobile ? "large" : "small"} sx={{ fill: "url(#linearColors)" }} /> : <img src={planUser.photo} />}
          </div>

          <div className={planUser.isHolder ? styles.nameActive : styles.name} >
            {planUser.name} {" "} {planUser.surname} {planUser.isHolder ? "(Вы)" : null}
          </div>


          {!isMobile && <div className={styles.email}>
            {planUser.email}
          </div>}



        </div>
        <div className={styles.group}>
          {!isMobile && <div className={styles.text}>
            Доступ:
          </div>}
          {!isMobile && <div className={styles.plan}>

            Широкий
          </div>}


          <div className={styles.controlButtons}>
            {!planUser.isHolder ?
              <IconButton onClick={openRemoveUserPopup}>

                <PersonRemoveAlt1Icon fontSize="large" sx={{ fill: "url(#linearColors)" }} />
              </IconButton>
              :
              null}
          </div>

        </div>



      </div>

      <div className={styles.divider} />
      {removeUserOpen ? <RemoveUserPopup planUser={planUser} token={token} closePopup={closeRemoveUserPopup} onChange={onChange} /> : null}




    </div>

  )
}



