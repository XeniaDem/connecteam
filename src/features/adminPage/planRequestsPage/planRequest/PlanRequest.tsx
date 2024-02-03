
import styles from "./PlanRequest.module.css"
import photo from "./photo.svg"
import users from "./users.svg"
import questions from "./questions.svg"
import { useEffect, useState } from "react"
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import disableScroll from 'disable-scroll';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from "@mui/material"
import colors from "@mui/material/colors"


export type RequestModel = {
  id: string;
  name: string;
  surname: string;
  email: string;
  photo: string;
  plan: string;
  period: string;

}

type Props = {
  request: RequestModel;
  token: string;
  onChange: () => void;

}



export function PlanRequest({ request, token, onChange }: Props) {

  // useEffect(() => {

  //   readAccess()

  // }, []);




  const readRequest = () => {

    if (request.plan == "basic")
      return ("Простой")
    if (request.plan == "advanced")
      return ("Расширенный")
    if (request.plan == "premium")
      return ("Широкий")
  }




  return (
    <div className={styles.background}>


      <div className={styles.container}>


        <div className={styles.group}>
          <div className={styles.photo}>
            {/* <img src = {photo}/> */}
            {(request.photo == "") ? <PhotoCameraIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} /> : <img src={request.photo} />}
          </div>

          <div className={styles.name} >
            {request.name} {" "} {request.surname}
          </div>


          <div className={styles.email}>
            {request.email}
          </div>



        </div>
        <div className={styles.group}>
          <div className={styles.text}>
            Доступ:
          </div>
          <div className={styles.plan}>

            {readRequest()}
          </div>
          <div className={styles.period}>
            {request.period}

          </div>
          <div className={styles.controlButtons}>
            <IconButton onClick={() => null}>

              <DoneIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />
            </IconButton>
            <IconButton onClick={() => null}>

              <ClearIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />
            </IconButton>
          </div>
        </div>



      </div>

      <div className={styles.divider} />

    </div>

  )
}



