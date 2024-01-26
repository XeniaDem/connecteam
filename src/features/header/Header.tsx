
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/button/Button"
import styles from "./Header.module.css"
import logo from "./logo.svg"
import person from "./person.svg"
import { HeaderItem } from "./headerItem/HeaderItem"
export function Header() {

  const navigate = useNavigate()





  return (
    <div className={styles.container}>

      <img src={logo} />

      <HeaderItem text="О проекте" link = "#about" />
      <HeaderItem text="Как играть" link = "#whoplay" />
      <HeaderItem text="О нас" />
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
        <HeaderItem text="Войти" link = "/login"/>
      </div>

    </div>
  )
}
