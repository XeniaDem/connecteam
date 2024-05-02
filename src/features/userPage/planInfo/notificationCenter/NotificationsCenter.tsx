
import { useEffect, useState } from "react";
import { Button } from "../../../../components/button/Button"
import styles from "./NotificationsCenter.module.css"
import { OutsideClick } from 'outsideclick-react'
import { Notification, NotificationModel } from "./notification/Notification";


type Props = {
  onBlur: () => void;
}


export function NotificationsCenter(props: Props) {


  const [notifications, setNotifications] = useState<NotificationModel[]>()
  const readNotifications = (message: any) => {
    const messageParsed = JSON.parse(message);

    if (messageParsed.data == null) {
      return;
    }
    const notificationsNum = messageParsed.data.length;
    console.log(notificationsNum)
    const notificationsModels = [];
    for (let i = 0; i < notificationsNum; i++) {
      const notificationModel = {
        type: messageParsed.data[i].type,
        payload: messageParsed.data[i].payload,
        date: messageParsed.data[i].date


      }
      notificationsModels.push(notificationModel)
      console.log(notificationModel.type)
    }
    setNotifications(notificationsModels);


  }


  useEffect(() => {

    readNotifications(JSON.stringify({
      data: [
        {
          type: "invite-game",
          payload: "a1e3e32b-9c49-48ac-bdbd-d7ae16161fdb",
          date: "0001-01-01T00:00:00Z"
        },
        {
          type: "game-start",
          payload: "a1e3e32b-9c49-48ac-bdbd-d7ae16161fdb",
          date: "0001-01-01T00:00:00Z"
        }
      ]
    }

    ))
  }, []);





  return (
    <OutsideClick
      onOutsideClick={() => {
        props.onBlur()
      }}
    >
      <div className={styles.container}>


        <div className={styles.title}>
          Центр уведомлений
        </div>
        <div className={styles.notifications}>
          {notifications?.map(notification =>
            <div>
              <Notification savedNotification={notification} onChange={() => null} />

            </div>

          )}



        </div>

      </div>
    </OutsideClick>

  )
}