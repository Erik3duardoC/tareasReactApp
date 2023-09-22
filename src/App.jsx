//hacer responsova la web, agregar tareas arriba y abajo las tareas y que no aparezca el id con la fecha si no con el numero
import { useEffect, useReducer, useState } from "react"
import { Header } from "./components/Header/Header"
import { Footer } from "./components/Footer/footer"
import { FormularioTareas } from "./components/FormularioTareas/FormularioTareas"
import { Tareas } from "./components/Tareas/Tareas"
import {tareaReducer} from "./reducers/TareaReducer"
import { build } from "vite"

export const App = () => {
    const init =()=>{

        return JSON.parse(localStorage.getItem("tareas")) || []

        // return [
        //     {
        //         id: 1,
        //         descripcion: "Estudiar React",
        //         realizado: false
        //     },
        //     {
        //         id: 2,
        //         descripcion: "Estudiar poo",
        //         realizado: false
        //     },
        //     {
        //         id: 3,
        //         descripcion: "Estudiar apuntes",
        //         realizado: false
        //     }
        // ]
    }
    
const [state, dispatch] = useReducer(tareaReducer, [], init)

const [descripcion, setDescripcion] = useState("");

useEffect(() => {
localStorage.setItem("tareas", JSON.stringify(state))
}, [state]) //depencias


const handlerInputChange = (e) => {
  setDescripcion(e.target.value)
  console.log(descripcion);
}

const handleSubmit = (e) => {
  e.preventDefault();
//   console.log(e);

const tareaNueva  = {
    //id unico
    id: new Date().getTime(),
    descripcion: descripcion,
    realizado: false
}
const action = {
    type: "agregar",
    payload: tareaNueva
    }
    dispatch(action)
    
    setDescripcion("");
}

const handelCambiar = (id) => {
    dispatch({
        type: "cambiar",
        payload: id

    })
}

const handelEliminar = (id) => {
    dispatch({
        type: "borrar",
        payload: id
    })
}

let terminadas = 0;
for (let i = 0; i < state.length; i++) {
    if (state[i].realizado === true) {
        terminadas++;
    }
}

let porcentaje = terminadas / state.length

    // console.log(state);
    // const tareas =["estudiar", "hacer tarea","repasar apuntes","completar apuntes","retomar curso React"]
    return (
      <>
    <Header/>
        <div className="container">
            <div className="row">
                <div className="col-md-4">
        <FormularioTareas 
        descripcion={descripcion}
        handleSubmit={handleSubmit}
        handlerInputChange={handlerInputChange}
        />
                </div>
                <div className="col-md-8">
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                    {
                        state.map((tarea, index) =>{
                            return<Tareas 
                            key={index} 
                            handelCambiar={handelCambiar} 
                            handelEliminar={handelEliminar} 
                            tarea={tarea} 
                            index={index + 1}/> 
                        })
                    }
                    </div>
                </div>
            </div>
        </div>
        <Footer porcentaje={porcentaje} />
    </>
    )
}

// yarn build para produccion 