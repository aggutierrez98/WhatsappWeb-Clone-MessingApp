import React, { useEffect } from 'react';
import { createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cargarMensajesTotales, cargarUltimosMensajes, nuevoMensajeContacto, nuevoMensajeUsuario } from '../actions/chat';
import { scrollToBottomAnimated } from '../helpers/scrollToBottom';
import { useSocket } from '../hooks/useSocket'
import { agregarContactoSincronico, contactoConectado, contactoDesconectado, eliminarContactoSincronico, nuevaNotificacionSincrono } from '../actions/contactos';
import { toast } from 'react-toastify';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {

    const dispatch = useDispatch();

    const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://localhost:8080');
    const { logged } = useSelector(state => state.auth)

    useEffect(() => {
        if (logged) {
            conectarSocket();
        };
    }, [logged, conectarSocket]);

    useEffect(() => {
        if (!logged) {
            desconectarSocket();
        };
    }, [logged, desconectarSocket]);

    useEffect(() => {

        socket?.on("usuario-conectado", (id) => {
            dispatch(contactoConectado(id))
        })

        socket?.on("usuario-desconectado", (id) => {
            dispatch(contactoDesconectado(id))
        })

        socket?.on("cargar-mensajes", (mensajesPorContacto) => {
            dispatch(cargarMensajesTotales(mensajesPorContacto))
            dispatch(cargarUltimosMensajes())
        })

        socket?.on("mensaje-personal", (mensaje) => {
            dispatch(nuevoMensajeContacto(mensaje));
            dispatch(cargarUltimosMensajes())
        })

        socket?.on("mensaje-usuario", (mensaje) => {
            dispatch(nuevoMensajeUsuario(mensaje))
            dispatch(cargarUltimosMensajes())
            scrollToBottomAnimated("mensajes");
        })

        socket?.on("envio-solicitud", (notificacion) => {

            // console.log("nueva solicitud");

            dispatch(nuevaNotificacionSincrono(notificacion))
            toast.info("Nueva solicitud de contacto", { containerId: 'A' });
        })

        socket?.on("solicitud-aceptada", (contacto) => {

            dispatch(agregarContactoSincronico(contacto))
            toast.success(`Contacto ${contacto.nombre} agregado`, { containerId: 'A' })
        })

        socket?.on("solicitud-rechazada", (contacto) => {

            // console.log("solicitud rechazada")

            toast.error(`El contacto ${contacto.nombre} te ha rechazado`, { containerId: 'A' })
        })

        socket?.on("contacto-eliminado", ({ nombre, uid }) => {

            dispatch(eliminarContactoSincronico(uid))
            toast.error(`El contacto ${nombre} te ha eliminado`, { containerId: 'A' })
        })

    }, [dispatch, socket]);

    return (
        <SocketContext.Provider value={{ socket, online }}>
            {children}
        </SocketContext.Provider>
    )
}