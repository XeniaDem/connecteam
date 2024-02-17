import styles from "./PlanUsersPage.module.css"
import { useEffect, useState } from "react"
import { get } from "../../utils/api"
import { useSelector } from "react-redux"
import { selectToken } from "../auth/authSlice"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/button/Button"
import { PlanUser, PlanUserModel } from "./planUser/PlanUser"



export function PlanUsersPage() {

  const navigate = useNavigate()

  const token = useSelector(selectToken)

  const [planUsers, setPlanUsers] = useState<PlanUserModel[] | null>(null)

  const [usersNum, setUsersNum] = useState(0)


  const readPlanUsers = (message: any) => {
    const messageParsed = JSON.parse(message);

    const usersNum = (messageParsed.data.length);
    setUsersNum(usersNum)

    const userModels = [];
    for (let i = 0; i < usersNum; i++) {
      const planUserModel = {
        id: messageParsed.data[i].id,
        name: messageParsed.data[i].first_name,
        surname: messageParsed.data[i].second_name,
        email: messageParsed.data[i].email,
        photo: messageParsed.data[i].profile_image,
        plan: messageParsed.data[i].access, ///////////////////////

      }
      userModels.push(planUserModel)

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
      const response = await get('users/list', token)
      readPlanUsers(response.text)
      return;

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }


  }
  const [fetched, setFetched] = useState(false)


  const onChange = () => {
    setFetched(!fetched)

  }





  useEffect(() => {

    fetchPlanUsers()
  }, [fetched]);

  return (
    <div>
  

      <div className={styles.container}>


        <div>
        <svg width={0} height={0}>
        <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
          <stop offset={0} stopColor="#55C6F7" />
          <stop offset={1} stopColor="#2AF8BA" />
        </linearGradient>
      </svg>
          <div className={styles.back}>
            <Button text={""} onClick={() => { navigate(-1) }} className={styles.backButton} />
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
                  <PlanUser planUser={user} token={token} onChange={onChange} />

                </div>

              )


            ) : (
              <div className={styles.empty}>
                Вы пока не добавляли участников

              </div>

            )}


          </div>
        </div>
        {usersNum < 3 ? (
          <div className={styles.buttonContainer}>
            <Button text={"+"} onClick={() => null} className={styles.button} />

          </div>
        ) : (
          null

        )}




      </div>
    </div>
  )
}



