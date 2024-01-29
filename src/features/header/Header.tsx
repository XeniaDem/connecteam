
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/button/Button"
import styles from "./Header.module.css"
import logo from "./logo.svg"
import person from "./person.svg"
import { HeaderItem } from "./headerItem/HeaderItem"


type Props = {
  authHeader?: boolean;
  loggedHeader?: boolean;
  withPackage?: boolean;
  token?: string;

}
export function Header(props: Props) {

  const navigate = useNavigate()

  if (props.loggedHeader) {
    return (
      <div className={styles.container}>
        <div className={styles.group}>
          <div className={styles.logo}>
            <img src={logo} />
          </div>


          <HeaderItem text="Профиль" onClick={() => {
            navigate("/profile", { state: { token: props.token } })

          }} />
          {props.withPackage ? (
            <HeaderItem text="Создать игру" />
          ) : (
            <div />
          )}
          <HeaderItem text="Мои игры" />
        </div>
        <Button text={"Выход"} onClick={() => {
          navigate("/")
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
      <HeaderItem text="О проекте" link="#about" />
      <HeaderItem text="Как играть" link="#real_games" />
      <HeaderItem text="FAQ" link="#faq" />
      <HeaderItem text="Контакты" />
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
