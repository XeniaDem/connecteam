
import { Button } from "../../../components/button/Button"
import styles from "./BecomeMember.module.css"
import connecteam from "./connecteam.svg"
import ellipse1 from "./ellipse1.svg"


export function BecomeMember() {


  return (
    <div>
      <div className={styles.title}>
        <div className={styles.title}>
          Стать участником {" "}
          <img src={connecteam} />
        </div>
       
      </div>
      
      <div className={styles.container}>
   
        <div className={styles.ellipse1}>
          <img src={ellipse1} />
        </div>

        <div className={styles.left}>
          <div className={styles.text}>
            Зарегистрируйтесь прямо сейчас и получите бесплатный пробный доступ к игре
          </div>
          <div className={styles.subtext}>
            Отправьте заявку, мы свяжемся с вами и расскажем обо всех деталях
          </div>
          <div className={styles.footerLeft}>
            ПО распространяется в виде интернет-сервиса, специальные действия по установке не требуются. Стоимость ПО рассчитывается индивидуально.
          </div>


        </div>
        <div className={styles.right}>
          <div className={styles.inputs}>
            <input className={styles.input} placeholder="Выберите пакет" />
            <input className={styles.input} placeholder="Ваше Имя" />
            <input className={styles.input} placeholder="Ваш Email" />
            <input className={styles.input} placeholder="+7 (999) 999-99-99" />
            <input className={styles.input} placeholder="Придумайте пароль" />
            <input className={styles.input} placeholder="Повторите пароль" />
          </div>
          <div className={styles.footerContainer}>
          <div className={styles.tickBox}>
      


          </div>
            <div className={styles.footerRight}>
              Я согласен с политикой {" "}
              <span className={styles.footerRightUnderline}>
                  обработки персональных данных и даю согласие на обработку своих персональных данных
              </span>
            </div>
          </div>
          <Button text={"Отправить запрос"} onClick={function (): void {
          throw new Error("Function not implemented.")
        }} className= {styles.button} />
        </div>


      </div>


    </div>
  )
}