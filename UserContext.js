import React from 'react';
//import { Navigate } from 'react-router';
import firebase from './utils/firebaseUtils'



export const UserContext = React.createContext();

export const UserStore = ({children})=> {
  const [data,setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading,setLoading] = React.useState(false);
  const [error,setError] = React.useState(null);
 // const navigate = useNavigate();

/*  const userLogout = React.useEffect (
    //async
    function (){
    setData(null)
    //setError(null)
    setLoading(false)
    setLogin(false)
    window.localStorage.removeItem('token')
   // navigate('/login')

  }, [])
*/

function userLogout (){
  firebase.auth().signOut().then(() => {
    setData(null)
    setError(null)
    setLoading(false)
    setLogin(false)
    //window.localStorage.removeItem('token')
    // Sign-out successful.
    

  }).catch((error) => {
    // An error happened.
        var errorCode = error.code;
        var errorMessage = error.message;
        setError(errorCode + " - " + errorMessage)
        setLoading(false)
        setData(null);
        setLogin(false);
  });    
  //return <Navigate to='/Login' />
 // navigate('/login')
}
 
  React.useEffect(() => {
    //async
    function autoLogin(){
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setError(null)
          setLogin(true)
         // window.localStorage.setItem('token',user.uid)
          setData({username:  user.email});          
        } else {
          setLogin(false)
          setError(null)
          setData(null);

          // User is signed out
          userLogout();
        }
      });
    }
    autoLogin();
  } , [])

  async function userLogin(username, password){
      setLoading(true)
      setError(null)
      try {
        const userCrendicials = await firebase.auth().signInWithEmailAndPassword(username, password);
        //setData({username:  userCrendicials.user.email});
        window.localStorage.setItem('token',userCrendicials.user.uid )
        //console.log(userCrendicials.user.uid)
        setLoading(false)
        setLogin(true);
      }
      catch(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        setError(errorCode + " - " + errorMessage)
        setLoading(false)
        setData(null);
        setLogin(false);
      }    
   // navigate('/entrada')
  }

  return <UserContext.Provider value={{userLogin, data, userLogout, loading, login, error}}> {children} </UserContext.Provider> 

}