
import { Header } from "../header/Header"
import styles from "./PlanUsers.module.css"
import icon from "./icon.svg"
import questions from "./questions.svg"
import { JSXElementConstructor, ReactElement, ReactNode, useEffect, useState } from "react"
import { get } from "../../utils/api"
import { useSelector } from "react-redux"
import { selectToken } from "../auth/authSlice"
import { useNavigate } from "react-router-dom"
import disableScroll from 'disable-scroll';
import { User, UserModel } from "../adminPage/usersPage/user/User"
import { Button } from "../../components/button/Button"


type Props = {



}



export function PlanUsers() {

  const navigate = useNavigate()

  const token = useSelector(selectToken)

  const [planUsers, setPlanUsers] = useState<UserModel[] | null>(null)

  const [usersNum, setUsersNum] = useState(0)


  const readPlanUsers = (message: any) => {
    const messageParsed = JSON.parse(message);

    const usersNum = (messageParsed.data.length);
    setUsersNum(usersNum)

    const userModels = [];
    for (let i = 0; i < usersNum; i++) {
      const userModel = {
        id: messageParsed.data[i].id,
        name: messageParsed.data[i].first_name,
        surname: messageParsed.data[i].second_name,
        email: messageParsed.data[i].email,
        photo: messageParsed.data[i].profile_image,
        access: messageParsed.data[i].access,

      }
      userModels.push(userModel)

    }
    setPlanUsers(userModels)
    setFetched(true)

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

  const fetchPlanUsers = async () => {
    try {
      // const response = await get('users/list', token)
      // readUsers(response.text)
      return;

    }
    catch (error: any) {
      // readServerError(error.response.text)
      // console.log("error:", error)
    }


  }
  const [fetched, setFetched] = useState(false)


  const onChange = () => {
    setFetched(!fetched)

  }





  useEffect(() => {

    // fetchPlanUsers()
  }, [fetched]);

  return (
    <div className={styles.container}>
      <svg width={0} height={0}>
        <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
          <stop offset={0} stopColor="#55C6F7" />
          <stop offset={1} stopColor="#2AF8BA" />
        </linearGradient>
      </svg>
      <div className={styles.header}>
        <Header loggedHeader={true} />
      </div>
      <div className={styles.back}>
        <Button text={""} onClick={() => { navigate("/profile")}} className={styles.backButton} />
      </div>
      <div className={styles.title}>
        Участники пакета
      </div>
      <div className={styles.subtitle}>
        Доступно мест {3 - usersNum} / 3
      </div>
      <div className={styles.users}>


        {planUsers != null ? (

          planUsers?.map(user =>
            <div>
              <User user={user} token={token} onChange={onChange} />

            </div>

          )


        ) : (
          <div className={styles.empty}>
            Вы пока не добавляли участников

          </div>

        )}












      </div>
      {usersNum < 3 ? (
      <div className={styles.buttonContainer}>
        <Button text={"+"} onClick={() => null} className={styles.button} />

      </div>
      ) : (
        null

      )}



    </div>
  )
}



