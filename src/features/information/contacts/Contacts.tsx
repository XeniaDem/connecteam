import styles from "./Contacts.module.css"
import logo from "./logo.svg"

export function Contacts() {
    return (
        <div id="contacts">
            <div className={styles.container}>
                <div className={styles.column}>
                    <img src={logo} />
                    <div className={styles.text} >
                        ©2024 Connecteam <br />
                        Все права защищены.
                    </div>

                </div>
                <div className={styles.group}>
                    <div className={styles.column}>
                        <div className={styles.title} >
                            Контакты
                        </div>
                        <div className={styles.text} >
                            +7(999)999-99-99 <br />  +7(999)999-99-99
                        </div>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.title} >
                            Соцсети
                        </div>
                        <div className={styles.textUnderline} >
                            Telegram <br />  Instagram <br /> WhatsApp
                        </div>


                    </div>
                    <div className={styles.column}>
                        <div className={styles.title} >
                            Наша почта
                        </div>
                        <div className={styles.email} >
                            connecteam@gmail.com

                        </div>


                    </div>

                </div>

            </div>


        </div>

    )
}