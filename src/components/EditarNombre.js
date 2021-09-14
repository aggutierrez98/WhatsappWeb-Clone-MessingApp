import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { editarNombre } from '../actions/usuario';
import TextareaAutosize from 'react-textarea-autosize';

export const EditarNombre = ({ nombre, uid }) => {

    // autosize(document.getElementById("note"));

    const dispatch = useDispatch();

    const [editandoNombre, setEditandoNombre] = useState(false);
    const [nombreUser, setNombreUser] = useState(nombre);

    const onChangeNombre = ({ target }) => {
        setNombreUser(
            target.value
        )
    }

    const empezarEdicionNombre = () => {
        setEditandoNombre(!editandoNombre)
    }

    const terminarEdicionNombre = (e) => {
        e.preventDefault()
        setEditandoNombre(!editandoNombre)
        dispatch(editarNombre(nombreUser, uid));
    }

    return (
        <div className="perfil_contenedor-info">
            <p className="perfil_contenedor-info_titulo" >Tu nombre</p>
            <div className="perfil_info_contenedor">
                {
                    editandoNombre
                        ?
                        <form className="perfil_contenedor-info_formulario" onSubmit={terminarEdicionNombre}>
                            <TextareaAutosize type="text" className=" info-input" value={nombreUser} onChange={onChangeNombre}></TextareaAutosize>
                        </form>

                        : <p className="perfil_contenedor-info_texto">{nombreUser}</p>
                }
                {
                    editandoNombre
                        ? <button onClick={terminarEdicionNombre}><ion-icon name="checkmark"></ion-icon></button>
                        : <button onClick={empezarEdicionNombre}><ion-icon name="pencil"></ion-icon> </button>
                }
            </div>
        </div>
    )
}
