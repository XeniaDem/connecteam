
import { useEffect, useState } from "react"
import { Button } from "../../components/button/Button"
import styles from "./JoinPlan.module.css"
import ellipse1 from "../../app/assets/ellipse1.svg"
import ellipse2 from "../../app/assets/ellipse2.svg"
import logoBig from "../../app/assets/logoBig.svg"
import logoSmall from "../../app/assets/logoSmall.svg"
import { useLocation, useNavigate } from "react-router-dom"
import { get, post } from "../../utils/api"
import { isMobile } from 'react-device-detect';
import { useSelector } from "react-redux"
import { selectToken } from "../../utils/authSlice"


export function JoinPlan() {
  const navigate = useNavigate()
  const location = useLocation()

  const token = useSelector(selectToken)
  const code = location.hash.slice(1);
  const [name, setName] = useState("")
  const [id, setId] = useState("")

  const [isForbidden, setIsForbidden] = useState(false)
  const [errorMessage, setErrorMessage] = useState("");



  const saveId = (message: any) => {
    var messageParsed = JSON.parse(message);
    var id = messageParsed.holder_id
    setId(id)
  }



  const readJoinError = (message: any) => {
    setIsForbidden(true)
    if (message.includes("no rows")) {
      token == "" ? navigate("/") : navigate("/user_page")
    }
    if (message.includes("not active")) {
      setErrorMessage("Приглашение не действительно")
      return;
    }
    if (message.includes("max number")) {
      setErrorMessage("Превышен лимит участников плана")
      return;
    }
    if (message.includes("equal")) {
      setErrorMessage("Вы являетесь владельцем плана")
      return;
    }
    if (message.includes("incorrect")) {
      setErrorMessage("Неверный код приглашения")
      return;
    }

    setErrorMessage(message)
  }

  const validatePathname = async () => {
    if (!code || code == "") {
      token == "" ? navigate("/") : navigate("/user_page")
    }
    try {
      const response = await get('validate/plan/' + code)
      saveId(response.text)
    }
    catch (error: any) {
      readJoinError(error.response.text)
      console.log("error:", error)
    }
  }

  const getInvitor = async () => {
    try {
      const response = await get('users/' + id, token)
      setName(JSON.parse(response.text).first_name + " " + JSON.parse(response.text).second_name)
    }
    catch (error: any) {
      readJoinError(error.response.text)
      console.log("error:", error)
    }
  }


  const joinPlan = async () => {
    try {
      const response = await post('plans/join/' + code, undefined, token)
      navigate("/user_page")
    }
    catch (error: any) {
      readJoinError(error.response.text)
      console.log("error:", error)
    }
  }




  useEffect(() => {
    // if (token == "") {
    //   navigate("/auth/invitation#" + code)
    // } else {
    //   navigate("/user_page/invitation#" + code)
    // }
    validatePathname()
  }, []);

  useEffect(() => {
    if (token != "")
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
        <div className={styles.body}>
          <div className={styles.connecteam}>
            {!isMobile ? <img src={logoBig} /> : <img src={logoSmall} />}
          </div>

          <div className={styles.title}>
            Пользователь <span className={styles.title1}> {name} </span> пригласил Вас присоединиться к плану.
          </div>
          {token == "" ?
            <div className={styles.buttons} >
              <Button text={"Зарегистрироваться"} onClick={() => navigate("/auth/register", { state: { planInvitation: code } })} className={styles.button} />
              <div className={styles.footerContainer}>
                <div className={styles.footerItem}>
                  Уже есть аккаунт?

                </div>
                <Button text={"Войти"} onClick={() =>
                  navigate("/auth/login", { state: { inviteCode: code } })
                } className={styles.footerButton} />

              </div>
            </div>
            :
            <div className={styles.buttons}>
              {isForbidden ? <div className={styles.errorMessage}> {errorMessage} </div>
                :
                <Button text={"Присоединиться"} onClick={joinPlan} className={styles.button} />}
            </div>
          }
        </div>
      </div>
    </div>
  )
}

