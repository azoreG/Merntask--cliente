import React, {useContext, useState, useEffect} from 'react';
import proyectoContext from "../../context/proyectos/proyectoContext"
import tareaContext from "../../context/tareas/tareaContext"

const FormTarea = () => {
    
    //Extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

     //obtener la funcion del context de tarea
     const tareasContext = useContext(tareaContext);
     const {tareaseleccionada,errortarea,agregarTarea,validarTarea,obtenerTareas,actualizarTarea,limpiarTarea} = tareasContext;

     //effect que detecta si hay una tarea seleccionada
     useEffect(() => {
        if (tareaseleccionada !== null) {
            guardarTarea(tareaseleccionada);
        }  else {
            guardarTarea({
                nombre: ""
             })
        }
     }, [tareaseleccionada])

     //State del formulario

     const [tarea, guardarTarea] = useState({
        nombre: ""
     })

     const {nombre} = tarea;

     //Si no hay proyecto seleccionado
     if(!proyecto) return null;

     //array destructuring para extraer el proyecto actual
     const [proyectoActual] = proyecto;

    //Leer los valores del formulario

    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        //validar
        if (nombre.trim() === "") {
            validarTarea();
            return;
        }

        //revisar si es edicion o nueva tarea
        if (tareaseleccionada === null) {
            //tarea nueva
            //agregar una nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        } else {
            // actualizar tarea existente
            actualizarTarea(tarea);

            //elimina tarea seleccionada del state
            limpiarTarea();
        }

        

        //obtener y filtrar tareas del proyecto actual
        obtenerTareas(proyectoActual._id)

        //reiniciar el form
        guardarTarea({nombre:""})
    }

    return ( 
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre tarea ..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ?  "Editar tarea" : "Agregar tarea"}
                    />
                </div>
            </form>
            {errortarea && <p className="mensaje error">El nombre de la tarea es obligatorio</p>}
        </div>
     );
}
 
export default FormTarea;