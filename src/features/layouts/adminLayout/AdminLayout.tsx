import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "../../header/Header";
import styles from "../Layout.module.css"
import { useSelector } from "react-redux";
import { selectAccess, selectToken } from "../../auth/authSlice";
import { useEffect } from "react";
import { useCheckAuth } from "../../../app/hooks/useCheckAuth";




export function AdminLayout() {
    const access = useSelector(selectAccess)
    const navigate = useNavigate()
    useEffect(() => {
        if (access != "admin" && access != "superadmin") {
          navigate("/user_page")
        }
    
      }, []);
    useCheckAuth();


    return (
        <div>
            <div className={styles.header}>
                <Header adminHeader={true} />
            </div>
            <Outlet />

        </div>
    )

}