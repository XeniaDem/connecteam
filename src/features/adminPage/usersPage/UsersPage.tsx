import styles from "./UsersPage.module.css"
import { useEffect, useState } from "react"
import { PlanModel, User, UserModel } from "./user/User"
import { get, readServerError } from "../../../utils/api"
import { useSelector } from "react-redux"
import { selectToken } from "../../../utils/authSlice"


export function UsersPage() {

  const token = useSelector(selectToken)

  const [users, setUsers] = useState<UserModel[] | null>(null)


  const readUsers = (message: any) => {
    const messageParsed = JSON.parse(message);

    const usersNum = (messageParsed.data.length);

    const userModels = [];
    for (let i = 0; i < usersNum; i++) {
      var isYou = (messageParsed.data[i].id == id)
      if (plans)
        var plan = plans?.find((element) => element.userId == messageParsed.data[i].id); ///////////////
      const userModel = {
        id: messageParsed.data[i].id,
        name: messageParsed.data[i].first_name,
        surname: messageParsed.data[i].second_name,
        email: messageParsed.data[i].email,
        photo: messageParsed.data[i].profile_image,
        access: messageParsed.data[i].access,
        isYou: isYou,
        plan: plan

      }
      userModels.push(userModel)

    }
    setUsers(userModels)
    setUsersFetched(true)

  }


  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const fetchUsers = async () => {

    fetchMe()
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
  const [id, setId] = useState("");


  const readId = (message: any) => {

    var messageParsed = JSON.parse(message);

    var id = messageParsed.id
    setId(id)


  }


  const fetchMe = async () => {
    try {

      const response = await get('users/me', token)
      readId(response.text)

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }


  }

  const [plans, setPlans] = useState<PlanModel[] | null>(null)
  const readPlans = (message: any) => {



    const messageParsed = JSON.parse(message);
    // alert(JSON.stringify(messageParsed))
    if (messageParsed.data == null) {
      setPlans(null)
      return;
    }

    const plansNum = (messageParsed.data.length);

    const planModels = [];
    for (let i = 0; i < plansNum; i++) {
      const planModel = {
        id: messageParsed.data[i].id,
        planType: messageParsed.data[i].plan_type,
        userId: messageParsed.data[i].user_id,
        expiryDate: messageParsed.data[i].expiry_date.substring(0, 10),
        status: messageParsed.data[i].status,
      }
      planModels.push(planModel)

    }
    setPlans(planModels)
    // setUsersFetched(true)

  }


  const fetchPlans = async () => {
    try {
      const response = await get('plans/active', token)
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


    fetchUsers();

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
        Список пользователей
      </div>
      <div className={styles.users}>


        {users?.map(user =>
          <div>
            <User savedUser={user} onChange={onUsersChange} />
          </div>

        )}

      </div>


    </div>
  )
}



