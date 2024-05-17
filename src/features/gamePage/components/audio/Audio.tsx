import { useEffect } from "react";
import styles from "./Audio.module.css"
import { selectToken } from "../../../../store/authSlice";
import { useSelector } from "react-redux";
import ZoomMtgEmbedded from "@zoom/meetingsdk/embedded"
import { selectGame } from "../../../../store/gameSlice";



export function Audio() {
  const token = useSelector(selectToken)


  const client = ZoomMtgEmbedded.createClient();

  var authEndpoint = 'http://localhost:4000'
  var sdkKey = 'yzJ9c4h7TO2Iul2EUzA4A'
  var meetingNumber = "123456789"
  var passWord = ''
  var role = 0
  var userName = 'React'
  var userEmail = ''
  var registrantToken = ''
  var zakToken = ''


  const game = useSelector(selectGame)


  const startMeeting = (signature: any) => {

    let meetingSDKElement = document.getElementById('meetingSDKElement') || undefined;

    client.init({ zoomAppRoot: meetingSDKElement, language: 'en-US', patchJsMedia: true }).then(() => {
      client.join({
        signature: signature,
        sdkKey: sdkKey,
        meetingNumber: meetingNumber,
        userName: userName,
        userEmail: userEmail,
      }).then(() => {
        console.log('joined successfully')
      }).catch((error) => {
        console.log(error)
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    console.log(game.meetingJwt)
    game.gameStarted && startMeeting(game.meetingJwt)
  }, []);


  return (
    <div className={styles.container}>
      <div id="meetingSDKElement">
      </div>
    </div>
  )
}