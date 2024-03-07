
import { useEffect, useState } from "react"
import { Button } from "../../components/button/Button"
import styles from "./JoinPackage.module.css"
import connecteam from "./connecteam.svg"
import logo from "./logo.svg"
import ellipse1 from "./ellipse1.svg"
import ellipse2 from "./ellipse2.svg"
import { useLocation, useNavigate } from "react-router-dom"
import disableScroll from 'disable-scroll';
import validator from 'validator'
import { get, post } from "../../utils/api"
import { isMobile } from 'react-device-detect';
import { useSelector } from "react-redux"
import { selectAccess, selectToken } from "../auth/authSlice"


export function JoinPackage() {
  const navigate = useNavigate()
  const location = useLocation()

  const token = useSelector(selectToken)
  const access = useSelector(selectAccess)
  const code = location.hash.slice(1);
  const [name, setName] = useState("")
  const [id, setId] = useState("")

  const [isForbidden, setIsForbidden] = useState(false)
  var errorMessage = "";



  const saveId = (message: any) => {
    var messageParsed = JSON.parse(message);
    var id = messageParsed.id

    setId(id)

  }



  const readJoinError = (message: any) => {
    if (message.includes("incorrect")) {
      token == "" ? navigate("/") : navigate("/user_page")
    }
    if (message.includes("not active")) {
      setIsForbidden(true)
      errorMessage = "Приглашение не действительно."

    }
    if (message.includes("max number")) {
      setIsForbidden(true)
      errorMessage = "Превышен лимит участников тарифа."

    }

  }
  const validatePathname = async () => {
    if (!code || code == "") {
      token == "" ? navigate("/") : navigate("/user_page")
    }
    try {

      const response = await get('validate/' + code)
      saveId(response.text)
    }
    catch (error: any) {
      readJoinError(error.response.text)
      console.log("error:", error)

    }

  }
  const getInvitor = async () => {
    try {

      const response = await get('users/' + id)
      setName(JSON.parse(response.text).name)
    }
    catch (error: any) {
      readJoinError(error.response.text)
      console.log("error:", error)

    }

  }


  const joinPackage = async () => {
    try {

      const response = await post('plans/join/' + code, token)
      navigate("/user_page")




    }
    catch (error: any) {
      readJoinError(error.response.text)
      console.log("error:", error)

    }

  }




  useEffect(() => {
    // alert(code)
    if (token == "") {
      navigate("/auth/invitation#" + code)
    } else {
      navigate("/user_page/invitation#" + code)

    }
    validatePathname()


  }, []);
  useEffect(() => {
    id && getInvitor()

  }, [id]);

  return (
    <div>

      <div className={styles.container}>

        <div className={styles.ellipse1}>
          <img src={ellipse1} />

        </div>
        <div className={styles.ellipse2}>
          <img src={ellipse2} />

        </div>
        <div className={styles.connecteam}>
          {!isMobile ? <img src={connecteam} /> : <img src={logo} />}

        </div>

        <div className={styles.title}>
          Пользователь <span className={styles.title1}> {id} </span> пригласил Вас присоединиться к плану.
        </div>





        {token == "" ?
          <div>
            <Button text={"Зарегистрироваться"} onClick={() => null} className={styles.button} />
            <div className={styles.footerContainer}>
              <div className={styles.footerItem}>
                Уже есть аккаунт?

              </div>
              <Button text={"Войти"} onClick={() => {
                navigate("/auth/login", { state: { inviteCode: code } })
              }} className={styles.footerButton} />

            </div>
          </div>
          :
          <div>
            {isForbidden ? <div className={styles.errorMessage}> {errorMessage} </div>
              :
              <Button text={"Присоединиться"} onClick={joinPackage} className={styles.button} />}
          </div>
        }


      </div>

    </div>
  )
}

