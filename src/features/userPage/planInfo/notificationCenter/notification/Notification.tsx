import styles from "./Notification.module.css"
import { useEffect, useState } from "react"
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from "@mui/material"

import { Delete, get, patch, readServerError } from "../../../../../utils/api"
import { Button } from "../../../../../components/button/Button";
import { useSelector } from "react-redux";
import { selectToken } from "../../../../../store/authSlice";
import { useNavigate } from "react-router-dom";
export enum NotificationType {
  CancelGameNotification = "game-cancel",
  StartGameNotification = "game-start",
  InviteGameNotification = "invite-game",
  InviteSubNotification = "invite-sub",
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

  const navigate = useNavigate()

  const token = useSelector(selectToken)


  const [gameName, setGameName] = useState<string>()
  const [gameDate, setGameDate] = useState<string>()
  const [gameId, setGameId] = useState<string>()
  const [gameInvitationCode, setGameInvitationCode] = useState<string>()
  const [gameCreatorId, setGameCreatorId] = useState<string>()


  const [invitorName, setInvitorName] = useState<string>()

  const saveGameData = (message: any) => {
    var messageParsed = JSON.parse(message);
    setGameName(messageParsed.name)
    setGameDate((new Date(messageParsed.start_date)).toLocaleString())
    setGameId(messageParsed.id)
    setGameInvitationCode(messageParsed.invitation_code)
    setGameCreatorId(messageParsed.creator_id)

  }
  const fetchGame = async () => {
    try {

      const response = await get('games/' + savedNotification.payload, token)
      saveGameData(response.text)
    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }
  }


  const [planId, setPlanId] = useState<string>()
  const [planHolderId, setPlanHolderId] = useState<string>()
  const [planInvitationCode, setPlanInvitationCode] = useState<string>()


  const savePlanData = (message: any) => {
    console.log("abc " + message)
    var messageParsed = JSON.parse(message);
    setPlanId(messageParsed.id)
    setPlanHolderId(messageParsed.holder_id)
    setPlanInvitationCode(messageParsed.invitation_code)

  }
  const fetchPlan = async () => {
    try {

      const response = await get('plans/' + savedNotification.payload, token)
      savePlanData(response.text)
    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }
  }

  const fetchInvitor = async (invitorId: string) => {
    try {

      const response = await get('users/' + invitorId, token)
      setInvitorName(JSON.parse(response.text).first_name + " " + JSON.parse(response.text).second_name)
    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }
  }




  if (savedNotification.type == NotificationType.CancelGameNotification) {
    useEffect(() => {
      fetchGame()
    }, []);



    return (
      <div>
        <div className={styles.container}>
          <div className={styles.group}>
            <div className={styles.text} >
              Игра {" "}
              <span className={styles.nameActive}>
                {gameName} {" "} {gameDate}
              </span>
              отменена
            </div>
          </div>
          <div className={styles.group}>

            <div className={styles.controlButtons}>

              <IconButton onClick={() => null}>
                <ClearIcon fontSize="medium" sx={{ fill: "url(#linearColors)" }} />
              </IconButton>
              <div className={styles.date}>
                {savedNotification.date}
              </div>

            </div>
          </div>
        </div>

        <div className={styles.divider} />

      </div>

    )
  }



  if (savedNotification.type == NotificationType.InviteGameNotification) {

    useEffect(() => {
      fetchGame()
    }, []);

    useEffect(() => {
      gameCreatorId && fetchInvitor(gameCreatorId)
    }, [gameCreatorId]);

    // useEffect(() => {
    //   console.log("a")

    // }, [invitorName]);




    // const [isAccepted, setIsAccepted] = useState(false)

    /////////////////////////////////


    return (
      <div>
        <div className={styles.container}>
          <div className={styles.group}>
            <div className={styles.text} >
              Пользователь {" "}
              <span className={styles.nameActive}>
                {invitorName} {" "}
              </span>
              пригласил Вас в игру {" "}
              <span className={styles.nameActive}>
                {gameName} {" "} {gameDate}
              </span>
            </div>

          </div>
          <div className={styles.group}>

            <div className={styles.controlButtons}>
              <IconButton onClick={() => navigate("/invite/game/" + gameInvitationCode)}>
                <DoneIcon fontSize="medium" sx={{ fill: "url(#linearColors)" }} />
              </IconButton>

              <IconButton onClick={() => null}>
                <ClearIcon fontSize="medium" sx={{ fill: "url(#linearColors)" }} />
              </IconButton>
              <div className={styles.date}>
                {savedNotification.date}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

      </div>

    )
  }


