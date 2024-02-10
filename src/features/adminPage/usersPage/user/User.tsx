
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
  savedUser: UserModel;
  token: string;
  onChange: () => void;
  myAccess: string;

}



export function User({ savedUser, token, onChange, myAccess }: Props) {


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

  const[access, setAccess] = useState("")
  const[plan, setPlan] = useState <PlanModel | undefined> ()



  const readAccess = () => {

    if (access == "user") {
      if (plan == undefined)
        return ("Нет доступа")
      if (plan?.planType == "basic")
        return ("Простой")
      if (plan?.planType == "advanced")
        return ("Расширенный")
      if (plan?.planType == "premium")
        return ("Широкий")


    } else if (access == "admin")
      return ("Администратор")
    else if (access == "superadmin")
      return "Гл. администратор"




  }

  useEffect(() => {

    disableScroll.off();
    setAccess(savedUser.access)
    setPlan(savedUser.plan)


  }, [savedUser]);




  return (
    <div className={styles.background}>


      <div className={styles.container}>


        <div className={styles.group}>
          <div className={styles.photo}>
            {access == "admin" || access == "superadmin" ?  (
              <SupervisorAccountIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />

            ) : (
              (savedUser.photo == "") ? <PhotoCameraIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} /> : <img src={savedUser.photo} />
            )}

          </div>
          {savedUser.isYou ? (
            <div className={styles.nameActive}>
              {savedUser.name} {" "} {savedUser.surname} {"(Вы)"}
            </div>


          ) : (
            <div className={styles.name} onClick={openUserPopup}>
              {savedUser.name} {" "} {savedUser.surname}
            </div>

          )}
          <div className={styles.email}>
            {savedUser.email}
          </div>



        </div>
        <div className={styles.group}>
          <div className={styles.text}>
            Доступ:
          </div>
          <div className={styles.access}>

            <div className={styles.accessText}>
              {access  && readAccess()}
            </div>

            {(access == "user" && plan) ? (
              <div className={styles.status}>
                {plan?.confirmed ? <CheckCircleIcon fontSize="medium" sx={{ fill: "url(#linearColors)" }} />
                  : <ErrorIcon fontSize="medium" sx={{ fill: "url(#linearColors)" }} />}
              </div>
            ) : (
              null

            )}

          </div>
          <div className={styles.expiryDate}>
            {plan?.confirmed ? "до " + plan.expiryDate
              : <div className={styles.expiryDate} />}
          </div>


        </div>



      </div>

      <div className={styles.divider} />

      {userOpen ? <UserPopup user={savedUser} token={token} closePopup={closeUserPopup} onChange={onChange} myAccess={myAccess} /> : null}

    </div>

  )
}



