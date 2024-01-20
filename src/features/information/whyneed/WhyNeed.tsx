
import styles from "./WhyNeed.module.css"
import arrow1 from "./arrow1.svg"
import arrow2 from "./arrow2.svg"
import rectangle from "./rectangle.svg"

export function WhyNeed() {


  return (
    <div>

     
<div className={styles.title}>
        Зачем это нужно
      </div>
      <div className={styles.container}>
  
        <div className={styles.rectangle}>
          <img src={rectangle} />
        </div>


        <div className={styles.left}>

          <div className={styles.card}>



            <div className={styles.arrow1}>
              <img src={arrow1} />
            </div>
            <div className={styles.cardLeft}>
              <div className={styles.number}>
                01
              </div>
            </div>
            <div className={styles.cardRight}>
              <div className={styles.why}>
                Создать команду единомышленников
              </div>
              <div className={styles.text}>
                Только на основе единых базовых принципов и целей можно создать по-настоящему эффективную команду.
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardLeft}>
              <div className={styles.number}>
                03
              </div>
            </div>
            <div className={styles.cardRight}>
              <div className={styles.why}>
                Получить инфоповод
              </div>
              <div className={styles.text}>
                Для общения внутри коллектива
              </div>
            </div>
          </div>


        </div>

        <div className={styles.right}>

          <div className={styles.card}>


            <div className={styles.arrow2}>
              <img src={arrow2} />
            </div>
            <div className={styles.cardLeft}>
              <div className={styles.number}>
                02
              </div>
            </div>
            <div className={styles.cardRight}>
              <div className={styles.why}>
                Понять нового сотрудника
              </div>
              <div className={styles.text}>
                Понять новому сотруднику быстрее адаптироваться в новом коллективе
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>



  )
}