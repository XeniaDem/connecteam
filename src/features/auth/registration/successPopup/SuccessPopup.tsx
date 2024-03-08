
import { useNavigate } from "react-router-dom"
import { Button } from "../../../../components/button/Button"
import styles from "../Popup.module.css"
import disableScroll from 'disable-scroll';
import { post, readServerError } from "../../../../utils/api";
import { signIn, Access } from "../../../../utils/authSlice";
import { useDispatch } from "react-redux";

type Props = {
  email: string;
  password: string;
  inviteCode?: string;
}
export function SuccessPopup(props: Props) {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  let access = ""
  const saveAccessAndToken = (message: any) => {

    var messageParsed = JSON.parse(message);
    access = messageParsed.access;
    const token = messageParsed.token;
    dispatch(signIn({token: token, access: access as Access}));

  }

  const login = async () => {

    const data = {
      "email": props.email,
      "password": props.password

    }
    try {

      const response = await post('auth/sign-in/email', data)
      saveAccessAndToken(response.text)

      if (access == "admin" || access == "superadmin") {
        navigate("/admin")
      }
      else {
        if (props.inviteCode != null) {
          navigate("/user_page/invitation#" + props.inviteCode)

        } else {
          navigate("/user_page")
        }
      }

    }
    catch (error: any) {
      readServerError(error.text)
      console.log("error:", error)
    }

  }




  return (
    <div className={styles.background}>
      <div className={styles.container}>

      {/* <div className={styles.close}>
      <Button text={""} onClick = {() => {navigate("/"); disableScroll.off()}} className={styles.closeButton} />
          </div> */}


        <div className={styles.title}>
        Вы успешно зарегистрировались!
        </div>



        <Button text={"Войти"} onClick = {() => {login(); disableScroll.off()}} className={styles.button} />

      </div>

    </div>
  )
}