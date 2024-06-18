import styles from "./NotificationsCenter.module.css"
import { OutsideClick } from 'outsideclick-react'
import { Notification, NotificationModel } from "./notification/Notification";
import { get, patch, readServerError } from "../../../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { selectId, selectToken } from "../../../../store/authSlice";
import { useEffect, useState } from "react";
import { Plan } from "../../../planList/PlanList";
import { GameModel } from "../../lastGames/game/Game";
import { selectNotifications, updateNotifications } from "../../../../store/notificationsSlice";


type Props = {
  onBlur: () => void;
  notifications: NotificationModel[] | undefined;
}


export function NotificationsCenter(props: Props) {
  const token = useSelector(selectToken)
  const notificationsCount = useSelector(selectNotifications)
  const id = useSelector(selectId)
  const dispatch = useDispatch()


  const markNotificationsRead = async () => {
    dispatch(updateNotifications({notificationsCount: 0}))
    try {

      const response = await patch('notifications/', undefined, token)
      console.log("read")
      console.log(notificationsCount)
    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }


  }




  return (
    <OutsideClick
      onOutsideClick={() => {
        markNotificationsRead()
        props.onBlur()
      }}
    >
      <div className={styles.container}>
        <div className={styles.title}>
          Центр уведомлений
        </div>
        <div className={styles.notifications}>
          {!props.notifications ? (
            <div className={styles.empty}>
              Нет уведомлений
            </div>
          ) : (
            (props.notifications?.map(notification =>
              <div>
                <Notification savedNotification={notification} />
              </div>
            ))
          )}
        </div>
      </div>
    </OutsideClick>

  )
}