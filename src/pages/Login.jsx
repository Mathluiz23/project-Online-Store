import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import "../style/Login.css";

function Login() {
  const [login, setlogin] = useState('');
  const [password, setPassword] = useState('');
  const [surName, setSurName] = useState();
  const navigate = useNavigate();
  
  

  function handleClick() {
    localStorage.setItem('user',JSON.stringify({surName:surName,login:login}))
    navigate(-1);
  }

  const isValidEmail = login.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
  const minLength = 6;

  return(
      <>
        <div className="header-login"></div>
        <div className="container-login">
          <div className="box-login">
          <label htmlFor="surName">
            Apelido:
            <input type="text" id="surName" value={surName} onChange={ (e)=> setSurName(e.target.value)} />
          </label>
          <label htmlFor="login">
            Email:
            <input type="text" id="login" placeholder="Ex. josedeoliveira@gmail.com" value={login} onChange={ (e)=> setlogin(e.target.value)} />
          </label>
          <label htmlFor="password">
            Senha:
            <input type="password" id="password" value={password} onChange={ (e)=> setPassword(e.target.value)} />
          </label>
          <button type="button" disabled={password.length < minLength || !isValidEmail}  onClick={ handleClick }>Logar</button>
          </div>
        </div>
      </>
  )
}

export default Login;