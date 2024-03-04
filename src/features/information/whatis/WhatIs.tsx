
import styles from "./WhatIs.module.css"
import circle from "./circle.svg"
import line1 from "./line1.svg"
import tick from "./tick.svg"
import rectangle1 from "./rectangle1.svg"
import rectangle2 from "./rectangle2.svg"
import rectangle3 from "./rectangle3.svg"
import connecteam from "./connecteam.svg"
import person from "./person.svg"
import question from "./question.svg"
import flag from "./flag.svg"
import { useIsSmall } from "../../../app/hooks/useIsSmall"


export function WhatIs() {
  const isSmall = useIsSmall(1250)




  return (
    <div>
      <div className={styles.title}>
        Что такое
        <img src={connecteam} />
      </div>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.card}>
            <div className={styles.cardLeft}>
              <div className={styles.icon}>
                <img src={person} />
              </div>
            </div>
            <div className={styles.cardRight}>
              <div className={styles.cardTitle}>
                Для кого
              </div>
              <div className={styles.line1}>
                <img src={line1} />
              </div>
              <div className={styles.textBox}>
                <div className={styles.tick}>
                  <img src={tick} />
                </div >
                <div className={styles.text}>
                  У вас есть понимание, что результат делают люди
                </div>
              </div>
              <div className={styles.textBox}>
                <div className={styles.tick}>
                  <img src={tick} />
                </div>
                <div className={styles.text}>
                  У вас есть понимание того, что вы хотите как можно быстрее и эффективнее встроить в работу нового сотрудника
                </div>
              </div>
              <div className={styles.textBox}>
                <div className={styles.tick}>
                  <img src={tick} />
                </div>
                <div className={styles.text}>
                  У вас есть понимание, что фундаментом для достижения результата является эффективное взаимодействие на уровне человек-человек, и только затем инструкции и регламенты
                </div>
              </div>
            </div>
          </div>

          {isSmall && <div className={styles.card}>
            <div className={styles.cardLeft}>
              <div className={styles.cardTitleRight}>
                Зачем
              </div>
              <div className={styles.line2}>
                <img src={line1} />
              </div>
              <div className={styles.textBox}>
                <div className={styles.tick}>
                  <img src={tick} />
                </div >
                <div className={styles.text}>
                  Ускорение адаптации нового сотрудника в коллективе
                </div>
              </div>
              <div className={styles.textBox}>
                <div className={styles.tick}>
                  <img src={tick} />
                </div>
                <div className={styles.text}>
                  Формирование понимания о ценностях нового сотрудника, его жизненных принципах, целях, задачах, увлечениях и приоритетах


                </div>
              </div>
              <div className={styles.textBox}>
                <div className={styles.tick}>
                  <img src={tick} />
                </div>
                <div className={styles.text}>
                  Экономия ресурсов, снижение рисков неоправданных ожиданий


                </div>
              </div>
            </div>
            <div className={styles.cardRight}>
              <div className={styles.icon}>
                <img src={question} />
              </div>

            </div>

          </div>}



          <div className={styles.card}>
            <div className={styles.cardLeft}>
              <div className={styles.icon}>
                <img src={flag} />
              </div>
            </div>
            <div className={styles.cardRight}>
              <div className={styles.cardTitle}>
                Результат
              </div>
              <div className={styles.line1}>
                <img src={line1} />
              </div>
              <div className={styles.contents}>
                <div className={styles.textBoxes}>
                  <div className={styles.textBox}>
                    <div className={styles.tick}>
                      <img src={tick} />
                    </div>
                    <div className={styles.text}>
                      Четкое понимание о личных границах нового сотрудника
                    </div>
                  </div>
                  <div className={styles.textBox}>
                    <div className={styles.tick}>
                      <img src={tick} />
                    </div>
                    <div className={styles.text}>
                      Экономит время, деньги и нервы на этапе притирки
                    </div>
                  </div>
                  <div className={styles.textBox}>
                    <div className={styles.tick}>
                      <img src={tick} />
                    </div>
                    <div className={styles.text}>
                      Новый сотрудник и компания понимают, чем они реально могут быть полезны друг другу.
                    </div>
                  </div>
                  <div className={styles.textBox}>
                    <div className={styles.tick}>
                      <img src={tick} />
                    </div>
                    <div className={styles.text}>
                      У всех есть четкое понимание того, что нужно и чего точно не нужно делать, чтобы получить максимум полезного от сотрудничества
                    </div>
                  </div>

                </div>
                <div className={styles.textBoxes}>
                  <div className={styles.textBox}>
                    <div className={styles.tick}>
                      <img src={tick} />
                    </div>
                    <div className={styles.text}>
                      Возможность более эффективного управления
                    </div>
                  </div>
                  <div className={styles.textBox}>
                    <div className={styles.tick}>
                      <img src={tick} />
                    </div>
                    <div className={styles.text}>
                      Повышение внутренней мотивации на достижение результатов
                    </div>
                  </div>

                  <div className={styles.textBox}>
                    <div className={styles.tick}>
                      <img src={tick} />
                    </div>
                    <div className={styles.text}>
                      Быструю адаптацию в команде

                    </div>

                  </div>
                  <div className={styles.textBox}>
                    <div className={styles.tick}>
                      <img src={tick} />
                    </div>
                    <div className={styles.text}>
                      Выявляет общие ценности и интересы

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!isSmall && <div className={styles.middle}>
          <div className={styles.rectangle}>
            <img src={rectangle1} />
            <img src={rectangle2} />
            <img src={rectangle3} />
          </div>

        </div>}

        {!isSmall && <div className={styles.right}>
          <div className={styles.card}>
            <div className={styles.cardLeft}>
              <div className={styles.cardTitleRight}>
                Зачем
              </div>
              <div className={styles.line2}>
                <img src={line1} />
              </div>
              <div className={styles.textBox}>
                <div className={styles.tick}>
                  <img src={tick} />
                </div >
                <div className={styles.text}>
                  Ускорение адаптации нового сотрудника в коллективе
                </div>
              </div>
              <div className={styles.textBox}>
                <div className={styles.tick}>
                  <img src={tick} />
                </div>
                <div className={styles.text}>
                  Формирование понимания о ценностях нового сотрудника, его жизненных принципах, целях, задачах, увлечениях и приоритетах


                </div>
              </div>
              <div className={styles.textBox}>
                <div className={styles.tick}>
                  <img src={tick} />
                </div>
                <div className={styles.text}>
                  Экономия ресурсов, снижение рисков неоправданных ожиданий


                </div>
              </div>
            </div>
            <div className={styles.cardRight}>
              <div className={styles.icon}>
                <img src={question} />
              </div>

            </div>

          </div>
        </div>}
      </div>
    </div>
  )
}