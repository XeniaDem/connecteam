
import { useEffect, useState } from "react";
import { Button } from "../../../../components/button/Button"
import styles from "./NotificationsCenter.module.css"
import { OutsideClick } from 'outsideclick-react'
import { Notification, NotificationModel } from "./notification/Notification";
import { get, readServerError } from "../../../../utils/api";
import { selectToken } from "../../../../store/authSlice";
import { useSelector } from "react-redux";


type Props = {
  onBlur: () => void;
}


export function NotificationsCenter(props: Props) {


  const token = useSelector(selectToken)

  const [notifications, setNotifications] = useState<NotificationModel[]>()
  const readNotifications = (message: any) => {
    const messageParsed = JSON.parse(message);

    if (messageParsed.data == null) {
      return;
    }
    const notificationsNum = messageParsed.data.length;
    const notificationsModels = [];
    for (let i = 0; i < notificationsNum; i++) {
      const notificationModel = {
        type: messageParsed.data[i].type,
        payload: messageParsed.data[i].payload,
        date: new Date(messageParsed.data[i].date).toLocaleString()


      }
      notificationsModels.push(notificationModel)
    }
    setNotifications(notificationsModels);


  }

  const fetchNotifications = async () => {
    try {

      const response = await get('notifications/', token)
      readNotifications(response.text)


    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }


  }


  useEffect(() => {
    fetchNotifications()


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
          {notifications == null ? (
            <div className={styles.empty}>
              Нет уведомлений
            </div>

          ) : (

            (notifications?.map(notification =>
              <div>
                <Notification savedNotification={notification} onChange={() => null} />

              </div>
            ))

          )}



        </div>
      </div>
    </OutsideClick>

  )
}