import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectToken } from "../../features/auth/authSlice";
import { useEffect } from "react";

export const useCheckAuth = () => {
    const navigate = useNavigate()
    const token = useSelector(selectToken)
  
  
    useEffect(() => {
      if (token == "") {
        navigate("/")
      }
  
    }, []);

}