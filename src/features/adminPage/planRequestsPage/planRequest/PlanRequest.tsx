import styles from "./PlanRequest.module.css"
import { useEffect, useState } from "react"
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import disableScroll from 'disable-scroll';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from "@mui/material"
import { PlanModel } from "../../usersPage/user/User"
import { Delete, patch, readServerError } from "../../../../utils/api"


export type RequestModel = {
  id: string;
  name: string;
  surname: string;
  email: string;
  photo: string;
  plan: PlanModel;

}

type Props = {
  savedRequest: RequestModel;
  token: string;
  onChange: () => void;

}



export function PlanRequest({ savedRequest, token, onChange }: Props) {



  const declinePlan = async () => {
    try {

      const response = await Delete('plans/cancel/' + savedRequest.plan.id.toString(), token)
      onChange()


    }
    catch (error: any) {
      readServerError(error.response.text);
      console.log("error:", error)
    }
  }

  const confirmPlan = async () => {
    try {

       const response = await patch('plans/' + savedRequest.plan.id.toString(), undefined, token)
       onChange()



    }
    catch (error: any) {
      readServerError(error.response.text);
      console.log("error:", error)
    }
  }



  const [plan, setPlan] = useState<PlanModel>()

  const readRequest = () => {

    if (plan?.planType == "basic")
      return ("Простой")
    if (plan?.planType == "advanced")
      return ("Расширенный")
    if (plan?.planType == "premium")
      return ("Широкий")
  }



  useEffect(() => {

    disableScroll.off();
    setPlan(savedRequest.plan)


  }, [savedRequest]);




  return (
    <div className={styles.background}>


      <div className={styles.container}>


        <div className={styles.group}>
          <div className={styles.photo}>
            {/* <img src = {photo}/> */}
            {(savedRequest.photo == "") ? <PhotoCameraIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} /> : <img src={savedRequest.photo} />}
          </div>

          <div className={styles.name} >
            {savedRequest.name} {" "} {savedRequest.surname}
          </div>


          <div className={styles.email}>
            {savedRequest.email}
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
            {plan?.duration} дней

          </div>
          <div className={styles.controlButtons}>
            <IconButton onClick={confirmPlan}>

              <DoneIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />
            </IconButton>
            <IconButton onClick={declinePlan}>

              <ClearIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />
            </IconButton>
          </div>
        </div>



      </div>

      <div className={styles.divider} />

    </div>

  )
}



