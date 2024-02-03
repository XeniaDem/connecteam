
import styles from "./User.module.css"
import photo from "./photo.svg"
import users from "./users.svg"
import questions from "./questions.svg"
import { useEffect, useState } from "react"
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import disableScroll from 'disable-scroll';
import { UserPopup } from "../userPopup/UserPopup"


export type UserModel = {
  id: string;
  name: string;
  surname: string;
  email: string;
  photo: string;
  access: string;
  isYou?: boolean;

}

type Props = {
  user: UserModel;
  token: string;
  onChange: () => void;

}



export function User({ user, token, onChange }: Props) {

  // useEffect(() => {

  //   readAccess()

  // }, []);


  const [userOpen, setUserOpen] = useState(false);



  const openUserPopup = () => {
    disableScroll.on()
    setUserOpen(true)

  }
  const closeUserPopup = () => {
    disableScroll.off()
    setUserOpen(false)
    onChange()



  }

  const readAccess = () => {
    if (user.access == "user")
      return ("Нет доступа")
    if (user.access == "basic")
      return ("Простой")
    if (user.access == "advanced")
      return ("Расширенный")
    if (user.access == "premium")
      return ("Широкий")
    if (user.access == "admin")
      return ("Администратор")
  }




  return (
    <div className={styles.background}>


      <div className={styles.container}>


        <div className={styles.group}>
          <div className={styles.photo}>
            {/* <img src = {photo}/> */}
            {(user.photo == "") ? <PhotoCameraIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} /> : <img src={user.photo} />}
          </div>
          {user.isYou ? (
            <div className={styles.nameActive}>
              {user.name} {" "} {user.surname} {"(Вы)"}
            </div>


          ) : (
            <div className={styles.name} onClick={openUserPopup}>
              {user.name} {" "} {user.surname}
            </div>

          )}
               <div className={styles.email}>
            {user.email}
          </div>



        </div>
        <div className={styles.group}>
          <div className={styles.text}>
            Доступ:
          </div>
          <div className={styles.access}>

            {readAccess()}
          </div>
        </div>



      </div>

      <div className={styles.divider} />

      {userOpen ? <UserPopup user={user} token={token} closePopup={closeUserPopup} onChange={onChange} /> : null}

    </div>

  )
}



