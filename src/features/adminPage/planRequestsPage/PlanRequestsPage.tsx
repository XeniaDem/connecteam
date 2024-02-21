import styles from "./PlanRequestsPage.module.css"
import { useEffect, useState } from "react"
import { get, readServerError } from "../../../utils/api"
import { useSelector } from "react-redux"
import { selectToken } from "../../auth/authSlice"
import { useNavigate } from "react-router-dom"
import { PlanModel} from "../usersPage/user/User"
import { PlanRequest, RequestModel } from "./planRequest/PlanRequest"





export function PlanRequestsPage() {

  const navigate = useNavigate()

  const token = useSelector(selectToken)

  const [requests, setRequests] = useState<RequestModel[] | null>(null)




  const readUsers = (message: any) => {
    const messageParsed = JSON.parse(message);

    const usersNum = (messageParsed.data.length);

    const requestModels = [];
    for (let i = 0; i < usersNum; i++) {
      if (requestedPlans)
        var plan = requestedPlans?.find((element) => element.userId == messageParsed.data[i].id);
      if (plan == undefined)
        continue;
      const requestModel = {
        id: messageParsed.data[i].id,
        name: messageParsed.data[i].first_name,
        surname: messageParsed.data[i].second_name,
        email: messageParsed.data[i].email,
        photo: messageParsed.data[i].profile_image, //////////////
        plan: plan

      }
      requestModels.push(requestModel)

    }
    setRequests(requestModels)
    setUsersFetched(true)

  }

  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const fetchUsers = async () => {

    fetchPlans()
    await delay(100);


    try {
      const response = await get('users/list', token)
      readUsers(response.text)
      return;

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }


  }

  const [requestedPlans, setRequestedPlans] = useState<PlanModel[] | null>(null)
  const readPlans = (message: any) => {


    const messageParsed = JSON.parse(message);
    if (messageParsed.data == null) {
      setRequestedPlans(null)
      return;
    }

    const plansNum = (messageParsed.data.length);

    const planModels = [];
    for (let i = 0; i < plansNum; i++) {
      if (messageParsed.data[i].confirmed == true) {
        continue;
      }
      const planModel = {
        planType: messageParsed.data[i].plan_type,
        userId: messageParsed.data[i].user_id,
        expiryDate: messageParsed.data[i].expiry_date.substring(0, 10),
        confirmed: messageParsed.data[i].confirmed,
        duration: messageParsed.data[i].duration
      }
      planModels.push(planModel)

    }
    setRequestedPlans(planModels)
    // setUsersFetched(true)

  }

  const fetchPlans = async () => {
    try {
      const response = await get('plans/', token)
      readPlans(response.text)
      return;

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }


  }






  const [usersFetched, setUsersFetched] = useState(false)





  const onUsersChange = () => {
    setUsersFetched(!usersFetched)

  }






  useEffect(() => {
    fetchUsers()


  }, [usersFetched]);

  return (
    <div className={styles.container}>
      <svg width={0} height={0}>
        <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
          <stop offset={0} stopColor="#55C6F7" />
          <stop offset={1} stopColor="#2AF8BA" />
        </linearGradient>
      </svg>
      <div className={styles.title}>
        Запросы на пакет
      </div>
      <div className={styles.users}>

        {requests?.map(request =>
          <div>
            <PlanRequest savedRequest={request} token={token} onChange={onUsersChange} />
          </div>

        )

        }
      </div>


    </div>
  )
}



