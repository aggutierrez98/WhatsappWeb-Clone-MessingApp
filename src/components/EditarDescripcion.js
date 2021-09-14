import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { editarDescripcion } from '../actions/usuario';
import TextareaAutosize from 'react-textarea-autosize';

export const EditarDescripcion = ({ descripcion, uid }) => {
    const dispatch = useDispatch();

    const [editandoDescripcion, setEditarDescripcion] = useState(false);
    const [descripcionUser, setdescripcionUser] = useState(descripcion);

    const onChangeDescripcion = ({ target }) => {
        setdescripcionUser(
            target.value
        )
    }

    const empezarEdicionDescripcion = () => {
        setEditarDescripcion(!editandoDescripcion)
    }

    const terminarEdicionDescripcion = async () => {
        setEditarDescripcion(!editandoDescripcion)
        dispatch(editarDescripcion(descripcionUser, uid));
    }

    return (
        <div className="perfil_contenedor-info">
            <p className="perfil_contenedor-info_titulo">Información</p>
            <div className="perfil_info_contenedor">
                {
                    editandoDescripcion
                        ? <form className="perfil_contenedor-info_formulario" onSubmit={terminarEdicionDescripcion}>
                            <TextareaAutosize type="text" className="perfil_contenedor-info_texto info-input" value={descripcionUser ? descripcionUser : "Sin informacion"} onChange={onChangeDescripcion}></TextareaAutosize>
                        </form>
                        : <p type="text" className="perfil_contenedor-info_texto">{descripcionUser ? descripcionUser : "Sin informacion"}</p>
                }
                {
                    editandoDescripcion
                        ? <button onClick={terminarEdicionDescripcion}><ion-icon name="checkmark"></ion-icon></button>
                        : <button onClick={empezarEdicionDescripcion}><ion-icon name="pencil"></ion-icon> </button>
                }
            </div>
        </div>
    )
}
