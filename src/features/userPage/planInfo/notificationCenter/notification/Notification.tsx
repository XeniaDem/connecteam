import styles from "./Notification.module.css"
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from "@mui/material"
import { Button } from "../../../../../components/button/Button";
import { useNavigate } from "react-router-dom";
import { GameModel } from "../../../lastGames/game/Game";
import { Plan } from "../../../../planList/PlanList";
import CircleIcon from '@mui/icons-material/Circle';

export enum NotificationType {
  CancelGameNotification = "game-cancel",
  StartGameNotification = "game-start",
  InviteGameNotification = "invite-game",
  InviteSubNotification = "invite-sub",
  DeleteFromSubNotification = "delete-sub"
}

export type NotificationModel = {
  type: NotificationType;
  date: string;
  game?: GameModel
  plan?: Plan;
  invitor: string;
  accepted?: boolean;
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
        <div className={styles.container}>
          <div className={styles.group}>
            <div className={styles.text} >
              Игра {" "}
              <span className={styles.nameActive}>
                {savedNotification.game?.name} {" "} {savedNotification.game?.date} {" "}
              </span>
              отменена
              {!savedNotification.read && (<div className={styles.new}>
                <CircleIcon fontSize="small" sx={{ fill: "url(#linearColors)" }} />
              </div>)}
            </div>
          </div>
          <div className={styles.group}>

            <div className={styles.controlButtons}>
              <div className={styles.date}>
                {savedNotification.date.slice(0, -3)}
              </div>
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

        <div className={styles.container}>

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

              {!savedNotification.read && (<div className={styles.new}>
                <CircleIcon fontSize="small" sx={{ fill: "url(#linearColors)" }} />
              </div>)}
            </div>




          </div>
          <div className={styles.group}>

            <div className={styles.controlButtons}>
              {!savedNotification.accepted && <IconButton onClick={() => navigate("/invite/game/" + savedNotification.game?.invitationCode)}>
                <DoneIcon fontSize="medium" sx={{ fill: "url(#linearColors)" }} />
              </IconButton>}

              <div className={styles.date}>
                {savedNotification.date.slice(0, -3)}
              </div>
            </div>
          </div>
        </div>


        <div className={styles.divider} />

      </div>

    )
  }


  if (savedNotification.type == NotificationType.StartGameNotification) {
    return (
      <div>
        <div className={styles.container}>
          <div className={styles.group}>
            <div className={styles.text} >
              Игра {" "}
              <span className={styles.nameActive}>
                {savedNotification.game?.name} {" "} {savedNotification.game?.date} {" "}
              </span>
              скоро начнется
              {!savedNotification.read && (<div className={styles.new}>
                <CircleIcon fontSize="small" sx={{ fill: "url(#linearColors)" }} />
              </div>)}
            </div>
          </div>
          <div className={styles.group}>
            <div className={styles.controlButtons}>
              <Button text={"Перейти"} onClick={() => navigate("/game/" + savedNotification.game?.id)} className={styles.footerButton} />
              <div className={styles.date}>
                {savedNotification.date.slice(0, -3)}
              </div>
            </div>

          </div>
        </div>

        <div className={styles.divider} />
      </div>
    )
  }

  if (savedNotification.type == NotificationType.InviteSubNotification) {

    return (
      <div>
        <div className={styles.container}>
          <div className={styles.group}>
            <div className={styles.text} >
              Пользователь {" "}
              <span className={styles.nameActive}>
                {savedNotification.invitor} {" "}
              </span>
              пригласил Вас присоединиться к плану
              {!savedNotification.read && (<div className={styles.new}>
                <CircleIcon fontSize="small" sx={{ fill: "url(#linearColors)" }} />
              </div>)}
            </div>

          </div>
          <div className={styles.group}>

            <div className={styles.controlButtons}>
              {!savedNotification.accepted && (<IconButton onClick={() => navigate("/invite/plan/" + savedNotification.plan?.invitationCode)}>
                <DoneIcon fontSize="medium" sx={{ fill: "url(#linearColors)" }} />
              </IconButton>)}

              <div className={styles.date}>
                {savedNotification.date.slice(0, -3)}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

      </div>

    )
  }

  if (savedNotification.type == NotificationType.DeleteFromSubNotification) {
    return (
      <div>
        <div className={styles.container}>
          <div className={styles.group}>
            <div className={styles.text} >
              Пользователь {" "}
              <span className={styles.nameActive}>
                {savedNotification.invitor} {" "}
              </span>
              удалил Вас из участников плана
              {!savedNotification.read && (<div className={styles.new}>
                <CircleIcon fontSize="small" sx={{ fill: "url(#linearColors)" }} />
              </div>)}
            </div>


          </div>
          <div className={styles.group}>

            <div className={styles.controlButtons}>
              <div className={styles.date}>
                {savedNotification.date.slice(0, -3)}
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



