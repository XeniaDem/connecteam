
import { Header } from "../../header/Header"
import styles from "./UsersPage.module.css"
import { useEffect, useState } from "react"
import { PlanModel, User, UserModel } from "./user/User"
import { get } from "../../../utils/api"
import { useSelector } from "react-redux"
import { selectToken } from "../../auth/authSlice"
import { useNavigate } from "react-router-dom"



export function UsersPage() {

  const navigate = useNavigate()

  const token = useSelector(selectToken)

  const [users, setUsers] = useState<UserModel[] | null>(null)


  const readUsers = (message: any) => {
    const messageParsed = JSON.parse(message);

    const usersNum = (messageParsed.data.length);

    const userModels = [];
    for (let i = 0; i < usersNum; i++) {
      var isYou = (messageParsed.data[i].id == id)
      var plan = plans?.find((element) => element.userId == messageParsed.data[i].id);
      const userModel = {
        id: messageParsed.data[i].id,
        name: messageParsed.data[i].first_name,
        surname: messageParsed.data[i].second_name,
        email: messageParsed.data[i].email,
        photo: messageParsed.data[i].profile_image, //////////////
        access: messageParsed.data[i].access,
        isYou: isYou,
        plan: plan

      }
      userModels.push(userModel)

    }
    setUsers(userModels)
    setUsersFetched(true)

  }


  const readServerError = (message: any) => {
    var messageParsed = JSON.parse(message);
    var content = messageParsed.message

    if (content.includes("token is expired")) {
      navigate("/login")
      return ("Срок действия токена вышел.")

    }
    alert(content);

  }

  const fetchUsers = async () => {
    fetchPlans()
    if (id == "") {
      setUsersFetched(false);
    }
 
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
  const [usersFetched, setUsersFetched] = useState(false)


  const onChange = () => {
    setUsersFetched(!usersFetched)

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

    const plansNum = (messageParsed.data.length);

    const planModels = [];
    for (let i = 0; i < plansNum; i++) {
      const planModel = {
        planType: messageParsed.data[i].plan_type,
        userId: messageParsed.data[i].user_id,
        expiryDate: messageParsed.data[i].expiry_date.substring(0,10),
        confirmed: messageParsed.data[i].confirmed,


      }
      planModels.push(planModel)

    }
    setPlans(planModels)
    setUsersFetched(true)

  }

  const fetchPlans = async () => {
    try {
      const response = await get('plans/users-plans', token)
      readPlans(response.text)
      return;

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }


  }




  useEffect(() => {
   
    fetchMe()


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
      <div className={styles.header}>
        <Header adminHeader={true} />
      </div>
      <div className={styles.title}>
        Список пользователей
      </div>
      <div className={styles.users}>


        {users?.map(user =>
          <div>
            <User user={user} token = {token} onChange = {onChange}/>

          </div>

        )

        }

        {/* {userInfo && (<User user={userInfo} />)} */}






      </div>


    </div>
  )
}



