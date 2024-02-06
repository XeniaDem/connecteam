
import styles from "./PlanUser.module.css"

import { useEffect, useState } from "react"
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import disableScroll from 'disable-scroll';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from "@mui/material"
import colors from "@mui/material/colors"
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import { RemoveUserPopup } from "../removeUserPopup/RemoveUserPopup";


export type PlanUserModel = {
  id: string;
  name: string;
  surname: string;
  email: string;
  photo: string;
  plan: string;

}

type Props = {
  planUser: PlanUserModel;
  token: string;
  onChange: () => void;

}



export function PlanUser({ planUser, token, onChange }: Props) {

  // useEffect(() => {

  //   readAccess()

  // }, []);




  const readPlan = () => {

    if (planUser.plan == "basic")
      return ("Простой")
    if (planUser.plan == "advanced")
      return ("Расширенный")
    if (planUser.plan == "premium")
      return ("Широкий")
  }

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
            {(planUser.photo == "") ? <PhotoCameraIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} /> : <img src={planUser.photo} />}
          </div>

          <div className={styles.name} >
            {planUser.name} {" "} {planUser.surname}
          </div>


          <div className={styles.email}>
            {planUser.email}
          </div>



        </div>
        <div className={styles.group}>
          <div className={styles.text}>
            Доступ:
          </div>
          <div className={styles.plan}>

            {readPlan()}
          </div>

          <div className={styles.controlButtons}>
            <IconButton onClick={openRemoveUserPopup}>

              <PersonRemoveAlt1Icon fontSize="large" sx={{ fill: "url(#linearColors)" }} />
            </IconButton>

          </div>
        </div>


       
      </div>
      
      <div className={styles.divider} />
      {removeUserOpen ? <RemoveUserPopup planUser={planUser} token={token} closePopup={closeRemoveUserPopup} onChange={onChange} /> : null}

     
     

    </div>

  )
}



