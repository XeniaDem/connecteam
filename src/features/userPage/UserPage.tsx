
import request from "superagent"
import styles from "./UserPage.module.css"
import { LastGames } from "./lastGames/LastGames"
import { PackageInfo } from "./packageInfo/PackageInfo"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"



export function UserPage() {

  const { state } = useLocation();
  const { token } = state;
  // alert("token on page:" + token)


  const [fetched, setFetched] = useState(false);




  const [access, setAccess] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [id, setId] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const readAnswer = (message: any) => {
    var messageParsed = JSON.parse(message);

    var access = messageParsed.access;
    setAccess(access);
    var companyName = messageParsed.comppany_name; //////////
    setCompanyName(companyName)
    var name = messageParsed.first_name
    setName(name)
    var surname = messageParsed.second_name
    setSurname(surname)
    var id = messageParsed.id
    setId(id)
    var image = messageParsed.image
    setImage(image)
    var email = messageParsed.email
    setEmail(email)
    var phone = messageParsed.phone_number
    setPhone(phone)


    alert("data: " + "\n access: " + access + "\n company: " + companyName +
      "\n name: " + name + " \n surname: " + surname +
      "\n id: " + id + "\n image: " + image + "\n email: " + email + "\n phone: " + phone)

    setFetched(true)

  }


  const [withPackage, setWithPackage] = useState(false);

  const [basicActive, setBasicActive] = useState(false);
  const [advancedActive, setAdvancedActive] = useState(false);
  const [premiumActive, setPremiumActive] = useState(false);



  const readAccess = (message: any) => {

    if (access == "user") {
      setWithPackage(false)
      setBasicActive(false);
      setAdvancedActive(false);
      setPremiumActive(false);

    }
    if (access == "basic") {
      setWithPackage(true)
      setBasicActive(true);
      setAdvancedActive(false);
      setPremiumActive(false);
    }
    if (access == "advanced") {
      setWithPackage(true)
      setBasicActive(false);
      setAdvancedActive(true);
      setPremiumActive(false);
    }
    if (access == "premium") {
      setWithPackage(true)
      setBasicActive(false);
      setAdvancedActive(false);
      setPremiumActive(true);
    }

  }






  const fetchUserPage = async () => {

    if (fetched) {
      alert("data already fetched");
      return;
    }

    const data = {

    }
    try {

      const response = await request.get('http://localhost:5432/user/me')
        .set('Access-Control-Allow-Origin', '*')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send()
        .then(

          response => readAnswer(response.text)

        )
        .catch(error => {
          alert(error.response.text)
          // alert(registrationError)
          throw new Error;

        })
      setFetched(true);




      // if (response.ok) {
      //   const jsonContent = await response.body;
      //   console.log(jsonContent);
      // } else {
      //   alert("ndnbdnd")

      //   const textContent = response.text;
      //   alert(textContent)
      //   console.log("textContent", textContent);

      // }


    }
    catch (error: any) {

      // alert(error.text)
      console.log("error:", error)
    }


  }
  useEffect(() => {
    fetchUserPage();

    alert("loaded");
  }, []);



  return (

    <div className={styles.container}>
      <PackageInfo name = {name} withPackage = {withPackage} basicActive = {basicActive} advancedActive = {advancedActive} premiumActive = {premiumActive}/>
      <LastGames />

    </div>
  )
}
