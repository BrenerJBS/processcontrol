import React from 'react'
import { UserContext } from '../../UserContext';
import AuditorHeader from './AuditorHeader';
import './header.css'
import LogOffHeader from './LogOffHeader';
import {database} from '../../utils/firebaseUtils'
import {snapshotToArray} from '../Helper/SnaptoArray'
import {nomeAuditor} from '../Helper/Auditor'


function Header() {
        const [botaoLogin, setBotaoLogin] = React.useState(null);
        const [logon, setLogon] = React.useState(true);
        const {data, userLogout} = React.useContext(UserContext);

        const [auditores, setAuditores] = React.useState(null);

        

        React.useEffect(()=> {
            const auditoresRef = database.ref('lista_auditores');
            auditoresRef.once('value', (snapshot) => {
            setAuditores(snapshotToArray(snapshot));     
        });
        },[])


        React.useEffect(() => {
            setLogon(true)            
        }        
        ,[]);
       
        React.useEffect(() => {
            if (logon) {
                setBotaoLogin("Sair")
            }  else {
                setBotaoLogin("Faça Login")
            }     
        }        
        ,[logon]);
        


        return (
         <header id="main-header">
                <div className="header-content">
                
              
                {data ? <AuditorHeader username={nomeAuditor(window.localStorage.getItem('token'), auditores)} userLogout={userLogout} botaoLogin={botaoLogin}/> : <LogOffHeader />}


            </div>

                
                
           
            </header>);
 



    
}

/*
class Header extends Component{

    
    render(){
        return (
        <header id="main-header">
                <div className="header-content">
                <Link to="/">
                Controle de Processos SRI
                </Link>
                <Link to="/login">
                Entrar
                </Link>
             </div>
            </header>
        );
    }


}
*/
export default Header;
