import React from 'react'
import { useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import { SocketContext } from "../context/SocketContext";
import { useContext } from "react";
import { useDispatch } from 'react-redux';
import { nuevaNotificacion } from '../actions/contactos';
import signoExclamacion from "../assets/signo-de-exclamacion.png";

export const ConfirmacionAgregar = ({ closeModal, usuario }) => {

    const { socket } = useContext(SocketContext);
    const { uid } = useSelector(state => state.usuario)
    const dispatch = useDispatch();

    const agregar = () => {
        closeModal()

        dispatch(nuevaNotificacion(uid, usuario._id, socket))
    }

    return (
        <div>
            <div className="confirmacion-eliminar-contacto_container">
                <img className="confirmacion-eliminar-contacto_imagen" src={signoExclamacion} alt="advertencia" />
                <h3 className="confirmacion-eliminar-contacto_titulo">¿Enviar solicitud de contacto?</h3>
                <div className="confirmacion-eliminar-contacto_botones">
                    <button className="confirmacion-eliminar-contacto_boton confirmar" onClick={agregar}>Confirmar</button>
                    <button className="confirmacion-eliminar-contacto_boton rechazar" onClick={closeModal}>Cancelar</button>

                </div>
            </div>
        </div>
    )
}
