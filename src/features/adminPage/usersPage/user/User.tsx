
import styles from "./User.module.css"
import photo from "./photo.svg"
import users from "./users.svg"
import questions from "./questions.svg"
import { useEffect, useState } from "react"
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';


export type UserModel = {
  name: string;
  surname: string;
  email: string;
  photo: string;
  access: string;

}

type Props = {
  user: UserModel;

}



export function User( { user }: Props) {

  // useEffect(() => {

  //   readAccess()

  // }, []);


  return (
    <div>
   

      <div className={styles.container}>
   

        <div className={styles.group}>
          <div className={styles.photo}>
            {/* <img src = {photo}/> */}
            {(user.photo == "") ? <PhotoCameraIcon fontSize = "large" sx={{ fill: "url(#linearColors)" }} /> : <img src = {user.photo}/> }
          </div>
          <div className={styles.name}>
            {user.name} {" "} {user.surname}
          </div>
          <div className={styles.email}>
            {user.email}
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.text}>
            Доступ:
          </div>
          <div className={styles.access}>
            {(user.access == "user") ? "Нет доступа" : ""}
            {(user.access == "basic") ? "Простой" : ""}
            {(user.access == "advanced") ? "Расширенный" : ""}
            {(user.access == "premium") ? "Широкий" : ""}
          </div>
        </div>



      </div>
      <div className={styles.divider} />
    </div>
  )
}



