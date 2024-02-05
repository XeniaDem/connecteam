
import { Header } from "../../header/Header"
import styles from "./PlanRequestsPage.module.css"
import icon from "./icon.svg"
import questions from "./questions.svg"
import { JSXElementConstructor, ReactElement, ReactNode, useEffect, useState } from "react"

import { get } from "../../../utils/api"
import { useSelector } from "react-redux"
import { selectToken } from "../../auth/authSlice"
import { useNavigate } from "react-router-dom"
import { User, UserModel } from "../usersPage/user/User"
import { PlanRequest, RequestModel } from "./planRequest/PlanRequest"



type Props = {



}



export function PlanRequestsPage() {

  const navigate = useNavigate()

  const token = useSelector(selectToken)

  const [requests, setRequests] = useState<RequestModel[] | null>(null)


  const readRequests = (message: any) => {
    const messageParsed = JSON.parse(message);

    const requestNum = (messageParsed.data.length);

    const requestModels = [];
    for (let i = 0; i < requestNum; i++) {
      const requestModel = {
        id: messageParsed.data[i].id,
        name: messageParsed.data[i].first_name,
        surname: messageParsed.data[i].second_name,
        email: messageParsed.data[i].email,
        photo: messageParsed.data[i].profile_image,
        plan: messageParsed.data[i].access,
        period: "14 дней" /////////////////////

      }
      requestModels.push(requestModel)

    }
    setRequests(requestModels)
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

  const fetchRequests = async () => {
    try {
      const response = await get('users/list', token) ////////////////////////
      readRequests(response.text)
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

    fetchRequests()
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
        <Header adminHeader={true} />
      </div>
      <div className={styles.title}>
        Запросы на пакет
      </div>
      <div className={styles.users}>


        {requests?.map(request =>
          <div>
            <PlanRequest request={request} token = {token} onChange = {onChange} />

          </div>

        )

        }

        {/* {userInfo && (<User user={userInfo} />)} */}






      </div>


    </div>
  )
}



