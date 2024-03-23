import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "../../features/header/Header";
import padlock from "../../app/assets/padlock.svg"
import logoSmall from "../../app/assets/logoSmall.svg"
import styles from "../Layout.module.css"
import { useDispatch, useSelector } from "react-redux";
import { selectAccess, signIn } from "../../store/authSlice";
import { useEffect } from "react";
import { useCheckAuth } from "../../app/hooks/useCheckAuth";
import { isMobile } from "react-device-detect";
import { Button } from "../../components/button/Button";


export function AdminLayout() {
    const access = useSelector(selectAccess)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (access != "admin" && access != "superadmin") {
            navigate("/user_page")
        }

    }, []);
    useCheckAuth();


    if (!isMobile) {
        return (

            <div>
                <div className={styles.header}>
                    <Header adminHeader={true} />
                </div>
                <Outlet />

            </div>
        )
    } else {
        return (
            <div className={styles.container}>
                <div>
                    <img src={logoSmall} />
                </div>
                <div>
                    <img src={padlock} />

                </div>
                <div className={styles.title}>
                    Функционал администратора доступен только в десктопной версии.

                </div>
                <Button text={"Выход"} onClick={() => {
                    navigate("/")
                    dispatch(signIn({ token: "", access: "", id: "" }))
                }} className={styles.button} />

            </div>
        )
    }

}