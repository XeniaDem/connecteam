import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "../../header/Header";
import styles from "../Layout.module.css"
import { useCheckAuth } from "../../../app/hooks/useCheckAuth";
import { useSelector } from "react-redux";
import { selectAccess } from "../../auth/authSlice";
import { useEffect } from "react";




export function UserLayout() {
    const access = useSelector(selectAccess)
    const navigate = useNavigate()
    useEffect(() => {
        if (access != "user") {
          navigate("/admin")
        }
    
      }, []);

    useCheckAuth();


    return (
        <div>
            <div className={styles.header}>
                <Header loggedHeader={true}/> 
            </div>
            <Outlet />

        </div>
    )

}