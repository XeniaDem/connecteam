import styles from "./Notification.module.css"
import { IconButton } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { GameModel } from "../../../lastGames/game/Game";
import { Plan } from "../../../../planList/PlanList";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export enum NotificationType {
  CancelGameNotification = "game-cancel",
  StartGameNotification = "game-start",
  InviteGameNotification = "invite-game",
  InviteSubNotification = "invite-sub",
  DeleteFromSubNotification = "delete-sub"
}

export type NotificationModel = {
  type: NotificationType;
  date: Date;
  game?: GameModel
  plan?: Plan;
  invitor: string;
  read: boolean;
}

type Props = {
  savedNotification: NotificationModel;
}




export function Notification({ savedNotification }: Props) {

  const navigate = useNavigate()

  if (savedNotification.type == NotificationType.CancelGameNotification) {
    return (
      <div>
        <div className={savedNotification.read ? styles.container : styles.highlighted}>
          <div className={styles.group}>
            <div className={styles.text} >
              Игра {" "}
              <span className={styles.nameActive}>
                {savedNotification.game?.name} {" "} {savedNotification.game?.date} {" "}
              </span>
              отменена
            </div>
          </div>
          <div className={styles.group}>
            <div className={styles.date}>
              {savedNotification.date.toLocaleString().slice(0, -3)}
            </div>
          </div>
        </div>
        <div className={styles.divider} />
      </div>
    )
  }

  if (savedNotification.type == NotificationType.InviteGameNotification) {
    return (
      <div>
        <div className={savedNotification.read ? styles.container : styles.highlighted}>
          <div className={styles.group}>
            <div className={styles.text} >
              Пользователь {" "}
              <span className={styles.nameActive}>
                {savedNotification.invitor} {" "}
              </span>
              пригласил Вас в игру {" "}
              <span className={styles.nameActive}>
                {savedNotification.game?.name} {" "} {savedNotification.game?.date}
              </span>
            </div>
          </div>
          <div className={styles.group}>
            <div className={styles.date}>
              {savedNotification.date.toLocaleString().slice(0, -3)}
            </div>
          </div>
        </div>

        <div className={styles.controlButtons}>
          <IconButton onClick={() => navigate("/invite/game/" + savedNotification.game?.invitationCode)}>
            <div className={styles.buttonContainer}>
              <ArrowForwardIosIcon fontSize="medium" sx={{ fill: "url(#linearColors)" }} />
              Перейти
            </div>
          </IconButton>
        </div>
        <div className={styles.divider} />
      </div>
    )
  }


  if (savedNotification.type == NotificationType.StartGameNotification) {
    return (
      <div>
        <div className={savedNotification.read ? styles.container : styles.highlighted}>
          <div className={styles.group}>
            <div className={styles.text} >
              Игра {" "}
              <span className={styles.nameActive}>
                {savedNotification.game?.name} {" "} {savedNotification.game?.date} {" "}
              </span>
              скоро начнется
            </div>
          </div>
          <div className={styles.group}>
            <div className={styles.date}>
              {savedNotification.date.toLocaleString().slice(0, -3)}
            </div>
          </div>
        </div>
        <div className={styles.controlButtons}>

          <IconButton onClick={() => navigate("/game/" + savedNotification.game?.id)}>
            <div className={styles.buttonContainer}>
              <ArrowForwardIosIcon fontSize="medium" sx={{ fill: "url(#linearColors)" }} />
              Перейти
            </div>
          </IconButton>
        </div>
        <div className={styles.divider} />
      </div>
    )
  }

  if (savedNotification.type == NotificationType.InviteSubNotification) {
    return (
      <div>
        <div className={savedNotification.read ? styles.container : styles.highlighted}>
          <div className={styles.group}>
            <div className={styles.text} >
              Пользователь {" "}
              <span className={styles.nameActive}>
                {savedNotification.invitor} {" "}
              </span>
              пригласил Вас присоединиться к плану
            </div>
          </div>
          <div className={styles.group}>
            <div className={styles.date}>
              {savedNotification.date.toLocaleString().slice(0, -3)}
            </div>
          </div>
        </div>

        <div className={styles.controlButtons}>
          <IconButton onClick={() => navigate("/invite/plan/" + savedNotification.plan?.invitationCode)}>
            <div className={styles.buttonContainer}>
              <ArrowForwardIosIcon fontSize="medium" sx={{ fill: "url(#linearColors)" }} />
              Перейти
            </div>
          </IconButton>
        </div>
        <div className={styles.divider} />
      </div>
    )
  }

  if (savedNotification.type == NotificationType.DeleteFromSubNotification) {
    return (
      <div>
        <div className={savedNotification.read ? styles.container : styles.highlighted}>
          <div className={styles.group}>
            <div className={styles.text} >
              Пользователь {" "}
              <span className={styles.nameActive}>
                {savedNotification.invitor} {" "}
              </span>
              удалил Вас из участников плана
            </div>
          </div>
          <div className={styles.group}>
            <div className={styles.date}>
              {savedNotification.date.toLocaleString().slice(0, -3)}
            </div>
          </div>
        </div>
        <div className={styles.divider} />
      </div>
    )
  }
  return (null)
}