  if (savedNotification.type == NotificationType.StartGameNotification) {
    useEffect(() => {
      fetchGame()
    }, []);
    return (
      <div>
        <div className={styles.container}>
          <div className={styles.group}>
            <div className={styles.text} >
              Игра {" "}
              <span className={styles.nameActive}>
                {gameName} {" "} {gameDate}
              </span>
              начинается
            </div>
          </div>
          <div className={styles.group}>
            <div className={styles.controlButtons}>
              <Button text={"Перейти"} onClick={() => navigate("/game/" + gameId)} className={styles.footerButton} />
            </div>
            <div className={styles.date}>
              {savedNotification.date}
            </div>
          </div>
        </div>

        <div className={styles.divider} />
      </div>
    )
  }

  if (savedNotification.type == NotificationType.InviteSubNotification) {

    useEffect(() => {
      fetchPlan()
      // fetchMyPlan()
    }, []);

    useEffect(() => {
      planHolderId && fetchInvitor(planHolderId)
    }, [planHolderId]);

    // const [currentPlanId, setCurrentPlanId] = useState<string>()

    // useEffect(() => {
    //   console.log(planHolderId)
    //   console.log(currentPlanId)
    // }, []);



    // const readPlanInfo = (message: any) => {
    //   if (message == "") {
    //     return;
    //   }
    //   const messageParsed = JSON.parse(message);
    //   setCurrentPlanId(messageParsed.id);
    // }

    // const fetchMyPlan = async () => {
    //   try {
    //     const response = await get('plans/current', token)
    //     readPlanInfo(response.text)
    //   }
    //   catch (error: any) {
    //     readServerError(error.response.text)
    //     console.log("error:", error)
    //   }
    // }



    return (
      <div>
        <div className={styles.container}>
          <div className={styles.group}>
            <div className={styles.text} >
              Пользователь {" "}
              <span className={styles.nameActive}>
                {invitorName} {" "}
              </span>
              пригласил Вас присоединиться к плану
            </div>

          </div>
          <div className={styles.group}>

            <div className={styles.controlButtons}>
              {(<IconButton onClick={() => navigate("/invite/plan/" + planInvitationCode)}>
                <DoneIcon fontSize="medium" sx={{ fill: "url(#linearColors)" }} />
              </IconButton>)}

              <IconButton onClick={() => null}>
                <ClearIcon fontSize="medium" sx={{ fill: "url(#linearColors)" }} />
              </IconButton>
              <div className={styles.date}>
                {savedNotification.date}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

      </div>

    )
  }

  if (savedNotification.type == NotificationType.DeleteFromSubNotification) {

    useEffect(() => {
      fetchPlan()
    }, []);

    useEffect(() => {
      planHolderId && fetchInvitor(planHolderId)
    }, [planHolderId]);



    return (
      <div>
        <div className={styles.container}>
          <div className={styles.group}>
            <div className={styles.text} >
              Пользователь
              <span className={styles.nameActive}>
                {invitorName} {" "}
              </span>
              удалил Вас из участников плана
            </div>

          </div>
          <div className={styles.group}>

            <div className={styles.controlButtons}>
              <IconButton onClick={() => null}>
                <ClearIcon fontSize="medium" sx={{ fill: "url(#linearColors)" }} />
              </IconButton>
              <div className={styles.date}>
                {savedNotification.date}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

      </div>

    )
  }
  return (null)


}



