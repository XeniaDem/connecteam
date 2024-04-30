
import { useEffect, useState } from "react";
import { Button } from "../../../../../components/button/Button"
import styles from "./InvitePopup.module.css"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton } from "@mui/material";
import { SearchBar } from "../../../../../components/searchBar/SearchBar";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import SendIcon from '@mui/icons-material/Send';

type SearchUserModel = {
  id: string,
  key: string
}

type Props = {
  closePopup: () => void;
  token: string;
  invitationCode: string;

}


export function InvitePopup(props: Props) {
  const [copiedHidden, setCopiedHidden] = useState(true);
  const copyLink = () => {
    navigator.clipboard.writeText(link)
    setCopiedHidden(false)
    setTimeout(() => {
      setCopiedHidden(true);
    }, 3000);

  }



  const [users, setUsers] = useState<SearchUserModel[]>([])

  const [currentUser, setCurrentUser] = useState<SearchUserModel>()

  const addUsers = () => {
    const users = []
    for (let i = 0; i < 10; i++) {

      const userModel = {
        id: i.toString(),
        key: "Имя Фамилия Email",
      }
      users.push(userModel)

    }
    setUsers(users)

  }

  const [link, setLink] = useState("")

  const [findUserHidden, setFindUserHidden] = useState(true)


  const addUser = () => {
    if (findUserHidden == true) {
      // fetchAllTags()

      setFindUserHidden(false)


    }
    else {
      if (currentUser == null) {
        return;
      }


      ///tbd add user
      setFindUserHidden(true)

    }
  }



  const fetchLink = () => {
    setLink("localhost:5173/invite/plan#" + props.invitationCode)

  }

  useEffect(() => {

    fetchLink()

    addUsers()
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

        <Button text={"Отправить через соц. сети"} onClick={() => null} className={styles.copyButton} />

      </div>

    </div>
  )
}