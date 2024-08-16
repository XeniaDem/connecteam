import { useEffect, useState } from "react";
import { Button } from "../../components/button/Button"
import styles from "./InvitePopup.module.css"
import validator from "validator";
import { SearchBar } from "../../components/searchBar/SearchBar";
import { get, post, readServerError } from "../../utils/api";
import { selectId, selectToken } from "../../store/authSlice";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import SendIcon from '@mui/icons-material/Send';
import telegramLogo from "../../app/assets/telegram.png"
import whatsappLogo from "../../app/assets/whatsapp.png"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';

type SearchUserModel = {
  id: string,
  key: string
}

type Props = {
  closePopup: () => void;
  invitationCode: string;
  id: string;
  isGame: boolean;
}

export function InvitePopup(props: Props) {

  const token = useSelector(selectToken)

  const id = useSelector(selectId)

  const [email, setEmail] = useState("")

  const [formSubmitted, setFormSubmitted] = useState(false)

  const appUrl = process.env.REACT_APP_URL;

  const getEmailErrorMessage = () => {
    if (!validator.isEmail(email)) {
      return "Некорректно введен адрес эл. почты"
    }
    return null
  }
  var emailErrorMessage = getEmailErrorMessage()

  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    if (copied)
      return;
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }

  const sendEmailInvite = () => { //TBD
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
      var isYou = (messageParsed.data[i].id == id)
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
      inviteUser(props.isGame)
      setFindUserHidden(true)
    }
  }

  const inviteUser = async (isGame: boolean) => {
    const data = {
      "user_id": currentUser?.id
    }
    try {
      if (isGame)
        post('games/invite/' + props.id, data, token)
      else
        post('plans/invite/' + props.id, data, token)
    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }
  }

  const fetchLink = (isGame: boolean) => {
    if (isGame)
      setLink(appUrl + "invite/game/" + props.invitationCode)
    else
      setLink(appUrl + "invite/plan/" + props.invitationCode)
  }

  const text = props.isGame ?
    "Вас пригласили присоединиться к игре в Connecteam! Перейдите по ссылке, чтобы просмотреть данные игры и принять приглашение."
    :
    "Вас пригласили присоединиться к плану доступа в Connecteam! Перейдите по ссылке, чтобы просмотреть и принять приглашение."

  useEffect(() => {
    fetchUsers()
    fetchLink(props.isGame)
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

              {!copied ? (
                <ContentCopyIcon fontSize="small" sx={{ fill: "url(#linearColors)" }} />
              ) : (
                <DoneIcon fontSize="small" sx={{ fill: "url(#linearColors)" }} />
              )}
            </IconButton>
          </div>

          <div className={styles.divider} />
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
          {!findUserHidden ? <SearchBar data={users} onSelectedChange={setCurrentUser} showData={false} placeholder="Поиск пользователя..." /> : null}

          <IconButton onClick={addUser}>
            <svg width={0} height={0}>
              <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
                <stop offset={0} stopColor="#55C6F7" />
                <stop offset={1} stopColor="#2AF8BA" />
              </linearGradient>
            </svg>
            {findUserHidden ? (
              <div className={styles.buttonContainer}>
                <PersonSearchIcon fontSize="small" sx={{ fill: "url(#linearColors)" }} />
                Поиск участника
              </div>
            ) : (
              currentUser &&
              <div className={styles.buttonContainer}>
                <SendIcon fontSize="small" sx={{ fill: "url(#linearColors)" }} />
                Отправить
              </div>
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