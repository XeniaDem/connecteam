
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/button/Button"
import styles from "./Header.module.css"
import logo from "./logo.svg"
import person from "./person.svg"
export function Header() {

  const navigate = useNavigate()


  return (
    <div className={styles.container}>
      <div className={styles.headerItem}>
        <img src={logo} />
      </div>
      <div className={styles.headerItem}>
        О проекте
      </div>
      <div className={styles.headerItem}>
        Как играть
      </div>
      <div className={styles.headerItem}>
        О нас
      </div>
      <div className={styles.headerItem}>
        Контакты
      </div>
      <div className={styles.headerButton}>
        <Button text={"Зарегистрироваться"} onClick={() => {
          navigate("/registration")
        }} />

      </div>
      <div className={styles.login}>
        <div className={styles.person}>
          <img src={person} />
        </div>
        <div className={styles.headerItem}>
          Войти
        </div>
      </div>

    </div>
  )
}
