import { Button } from "../../components/button/Button"
import styles from "./Header.module.css"
import logo from "./logo.svg"
import person from "./person.svg"
export function Header() {


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
      <div className={styles.headerItem}>
        <Button text={"Зарегистрироваться"} onClick={function (): void {
          throw new Error("Function not implemented.")
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
