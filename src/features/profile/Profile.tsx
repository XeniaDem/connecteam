
import { PlanInfo, Plan } from "./planInfo/PlanInfo"
import styles from "./Profile.module.css"
import { Company, CompanyInfo } from "./companyInfo/CompanyInfo"
import { User, UserInfo } from "./userInfo/UserInfo"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import disableScroll from 'disable-scroll';
import { useSelector } from "react-redux"
import { selectToken } from "../../utils/authSlice"
import { get, readServerError } from "../../utils/api"



export function Profile() {

  const token = useSelector(selectToken)

  const [userInfo, setUserInfo] = useState<User | null>(null)


  const readUserInfo = (message: any) => {
    const messageParsed = JSON.parse(message);
    const userInfo = {
      name: messageParsed.first_name,
      surname: messageParsed.second_name,
      email: messageParsed.email,
      about: messageParsed.description,
      photo: messageParsed.profile_image /////////////

    }
    setUserInfo(userInfo);

  }

  const [companyInfo, setCompanyInfo] = useState<Company | null>(null)


  const readCompanyInfo = (message: any) => {
    const messageParsed = JSON.parse(message);
    const companyInfo = {
      name: messageParsed.company_name,
      website: messageParsed.company_url,
      about: messageParsed.company_info,
      photo: messageParsed.company_logo

    }
    setCompanyInfo(companyInfo);

  }


  const [planInfo, setPlanInfo] = useState<Plan| null>(null)

  const readPlanInfo = (message: any) => {
    if (message == "") {
      setPlanInfo(null)
      return;
    }
    const messageParsed = JSON.parse(message);
    const planInfo = {
      planType: messageParsed.plan_type,
      expiryDate: new Date(messageParsed.expiry_date).toLocaleDateString(),
      planAccess: messageParsed.plan_access,
      status: messageParsed.status

    }
    setPlanInfo(planInfo);


  }

  const fetchPlan = async () => {
    try {

      const response = await get('plans/current', token)
      readPlanInfo(response.text)
      setPlanFetched(true)

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }


  }

  const fetchUserPage = async () => {
    try {
      const response = await get('users/me', token)
      readUserInfo(response.text)
      readCompanyInfo(response.text)
      setUserFetched(true)

    }
    catch (error: any) {
      readServerError(error.response.text)
      console.log("error:", error)
    }


  }







  const [userFetched, setUserFetched] = useState(false)

  const [planFetched, setPlanFetched] = useState(false)


  const onUserChange = () => {
    setUserFetched(!userFetched)

  }
  const onPlanChange = () => {
    setPlanFetched(!planFetched)

  }


  useEffect(() => {
    disableScroll.off();
    fetchUserPage();

  }, [userFetched]);

  useEffect(() => {
    disableScroll.off();
    fetchPlan();

  }, [planFetched]);


  const { state } = useLocation();
  const { targetId } = state || {};

  useEffect(() => {
    const element = document.getElementById(targetId);
    if (element && planInfo) {
      element.scrollIntoView();
    }
  }, [targetId, planInfo]);



  return (
    <div className={styles.container}>

      {userInfo && (<UserInfo savedUser={userInfo} token={token} onChange={onUserChange} />)}

      <div className={styles.divider} />


      {companyInfo && (<CompanyInfo savedCompany={companyInfo} token={token} onChange={onUserChange}/>)}

      <div className={styles.divider} />

      <PlanInfo savedPlan = {planInfo} onChange={onPlanChange} />



    </div>
  )
}
