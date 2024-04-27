
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
    // const messageParsed = JSON.parse(message);

    // if (messageParsed.data == null) {
    //   setTags(null);
    //   return;
    // }
    const notificationsNum = 5 //messageParsed.data.length;
    const notificationsModels = [];
    for (let j = 0; j < notificationsNum; j++) {
      const notificationModel = {
        id: j.toString(), //messageParsed.data[j].id,
        name: "User", //messageParsed.data[j].content
        surname: "user",


      }
      notificationsModels.push(notificationModel)
    }
    setNotifications(notificationsModels);


  }


  useEffect(() => {

    readNotifications("")
  }, []);





  return (
    <OutsideClick
      onOutsideClick={() => {
        props.onBlur()
      }}
      ignoreElement=".ignore"
    >
      <div className={styles.container}>


        <div className={styles.title}>
          Центр уведомлений
        </div>
        <div className={styles.notifications}>
          {notifications?.map(notification =>
            <div>
              <Notification savedNotification={notification} onChange={()=> null} />

            </div>

          )}



        </div>

      </div>
    </OutsideClick>

  )
}