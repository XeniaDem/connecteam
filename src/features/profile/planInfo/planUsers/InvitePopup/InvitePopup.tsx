
import { useEffect, useState } from "react";
import { Button } from "../../../../../components/button/Button"
import styles from "./InvitePopup.module.css"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton } from "@mui/material";
import validator from "validator";
import { SearchBar } from "../../../../../components/searchBar/SearchBar";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from "react-redux";
import { selectId, selectToken } from "../../../../../store/authSlice";
import { get, post, readServerError } from "../../../../../utils/api";
import { useNavigate } from "react-router-dom";
import telegramLogo from "../../../../../app/assets/telegram.png"
import whatsappLogo from "../../../../../app/assets/whatsapp.png"

type SearchUserModel = {
  id: string,
  key: string
}

type Props = {
  closePopup: () => void;
  invitationCode: string;
  planId: string;

}


export function InvitePopup(props: Props) {

  const token = useSelector(selectToken)

  const id = useSelector(selectId)

  const [copiedHidden, setCopiedHidden] = useState(true);
  const copyLink = () => {
    navigator.clipboard.writeText(link)
    setCopiedHidden(false)
    setTimeout(() => {
      setCopiedHidden(true);
    }, 3000);

  }

  const [email, setEmail] = useState("")

  const [formSubmitted, setFormSubmitted] = useState(false)

  const getEmailErrorMessage = () => {
    if (!validator.isEmail(email)) {
      return "Некорректно введен адрес эл. почты"
    }

    return null
  }
  var emailErrorMessage = getEmailErrorMessage()


  const sendEmailInvite = () => { ///////////////////////////////
    setFormSubmitted(true)
    if (emailErrorMessage != null) {
      return;
    }



  }



  const [users, setUsers] = useState<SearchUserModel[]>([])

  const [currentUser, setCurrentUser] = useState<SearchUserModel>()

  const readUsers = (message: any) => {

    const messageParsed = JSON.parse(message);

    const usersNum = (messageParsed.data.length);

    const userModels = [];
    for (let i = 0; i < usersNum; i++) {
      var isYou = (messageParsed.data[i].id == id) ////////////////
      if (isYou)
        continue;
      var access = messageParsed.data[i].access
      if (access == "admin" || access == "super_admin")
        continue;
      const userModel = {
        id: messageParsed.data[i].id,
        key: messageParsed.data[i].first_name + " " + messageParsed.data[i].second_name + " " + messageParsed.data[i].email

      }
      userModels.push(userModel)

    }
    setUsers(userModels)

  }

  const fetchUsers = async () => {

    try {
      const response = await get('users/list', token)
      readUsers(response.text)
      return;

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }


  }


  const [link, setLink] = useState("")

  const [findUserHidden, setFindUserHidden] = useState(true)


  const addUser = () => {
    if (findUserHidden == true) {
      setFindUserHidden(false)
    }
    else {
      if (currentUser == null) {
        return;
      }
      inviteUser()


      setFindUserHidden(true)

    }
  }

  const inviteUser = async () => {
    const data = {
      "user_id": currentUser?.id
    }
    try {
      const response = await post('plans/invite/' + props.planId, data, token)


    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }


  }



  const fetchLink = () => {
    setLink("https://connecteam.ru/invite/plan/" + props.invitationCode)

  }

  const text = "Вас пригласили присоединиться к плану доступа в Connecteam! Перейдите по ссылке, чтобы принять приглашение."



  useEffect(() => {
    fetchUsers()
    fetchLink()
  }, []);

  return (
    <div className={styles.background}>
      <div className={styles.container}>

        <div className={styles.close}>
          <Button text={""} onClick={props.closePopup} className={styles.closeButton} />
        </div>


        <div className={styles.title}>
          Пригласите участника
        </div>
        <div className={styles.linkContainer}>
          <div className={styles.subtitle}>
            Ссылка
          </div>
          <div className={styles.link}>
            {link}
            <IconButton onClick={copyLink}>
              <svg width={0} height={0}>
                <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
                  <stop offset={0} stopColor="#55C6F7" />
                  <stop offset={1} stopColor="#2AF8BA" />
                </linearGradient>
              </svg>
              <ContentCopyIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />
            </IconButton>
          </div>

          <div className={styles.divider} />
          <div className={styles.info}>
            {!copiedHidden ? (<div className={styles.copied}>
              Скопировано!
            </div>
            ) : (
              null

            )}
          </div>


        </div>
        <input className={styles.input} placeholder="Эл. адрес" value={email} onChange={(event) => { setEmail((event.target.value).replace(/\s/g, '')) }} />

        {formSubmitted && (emailErrorMessage) ? (
          <div className={styles.errorMessage}>
            {emailErrorMessage}
          </div>
        ) : (
          null
        )}
        <Button text={"Отправить"} onClick={sendEmailInvite} className={styles.sendButton} />

        <div className={styles.buttons}>
          {!findUserHidden ? <SearchBar data={users} onSelectedChange={setCurrentUser} placeholder="Поиск пользователя..." /> : null}

          <IconButton onClick={addUser}>
            {findUserHidden ? (
              <PersonSearchIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />
            ) : (
              <SendIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />


            )}
          </IconButton>


        </div>
        <div className={styles.logos}>
          <div className={styles.logo}>
            <img src={telegramLogo} onClick={() => {
              window.open("https://telegram.me/share/url?url=" + link + "&text=" + text, "_blank");
            }} />
          </div>
          <div className={styles.logo}>
            <img src={whatsappLogo} onClick={() => {
              window.open("https://wa.me/?text=" + link + " " + text, "_blank");
            }} />
          </div>
        </div>

      </div>

    </div>
  )
}