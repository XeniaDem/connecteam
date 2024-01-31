
import { useNavigate } from "react-router-dom"
import { Button } from "../../../../components/button/Button"
import { InputGradient } from "../../../../components/inputGradient/InputGradient"
import styles from "./FreeAccess.module.css"
export function FreeAccess() {

    const navigate = useNavigate()
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                Попробуйте бесплатный доступ <br /> на 14 дней!
            </div>
            <div className={styles.main}>
                <div className={styles.left}>
                    <div className={styles.advantages}>
                        <div className={styles.advantage}>
                            5 актуальных тем
                        </div>
                        <div className={styles.advantage}>
                            100 уникальных вопросов
                        </div>
                        <div className={styles.advantage}>
                            1 победитель в игре
                        </div>

                    </div>
                    <div className={styles.text}>
                        Регистрируйтесь сейчас и <br /> узнайте о сотрудниках больше
                    </div>
                </div>
                <div className={styles.right}>

                    <input className={styles.input} placeholder="Ваше имя" />

                    {/* <InputGradient className= {styles.inputa} placeholder="Ваше имя"/> */}
                    <input className={styles.input} placeholder="Ваш Email" />
                    <input className={styles.input} placeholder="+7 (999) 999-99-99" />
                    <Button text={"Зарегистрироваться"} onClick={() => {
                        navigate("/admin_page") /////////////////////
                    }} className={styles.button} />

                </div>
            </div>
            <div className={styles.footer}>
                Нажимая на кнопку, вы даете согласие на
                <span className={styles.footerUnderline}>
                    обработку персональных данных и соглашаетесь c политикой конфиденциальности
                </span>
            </div>
        </div>
    )
}