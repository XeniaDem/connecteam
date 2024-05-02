
import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "../../components/button/Button"
import styles from "./Header.module.css"
import logoSmall from "../../app/assets/logoSmall.svg"
import person from "./person.svg"
import { HeaderItem } from "./headerItem/HeaderItem"
import { useDispatch, useSelector } from "react-redux"
import { selectToken, signIn } from "../../store/authSlice"
import { useEffect, useState } from "react"
import { get, readServerError } from "../../utils/api"
import { isMobile } from 'react-device-detect';
import { Plan } from "../planList/PlanList"


type Props = {
  authHeader?: boolean;
  loggedHeader?: boolean;
  adminHeader?: boolean;
  mainHeader?: boolean;

}
export function Header (props: Props) {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()


  const token = useSelector(selectToken)
  const [planInfo, setPlanInfo] = useState<Plan | null>(null)


  const readPlanInfo = (message: any) => {
    if (message == "") {
      setPlanInfo(null)
      return;
    }
    const messageParsed = JSON.parse(message);
    const planInfo = {
      id: messageParsed.id,
      planType: messageParsed.plan_type,
      expiryDate: messageParsed.expiry_date.substring(0, 10),
      planAccess: messageParsed.plan_access,
      status: messageParsed.status,
      isTrial: messageParsed.is_trial

    }
    setPlanInfo(planInfo);
    console.log("jdjdj "+ planInfo)

  }


  const fetchPlan = async () => {
    try {
      const response = await get('plans/current', token)
      readPlanInfo(response.text)
    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }
  }





  if (props.adminHeader) {
    return (

      <div className={styles.container}>
        <div className={styles.group}>
          <div className={styles.logo}>
            <img src={logoSmall} onClick={() => {
              navigate("/admin")
            }} />
          </div>

          <HeaderItem text="Вопросы" onClick={() => {
            navigate("/admin/questions_page")
          }} selected={location.pathname.startsWith("/admin/questions_page")} />

          <HeaderItem text="Пользователи" onClick={() => {
            navigate("/admin/users_page")
          }} selected={location.pathname == "/admin/users_page"} />

          {/* <HeaderItem text="Запросы на план" onClick={() => {
            navigate("/admin/plan_requests")
          }} selected={location.pathname == "/admin/plan_requests"} /> */}
        </div>
        <Button text={"Выход"} onClick={() => {
          navigate("/")
          dispatch(signIn({ token: "", access: "", id: "" }))
        }} className={styles.authButton} />
      </div>
    )
  }


  if (props.loggedHeader) {
    useEffect(() => {
      fetchPlan()
    }, []);
    return (
      <div className={styles.container}>
        <div className={styles.group}>
          <div className={styles.logo}>
            <img src={logoSmall} onClick={() => {
              navigate("/user_page")
            }} />
          </div>

          <HeaderItem text="Профиль" onClick={() => {
            navigate("/user_page/profile")
          }} selected={location.pathname.startsWith("/user_page/profile")} />

          {planInfo && planInfo.status == "active" ? (
            <HeaderItem text="Создать игру" onClick={() => {
              navigate("/user_page/create_game")
            }} selected={location.pathname == "/user_page/create_game"} />
          ) : (
            null
          )}

          <HeaderItem text="Мои игры" onClick={() => navigate("/user_page", { state: { targetId: "games" } })} link="#games" />
          {isMobile && <Button text={"Выход"} onClick={() => {
            navigate("/")
            dispatch(signIn({ token: "", access: "", id: "" }))
          }} className={styles.authButton} />}
        </div>

        {!isMobile && <Button text={"Выход"} onClick={() => {
          navigate("/")
          dispatch(signIn({ token: "", access: "", id: "" }))
        }} className={styles.authButton} />}
      </div>
    )
  }

  if (props.authHeader) {
    return (
      <div className={styles.container}>

        <div className={styles.logo}>
          <img src={logoSmall} onClick={() => {
            navigate("/")
          }} />
        </div>
        <Button text={"Вход"} onClick={() => {
          navigate("/auth/login")
        }} className={styles.authButton} />
      </div>
    )
  }


  if (props.mainHeader) {
    return (
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={logoSmall} onClick={() => {
            navigate("/")
          }} />
        </div>
        <HeaderItem text="О проекте" link="#about" />
        <HeaderItem text="Как играть" link="#real_games" />
        <HeaderItem text="FAQ" link="#faq" />
        <HeaderItem text="Контакты" link="#contacts" />
        <div className={styles.group}>
          <div className={styles.headerButton}>
            <Button text={"Зарегистрироваться"} onClick={() => {
              navigate("/auth/register")
            }} />
          </div>
          <div className={styles.login}>
            <div className={styles.person}>
              <img src={person} />
            </div>
            <HeaderItem text="Войти" link="/auth/login" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={logoSmall} onClick={() => {
          token == "" ? navigate("/") : navigate("/user_page")
        }} />
      </div>
    </div>
  )
}
