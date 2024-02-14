
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/button/Button"
import styles from "./Header.module.css"
import logo from "./logo.svg"
import person from "./person.svg"
import { HeaderItem } from "./headerItem/HeaderItem"
import { useDispatch } from "react-redux"
import { setToken } from "../auth/authSlice"
import { useState } from "react"


type Props = {
  authHeader?: boolean;
  loggedHeader?: boolean;
  adminHeader?: boolean;
  withPackage?: boolean;

}
export function Header(props: Props) {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [selectedItemName, setSelectedItemName] = useState("");
  const onItemClicked = (newValue: boolean, name: string) => {


    
    setSelectedItemName(name)



  };



  if (props.adminHeader) {

    return (
      <div className={styles.container}>
        <div className={styles.group}>
          <div className={styles.logo}>
            <img src={logo} onClick={() => {
              navigate("/admin_page")
            }} />
          </div>


          <HeaderItem text="Вопросы" onClick={() => {

            navigate("/questions_page")

          }} selected={"Вопросы" == selectedItemName} onItemClicked={onItemClicked} />

          <HeaderItem text="Пользователи" onClick={() => {
            navigate("/users_page")


          }} selected={"Пользователи" == selectedItemName} onItemClicked={onItemClicked} />

          <HeaderItem text="Запросы на пакет" onClick={() => {

            navigate("/plan_requests")




          }} selected={"Запросы на пакет" == selectedItemName} onItemClicked={onItemClicked} />
        </div>
        <Button text={"Выход"} onClick={() => {
          navigate("/")
          dispatch(setToken(""))
        }} className={styles.authButton} />


      </div>



    )
  }


  if (props.loggedHeader) {
    return (
      <div className={styles.container}>
        <div className={styles.group}>
          <div className={styles.logo}>
            <img src={logo} onClick={() => {
              navigate("/user_page")
            }} />
          </div>


          <HeaderItem text="Профиль" onClick={() => {
            navigate("/profile")

          }} onItemClicked={onItemClicked}/>
          {props.withPackage ? (
            <HeaderItem text="Создать игру" onClick={() => {
              navigate("/create_game")}} onItemClicked={onItemClicked}/>
          ) : (
            null
          )}
          <HeaderItem text="Мои игры" onClick={() => navigate("/user_page", { state: { targetId: "games" } })}/>
        </div>
        <Button text={"Выход"} onClick={() => {
          navigate("/")
          dispatch(setToken(""))
        }} className={styles.authButton} />


      </div>



    )
  }



  if (props.authHeader) {
    return (
      <div className={styles.container}>

        <div className={styles.logo}>
          <img src={logo} onClick={() => {
            navigate("/")
          }} />
        </div>
        <Button text={"Вход"} onClick={() => {
          navigate("/login")
        }} className={styles.authButton} />


      </div>



    )
  }


  return (

    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={logo} onClick={() => {
          navigate("/")
        }} />
      </div>
      <HeaderItem text="О проекте" link="#about"/>
      <HeaderItem text="Как играть" link="#real_games" />
      <HeaderItem text="FAQ" link="#faq" />
      <HeaderItem text="Контакты" link="#contacts" />
      <div className={styles.headerButton}>
        <Button text={"Зарегистрироваться"} onClick={() => {
          navigate("/register")
        }} />

      </div>
      <div className={styles.login}>
        <div className={styles.person}>
          <img src={person} />
        </div>
        <HeaderItem text="Войти" link="/login" />
      </div>

    </div >
  )
}
