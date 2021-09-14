import React from 'react'
import { useDispatch } from 'react-redux'
import { SocketContext } from "../context/SocketContext";
import { useContext } from "react";
import { useSelector } from 'react-redux';
import { eliminarContacto } from '../actions/contactos';
import signoExclamacion from "../assets/signo-de-exclamacion.png";

export const ConfirmacionEliminar = ({ closeModal, uid: id }) => {

    const dispatch = useDispatch();
    const { socket } = useContext(SocketContext);
    const { uid } = useSelector(state => state.usuario)

    const eliminar = () => {
        closeModal()
        dispatch(eliminarContacto(id, uid, socket))
    }

    return (
        <div>
            <div className="confirmacion-eliminar-contacto_container">
                <img className="confirmacion-eliminar-contacto_imagen" src={signoExclamacion} alt="advertencia" />
                <h3 className="confirmacion-eliminar-contacto_titulo">¿Seguro desea elminar el contacto?</h3>
                <div className="confirmacion-eliminar-contacto_botones">
                    <button className="confirmacion-eliminar-contacto_boton confirmar" onClick={eliminar}>Confirmar</button>
                    <button className="confirmacion-eliminar-contacto_boton rechazar" onClick={closeModal}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}
