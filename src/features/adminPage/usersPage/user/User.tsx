
import styles from "./User.module.css"
import { useEffect, useState } from "react"
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import disableScroll from 'disable-scroll';
import { UserPopup } from "../userPopup/UserPopup"
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

export type PlanModel = {
  userId: string;
  planType: string;
  expiryDate: string;
  confirmed: string;



}
export type UserModel = {
  id: string;
  name: string;
  surname: string;
  email: string;
  photo: string;
  access: string;
  isYou?: boolean;
  plan?: PlanModel;

}

type Props = {
  user: UserModel;
  token: string;
  onChange: () => void;

}



export function User({ user, token, onChange }: Props) {


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
    if (user.access == "user") {
      if (user.plan == undefined)
        return ("Нет доступа")
      if (user.plan?.planType == "basic")
        return ("Простой")
      if (user.plan?.planType == "advanced")
        return ("Расширенный")
      if (user.plan?.planType == "premium")
        return ("Широкий")


    } else if (user.access == "admin")
      return ("Администратор")




  }




  return (
    <div className={styles.background}>


      <div className={styles.container}>


        <div className={styles.group}>
          <div className={styles.photo}>
            {user.access == "admin" ? (
              <SupervisorAccountIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} /> 

            ) : (
              (user.photo == "") ? <PhotoCameraIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} /> : <img src={user.photo} />
            )}
            
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

            <div className={styles.accessText}>
              {readAccess()}
            </div>

            {(user.access == "user" && user.plan) ? (
              <div className={styles.status}>
                {user.plan?.confirmed ? <CheckCircleIcon fontSize="medium" sx={{ fill: "url(#linearColors)" }} />
                  : <ErrorIcon fontSize="medium" sx={{ fill: "url(#linearColors)" }} />}
              </div>
            ) : (
              null

            )}

          </div>
          <div className={styles.expiryDate}>
            {user.plan?.confirmed ? "до " + user.plan.expiryDate
              : <div className={styles.expiryDate} />}
          </div>


        </div>



      </div>

      <div className={styles.divider} />

      {userOpen ? <UserPopup user={user} token={token} closePopup={closeUserPopup} onChange={onChange} /> : null}

    </div>

  )
}



