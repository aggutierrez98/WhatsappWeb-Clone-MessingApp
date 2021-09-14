import { types } from "../types/types";

const initialState = {
    loaded: false,
    mensajesTotales: [],
    ultimosMensajes: [], //Ultimo mensaje con cada usuario
    chatActivo: {}, //UID del usuario al que yo quiero enviar mensajes
    mensajes: [], // El chat seleccionado
}

export const chatReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.activarChat:

            if (state.chatActivo === action.payload) return state;

            return {
                ...state,
                chatActivo: action.payload,
                mensajes: []
            }

        case types.nuevoMensajeUsuario:

            state.mensajesTotales.mensajesPorContacto.forEach((object) => {
                if (object.contacto === action.payload.para) {
                    object.mensajesContacto.push(action.payload)
                    object.ultimoMensaje = {
                        mensaje: action.payload.mensaje,
                        fecha: action.payload.createdAt,
                        contacto: action.payload.para
                    }
                }
            })

            return {
                ...state,
            }

        case types.nuevoMensajeContacto:

            state.mensajesTotales.mensajesPorContacto.forEach((object) => {
                if (object.contacto === action.payload.de) {

                    if (!object.ultimoMensaje.nuevosMensajes) {
                        object.ultimoMensaje.nuevosMensajes = 0;
                    }

                    object.mensajesContacto.push(action.payload)

                    object.ultimoMensaje = {
                        mensaje: action.payload.mensaje,
                        fecha: action.payload.createdAt,
                        contacto: action.payload.de,
                        nuevosMensajes: object.ultimoMensaje.nuevosMensajes
                    }

                    if (action.payload.de !== state.chatActivo.uid) {
                        object.ultimoMensaje.nuevosMensajes = object.ultimoMensaje.nuevosMensajes + 1
                    }
                }
            })

            return {
                ...state,
            }

        case types.mensajesVistos:

            state.mensajesTotales.mensajesPorContacto.forEach((object) => {
                if (object.contacto === action.payload) {
                    object.ultimoMensaje.nuevosMensajes = 0;
                }
            })

            return {
                ...state
            }

        case types.cargarMensajes:

            return {
                ...state,
                mensajes: state.mensajesTotales.mensajesPorContacto.find((mensajesPorContacto) => mensajesPorContacto.contacto === action.payload.id).mensajesContacto
            }

        case types.limpiarMensajes:
            return {
                ...state,
                chatActivo: null,
                mensajes: [],
            }

        case types.cargarUltimosMensajes:

            return {
                ...state,
                ultimosMensajes: state.mensajesTotales.mensajesPorContacto.map((mensajesPorContacto) => mensajesPorContacto.ultimoMensaje),
                loaded: true
            }

        case types.cargarMensajesTotales:
            return {
                ...state,
                mensajesTotales: action.payload,

            }

        case types.descargarChats:
            return {
                loaded: false,
                mensajesTotales: [],
                ultimosMensajes: [],
                chatActivo: {},
                mensajes: [],
            }

        default:
            return state;
    }
}