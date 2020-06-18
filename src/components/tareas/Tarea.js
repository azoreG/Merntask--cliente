import React,{useContext} from 'react';
import proyectoContext from "../../context/proyectos/proyectoContext"
import tareaContext from "../../context/tareas/tareaContext"

const Tarea = ({tarea}) => {

     //obtener la funcion del context de tarea
     const tareasContext = useContext(tareaContext);
     const {eliminarTarea,obtenerTareas,actualizarTarea,guardarTareaActual} = tareasContext;

    //Obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;  
    
    //array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    //funcion que se ejecuta cuando el usuario presiona el btn de eliminar tarea
    const tareaEliminar = id => {
        eliminarTarea(id,proyectoActual._id);
        obtenerTareas(proyectoActual.id)
    }

    // funcion que modifica el estado de las tareas
    const cambiarEstado = tarea => {
        tarea.estado = !tarea.estado;
        actualizarTarea(tarea);
    }

    //agrega una tarea actual cuando el usuario desea editarla
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }

    return ( 
        <li className="tarea sombre">
            <p>{tarea.nombre}</p>

            <div className="estado">
                {tarea.estado 
                ?  
                    (
                        <button
                            type="button"
                            className="completo"
                            onClick={()=> cambiarEstado(tarea)}
                        >Completo</button>
                    )
                :
                
                (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={()=> cambiarEstado(tarea)}
                        >Incompleto</button>
                    )
                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarTarea(tarea) }
                >Editar</button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={()=>tareaEliminar(tarea._id)}
                >Eliminar</button>
            </div>
        </li>
     );
}
 
export default Tarea;