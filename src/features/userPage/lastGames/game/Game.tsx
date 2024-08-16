import { useNavigate } from "react-router-dom";
import styles from "./Game.module.css"
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from "@mui/material";
import { Delete, patch, readServerError } from "../../../../utils/api";
import { useSelector } from "react-redux";
import { selectId, selectToken } from "../../../../store/authSlice";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ClearIcon from '@mui/icons-material/Clear';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import disableScroll from 'disable-scroll';
import { InvitePopup } from "../../../invitePopup/InvitePopup";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ConfirmationPopup } from "./confirmationPopup/ConfirmationPopup";

export enum GameStatus {
  Cancelled = "cancelled",
  Ended = "ended",
  NotStarted = "not_started",
  InProgress = "in_progress",
}

export type GameModel = {
  id: string;
  name: string;
  date: string;
  status?: GameStatus;
  invitationCode: string;
  creatorId: string;
}

type Props = {
  savedGame: GameModel;
  isCreator: boolean;
}



export function Game({ savedGame, isCreator }: Props) {
  const navigate = useNavigate()
  const token = useSelector(selectToken)

  const [gameName, setGameName] = useState("")
  const [gameDate, setGameDate] = useState("")

  const [nameEditing, setNameEditing] = useState(false)
  const [dateEditing, setDateEditing] = useState(false)

  const [inviteOpen, setInviteOpen] = useState(false);


  const openInvitePopup = () => {
    disableScroll.on()
    setInviteOpen(true)
  }

  const closeInvitePopup = () => {
    disableScroll.off()
    setInviteOpen(false)
  }

  const getStatus = () => {
    if (savedGame.status == GameStatus.Cancelled)
      return "Отменена"
    if (savedGame.status == GameStatus.NotStarted)
      return "Не начата"
    if (savedGame.status == GameStatus.InProgress)
      return "В процессе"
    if (savedGame.status == GameStatus.Ended)
      return "Завершена"
  }

 
  const editName = async () => {
    const data = {
      "name": gameName
    }
    try {
      const response = await patch('games/' + savedGame.id + '/name', data, token)
      // window.location.reload()
    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }
  }

  const editDate = async () => {
    console.log(new Date(gameDate).toISOString())
    const data = {
      "start_date": new Date(gameDate).toISOString()
    }
    try {
      const response = await patch('games/' + savedGame.id + '/date', data, token)
      // window.location.reload()
    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }
  }

  const handleNameEdit = () => {
    if (nameEditing) {
      if (savedGame.name != gameName) {
        if (gameName.trim().length < 3) {
          return;
        }
        editName()
      }
    }
    setNameEditing(!nameEditing);
  }

  const handleDateEdit = () => {
    if (dateEditing) {
      if (savedGame.date != gameDate) {
        if (gameDate == "") {
          return;
        }
        editDate()
      }
    }
    setDateEditing(!dateEditing);
  }

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [isCancel, setIsCancel] = useState(false);

  const openConfirmationPopup = () => {
    disableScroll.on()
    setConfirmationOpen(true)

  }
  const closeConfirmationPopup = () => {
    disableScroll.off()
    setConfirmationOpen(false)
    window.location.reload()
  
  }


  useEffect(() => {
    const date = savedGame.date.split('T')[0] + 'T'
    const time = savedGame.date.split('T')[1].slice(0, -1)
    setGameName(savedGame.name)
    setGameDate(date + time)
  }, [savedGame]);


  return (
    <div>
      <div className={styles.container}>

        <div className={styles.group}>
          <IconButton onClick={()=> {setIsCancel(false); openConfirmationPopup()}}>
            <svg width={0} height={0}>
              <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
                <stop offset={0} stopColor="#55C6F7" />
                <stop offset={1} stopColor="#2AF8BA" />
              </linearGradient>
            </svg>
            <div className={styles.buttonContainer}>
              <DeleteForeverIcon fontSize="medium" sx={{ fill: "url(#linearColors)" }} />
              Удалить
            </div>
          </IconButton>
          {savedGame.status == GameStatus.NotStarted ?
            isCreator && (<div>
              <IconButton onClick={()=> {setIsCancel(true); openConfirmationPopup()}}>
                <svg width={0} height={0}>
                  <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
                    <stop offset={0} stopColor="#55C6F7" />
                    <stop offset={1} stopColor="#2AF8BA" />
                  </linearGradient>
                </svg>
                <div className={styles.buttonContainer}>
                  <ClearIcon fontSize="medium" sx={{ fill: "url(#linearColors)" }} />
                  Отменить
                </div>
              </IconButton>

              <IconButton onClick={handleNameEdit}>
                {!nameEditing ? (
                  <div className={styles.buttonContainer}>
                    <EditIcon fontSize="medium" sx={{ fill: "url(#linearColors)" }} />
                    Изм.
                  </div>
                ) : (
                  <div className={styles.buttonContainer}>
                    <DoneIcon fontSize="medium" sx={{ fill: "url(#linearColors)" }} />
                    Готово
                  </div>
                )}
              </IconButton>
            </div>)
            :
            null
          }
          <div>
            <input className={!nameEditing ? styles.name : styles.nameActive} placeholder={"Название игры"} disabled={!nameEditing}
              value={gameName} onChange={(event) => { setGameName(event.target.value) }} />
          </div>
        </div>

        <div className={styles.group}>
          {savedGame.status == GameStatus.NotStarted ?
            isCreator && (<IconButton onClick={handleDateEdit}>
              {!dateEditing ? (

                <div className={styles.buttonContainer}>
                  <EditIcon fontSize="medium" sx={{ fill: "url(#linearColors)" }} />
                  Изм.
                </div>
              ) : (
                <div className={styles.buttonContainer}>
                  <DoneIcon fontSize="medium" sx={{ fill: "url(#linearColors)" }} />
                  Готово
                </div>
              )}
            </IconButton>)
            :
            null
          }
          <div>
            <input type="datetime-local" min={new Date().toISOString().slice(0, new Date().toISOString().lastIndexOf(":"))}
              className={styles.input} placeholder="Дата игры" disabled={!dateEditing} value={gameDate} onChange={(event) => { setGameDate(event.target.value) }} />
          </div>
        </div>

        <div className={styles.group}>
          <div className={styles.status}>
            {getStatus()}
          </div>
          {/* {savedGame.status == GameStatus.NotStarted && !isCreator && (<IconButton onClick={deleteGame}>
            <LogoutIcon fontSize="medium" sx={{ fill: "url(#linearColors)" }} />
          </IconButton>)} */}

          {savedGame.status == GameStatus.NotStarted && isCreator && <IconButton onClick={openInvitePopup}>

            <div className={styles.buttonContainer}>
              <GroupAddIcon fontSize="medium" sx={{ fill: "url(#linearColors)" }} />
              Поделиться
            </div>

          </IconButton>}

          {savedGame.status != GameStatus.Cancelled && <IconButton onClick={() => {
            if (savedGame.status == GameStatus.NotStarted || savedGame.status == GameStatus.InProgress)
              navigate("/game/" + savedGame.id)
            if (savedGame.status == GameStatus.Ended)
              navigate("game_results", { state: { gameId: savedGame.id } })
          }}>
            <div className={styles.buttonContainer}>
              <KeyboardArrowRightIcon fontSize="medium" sx={{ fill: "url(#linearColors)" }} />
              Перейти
            </div>
          </IconButton>}

        </div>
      </div>
      <div className={styles.divider} />
      {inviteOpen ? <InvitePopup invitationCode={savedGame.invitationCode} id={savedGame.id} isGame={true} closePopup={closeInvitePopup} /> : null}
      {confirmationOpen ? <ConfirmationPopup closePopup={closeConfirmationPopup} isCancel={isCancel}  savedGame={savedGame} /> : null}
    </div>
  )
}



