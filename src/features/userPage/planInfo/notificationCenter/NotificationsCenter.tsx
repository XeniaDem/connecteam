import styles from "./NotificationsCenter.module.css"
import { OutsideClick } from 'outsideclick-react'
import { Notification, NotificationModel } from "./notification/Notification";
import { patch, readServerError } from "../../../../utils/api";
import { useSelector } from "react-redux";
import { selectToken } from "../../../../store/authSlice";


type Props = {
  onBlur: () => void;
  notifications: NotificationModel[] | undefined;
}


export function NotificationsCenter(props: Props) {
  const token = useSelector(selectToken)


  const markNotificationsRead = async () => {
    try {

      const response = await patch('notifications/', undefined, token)
      console.log("read")
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
          {props.notifications == null ? (
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