
import { Header } from "../../header/Header"
import styles from "./UsersPage.module.css"
import icon from "./icon.svg"
import questions from "./questions.svg"
import { JSXElementConstructor, ReactElement, ReactNode, useEffect, useState } from "react"
import { User, UserModel } from "./user/User"
import { get } from "../../../utils/api"
import { useSelector } from "react-redux"
import { selectToken } from "../../auth/authSlice"
import { useNavigate } from "react-router-dom"
import { JSX } from "react/jsx-runtime"
import { UserPopup } from "./userPopup/UserPopup"
import disableScroll from 'disable-scroll';


type Props = {



}



export function UsersPage() {

  const navigate = useNavigate()

  const token = useSelector(selectToken)

  const [users, setUsers] = useState<UserModel[] | null>(null)


  const readUsers = (message: any) => {
    const messageParsed = JSON.parse(message);
    alert(JSON.stringify(messageParsed.data[0]));
    const usersNum = (messageParsed.data.length);

    const userModels = [];
    for (let i = 0; i < usersNum; i++) {
      const userModel = {
        name: messageParsed.data[i].first_name,
        surname: messageParsed.data[i].second_name,
        email: messageParsed.data[i].email,
        photo: messageParsed.data[i].profile_image, //////////////
        access: messageParsed.data[i].access

      }
      userModels.push(userModel)

    }
    setUsers(userModels)

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
    try {
      const response = await get('users/list', token)
      readUsers(response.text)

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }


  }



  const [userOpen, setUserOpen] = useState(false);

  const openUserPopup = () => {
    disableScroll.on()
    setUserOpen(true)

  }
  const closeUserPopup = () => {
    disableScroll.off()
    setUserOpen(false)

  }






  useEffect(() => {

    fetchUsers()

  }, []);

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
            <User user={user} onClick={openUserPopup}/>
            {userOpen ? <UserPopup user={user} closePopup={closeUserPopup} /> : null}

          </div>

        )

        }

        {/* {userInfo && (<User user={userInfo} />)} */}






      </div>


    </div>
  )
}



