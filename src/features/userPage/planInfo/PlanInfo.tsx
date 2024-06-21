import styles from "./PlanInfo.module.css"
import icon from "./icon.svg"
import { Plan, PlanList } from "../../planList/PlanList"
import { BasicPlan } from "./basicPlan/BasicPlan"
import { AdvancedPlan } from "./advancedPlan/AdvancedPlan"
import { PremiumPlan } from "./premiumPlan/PremiumPlan"
import { Button } from "../../../components/button/Button"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { isMobile } from 'react-device-detect';
import { useGetDimensions } from "../../../app/hooks/useGetDimensions"
import { useDispatch, useSelector } from "react-redux"
import { selectId, selectToken } from "../../../store/authSlice"
import { get, readServerError } from "../../../utils/api"
import NotificationsIcon from '@mui/icons-material/Notifications';
import { IconButton } from "@mui/material"
import { NotificationsCenter } from "./notificationCenter/NotificationsCenter"
import { selectNotifications, updateNotifications } from "../../../store/notificationsSlice"
import { NotificationModel } from "./notificationCenter/notification/Notification"
import { GameModel } from "../lastGames/game/Game"



type Props = {
  name: string;
  surname: string;
  savedPlan: Plan | null;
  onChange: () => void;
}



export function PlanInfo({ name, surname, savedPlan, onChange }: Props) {
  const token = useSelector(selectToken)
  const id = useSelector(selectId)
  const notificationsCount = useSelector(selectNotifications)
  const dispatch = useDispatch()

  const width = useGetDimensions()[0]
  const height = useGetDimensions()[1]

  const navigate = useNavigate()


  const [planType, setPlanType] = useState<string | undefined>()
  const [expiryDate, setExpiryDate] = useState<string | undefined>()
  const [isTrial, setIsTrial] = useState<boolean | undefined>()
  const [planStatus, setPlanStatus] = useState<string | undefined>()


  const [trialApplicable, setTrialApplicable] = useState(false)

  const [notificationsHidden, setNotificationsHidden] = useState(true)


  const fetchPreviousPlans = async () => {
    try {
      const response = await get('plans/', token)
      if (JSON.parse(response.text).data == null) {
        setTrialApplicable(true)
      }
    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }
  }


  const webSocketRef = useRef<WebSocket | null>(null)
  useEffect(() => {


    const ws: WebSocket = new WebSocket('wss://ws.connecteam.ru/ws?token=' + token);
    webSocketRef.current = ws;

    ws.onopen = () => {
      console.log('Connected to server');
      fetchNotifications()
    };

    ws.onmessage = (event: MessageEvent<any>) => {
      console.log(`Received message from server: ${event.data}`);
      const messageComing = event.data
      const messages = messageComing.split("\n")
      messages.forEach((message: string) => {
        dispatch(updateNotifications({notificationsCount: notificationsCount + 1}))
      
      });
    };

    ws.onclose = () => {
      alert("Сервис уведомлений недоступен.")
      console.log('Disconnected from server');
    };

  }, []);

  const [notifications, setNotifications] = useState<NotificationModel[]>()

  const readNotifications = async (message: any) => {
    const messageParsed = JSON.parse(message);

    if (messageParsed.data == null) {
      return;
    }
    const notificationsNum = messageParsed.data.length;
    const notificationsModels = [];
    for (let i = 0; i < notificationsNum; i++) {
      const payload = messageParsed.data[i].payload
      const type = messageParsed.data[i].type
      var notificationModel: NotificationModel
      if (type == "invite-game" || type == "game-cancel" || type == "game-start") {
        var gameData: GameModel;
        try {
          var response;
          response = await get('games/' + payload, token)
          gameData = {
            id: JSON.parse(response.text).id,
            name: JSON.parse(response.text).name,
            date: (new Date(JSON.parse(response.text).start_date)).toLocaleString().slice(0, -3),
            invitationCode: JSON.parse(response.text).invitation_code,
            creatorId: JSON.parse(response.text).creator_id
          }
          response = await get('users/' + gameData.creatorId, token)
          const invitor = JSON.parse(response.text).first_name + " " + JSON.parse(response.text).second_name

          var accepted;
          if (type == "invite-game") {
            response = await get('games/' + gameData.id + '/members', token)
            const membersNum = JSON.parse(response.text).members.length
            const membersIds = []
            for (let j = 0; j < membersNum; j++) {
              membersIds.push(JSON.parse(response.text).members[j].id)
            }
            if (membersIds.includes(id)) {
              accepted = true;
            }

          }
          notificationModel = {
            type: messageParsed.data[i].type,
            date: new Date(messageParsed.data[i].date).toLocaleString(),
            game: gameData,
            invitor: invitor,
            accepted: accepted,
            read: messageParsed.data[i].is_read
          }
          notificationsModels.push(notificationModel)
        }
        catch (error: any) {
          readServerError(error.response.text)
          console.log("error:", error)
        }
        continue;


      }
      else if (type == "invite-sub" || type == "delete-sub") {
        var planData: Plan;
        try {
          var response;
          response = await get('plans/' + payload, token)
          planData = {
            id: JSON.parse(response.text).id,
            invitationCode: JSON.parse(response.text).invitation_code,
            holderId: JSON.parse(response.text).holder_id,
            planType: "",
            planAccess: "",
            expiryDate: "",
            status: "",
            isTrial: false,

          }
          response = await get('users/' + planData.holderId, token)
          const invitor = JSON.parse(response.text).first_name + " " + JSON.parse(response.text).second_name

          var accepted;
          if (type == "invite-sub") {
            response = await get('plans/current', token)
            if (response.text)
              var currentPlanId = JSON.parse(response.text).id
            accepted = currentPlanId == planData.id

          }
          notificationModel = {
            type: messageParsed.data[i].type,
            date: new Date(messageParsed.data[i].date).toLocaleString(),
            plan: planData,
            invitor: invitor,
            accepted: accepted,
            read: messageParsed.data[i].is_read

          }
          notificationsModels.push(notificationModel)
        }
        catch (error: any) {
          readServerError(error.response.text)
          console.log("error:", error)
        }


      }

    }

    dispatch(updateNotifications({notificationsCount: notificationsModels.filter(notification => notification.read == false).length}))

    notificationsModels.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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

  }, []);

  useEffect(() => {
    setPlanType(savedPlan?.planType)
    setExpiryDate(savedPlan?.expiryDate)
    setIsTrial(savedPlan?.isTrial)
    setPlanStatus(savedPlan?.status)
    if (savedPlan == null) {
      fetchPreviousPlans()
    }

  }, [savedPlan]);

  return (
    <div>
      <div className={styles.container}>
        {!isMobile && width > 1110 && height > 763 && <div className={styles.icon}>
          <img src={icon} />
        </div>}
        <div className={styles.up}>
          <div className={styles.title}>
            Добро пожаловать, {name} {" "} {surname}!
          </div>
          <div className={styles.notifications}>
            <IconButton onClick={() => {setNotificationsHidden(false); fetchNotifications()}}>
              <svg width={0} height={0}>
                <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
                  <stop offset={0} stopColor="#55C6F7" />
                  <stop offset={1} stopColor="#2AF8BA" />
                </linearGradient>
              </svg>
              <NotificationsIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />
            </IconButton>
            {notificationsCount > 0 && <div className={styles.new}>
              {notificationsCount}
            </div>}
          </div>
        </div>

        {savedPlan != null ?
          <div>
            <div className={styles.subtitle}>
              {planStatus == "active" ? (!isTrial ? "Вам доступен план:" : "У вас оформлен пробный доступ:") : null}
              {planStatus == "expired" ? "Срок действия плана истек:" : null}
            </div>
            <div className={styles.plan}>
              {planType == "basic" ?
                <BasicPlan />
                :
                <div>
                  {planType == "advanced" ?
                    <AdvancedPlan />
                    :
                    <PremiumPlan />
                  }
                </div>
              }

            </div>
            <div className={styles.footerContainer}>
              {planStatus == "active" &&
                <div className={styles.footer}>
                  Дата истечения срока подписки {expiryDate}
                </div>}


              <Button text={planStatus == "active" ? "Управлять планом" : "Продлить план"}
                onClick={() => navigate("/user_page/profile", { state: { targetId: "plan_info" } })} className={styles.button} />


            </div>
          </div>
          :
          <div>
            <div className={styles.subtitle}>
              Выберите план:
            </div>
            <PlanList isLogged={true} onChange={onChange} trialApplicable={trialApplicable} />
          </div>
        }

      </div>

      {!notificationsHidden ? <NotificationsCenter onBlur={() => { setNotificationsHidden(true);}} notifications={notifications}/> : null}

    </div>
  )
}






