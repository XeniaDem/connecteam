
import { useEffect, useState } from "react";
import { Button } from "../../../../components/button/Button"
import styles from "./Audio.module.css"
import { selectToken } from "../../../../store/authSlice";
import { useSelector } from "react-redux";
import { get, readServerError } from "../../../../utils/api";
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import { IconButton } from "@mui/material";
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';




export function Audio() {
  const token = useSelector(selectToken)

  useEffect(() => {


  }, []);

  const [onCall, setOnCall] = useState(false)

  const [muted, setMuted] = useState(false)

  const [silent, setSilent] = useState(false)


  const handleCall = () => {
    if (!onCall) {
      // tbd enter call
      setOnCall(true)
    } else {
      // tbd leave call
      setOnCall(false)
    }

  }

  const muteControl = () => {
    if (!muted) {
      // tbd mute
      setMuted(true)
    } else {
      // tbd unmute
      setMuted(false)
    }

  }
  const soundControl = () => {
    if (!silent) {
      // tbd turn off sound
      setSilent(true)
    } else {
      // tbd turn on sound
      setSilent(false)
    }

  }




  return (
    <div className={styles.container}>
      <IconButton onClick={handleCall}>
        <svg width={0} height={0}>
          <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
            <stop offset={0} stopColor="#55C6F7" />
            <stop offset={1} stopColor="#2AF8BA" />
          </linearGradient>
        </svg>
        {!onCall ?
          <div className={styles.buttonContainer}>
            <AddIcCallIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />
            Выйти в эфир
          </div>
          :
          <div className={styles.buttonContainer}>
            <PhoneDisabledIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />
            Выйти из эфира
          </div>

        }
      </IconButton>

      {onCall ?
        <div>
          <IconButton onClick={muteControl}>
            {!muted ?
              <div className={styles.buttonContainer}>
                <MicIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />
                Выключить микрофон
              </div>
              :
              <div className={styles.buttonContainer}>
                <MicOffIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />
                Включить микрофон
              </div>
            }
          </IconButton>

          <IconButton onClick={soundControl}>
            {!silent ?
              <div className={styles.buttonContainer}>
                <VolumeUpIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />
                Выключить звук
              </div>
              :
              <div className={styles.buttonContainer}>
                <VolumeOffIcon fontSize="large" sx={{ fill: "url(#linearColors)" }} />
                Включить звук
              </div>
            }
          </IconButton>
        </div>
        :
        null
      }



    </div>


  )
}