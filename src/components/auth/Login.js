import React, {useState,useContext,useEffect} from 'react';
import {Link} from "react-router-dom"
import AlertaContext from "../../context/alertas/alertaContext"
import AuthContext from "../../context/autentificacion/authContext"

const Login = (props) => {

    //extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const {alerta,mostrarAlerta} = alertaContext;

    //extraer los valores del context
    const authContext = useContext(AuthContext);
    const {mensaje,autenticado,iniciarSesion} = authContext;

    //En caso de que el password o usuario no exista
    useEffect(() => {
        if (autenticado) {
            props.history.push("/proyectos");
        }
 
        if (mensaje) {
         mostrarAlerta(mensaje.msg,mensaje.categoria)
        }
        //eslint-disable-next-line
     }, [mensaje,autenticado,props.history])

    //State para iniciar sesion
    const [usuario,guardarUsuario] = useState({
        email : "",
        password: ""
    });

    //extraer de usuario
    const {email,password} = usuario;

    const OnChange = (e) => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    //cuando el usuario quiere iniciar sesión
    const onSubmit = (e) => {
        e.preventDefault();

        //validar que no haya campos vacios

        if(email.trim() === "" || password.trim() === "") {
            mostrarAlerta("Todos los campos son obligatorios","alerta-error");
        }

        //Pasarlo al action
        iniciarSesion({email,password});
    }

    return ( 
        <div className="form-usuario">
        {alerta && (<div className={`alerta ${alerta.categoria}`}>
                {alerta.msg}
            </div>)}
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar sesión</h1>
                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu email"
                            value={email}
                            onChange={OnChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu password"
                            value={password}
                            onChange={OnChange}
                        />
                    </div>

                    <div className="campo-form">
                       <input 
                           type="submit"
                           className="btn btn-primario btn-block"
                           value="Iniciar Sesión"
                       />
                    </div>

                </form>
                <Link to="/nueva-cuenta" className="enlace-cuenta">Obtener cuenta</Link>
            </div>
        </div>
     );
}
 
export default Login;