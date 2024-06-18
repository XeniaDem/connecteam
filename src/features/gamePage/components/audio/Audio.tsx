import { useEffect } from "react";
import styles from "./Audio.module.css"
import { selectToken } from "../../../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import ZoomMtgEmbedded from "@zoom/meetingsdk/embedded"
import { selectGame } from "../../../../store/gameSlice";


type Props = {
  client: any;
}
export function Audio(props: Props) {



  const game = useSelector(selectGame)
  
  var sdkKey = 'Bv7dsnepT0aTsPILubxBZQ'
  var meetingNumber = game.meetingNumber
  var passWord = game.meetingPasscode
  var userName = game.playerName






  const startMeeting = (signature: any) => {
    var info = props.client.getCurrentMeetingInfo()
    console.log(info)
    if (info.isInMeeting) {
      return;
    }
    let meetingSDKElement = document.getElementById('meetingSDKElement') || undefined;

    props.client.init({ zoomAppRoot: meetingSDKElement, language: 'en-US', patchJsMedia: true }).then(() => {
      props.client.join({
        signature: signature,
        sdkKey: sdkKey,
        meetingNumber: meetingNumber,
        userName: userName,
        password: passWord
      }).then(() => {
        console.log('joined successfully')
      }).catch((error: any) => {
        console.log(error)
      })
    }).catch((error: any) => {
      console.log(error)
    })
  }

  useEffect(() => {
    console.log(game.meetingJwt)
    console.log(game.meetingNumber)
    console.log(game.meetingPasscode)

    game.gameStarted && startMeeting(game.meetingJwt)

  }, []);


  return (
      <div id="meetingSDKElement" />
  )
}