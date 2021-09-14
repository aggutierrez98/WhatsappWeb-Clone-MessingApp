import { types } from "../types/types";

const intialState = {
    uid: null,
    name: null,
    email: null,
    description: "",
    imagen: null,
};

export const usuarioReducer = (state = intialState, { payload, type }) => {

    switch (type) {

        case types.cargarDatos:

            const usuario = payload;

            return {
                uid: usuario.uid,
                name: usuario.nombre,
                email: usuario.email,
                descripcion: usuario.descripcion,
                imagen: usuario.imagen,
            };

        case types.descargarDatos:

            return {
                uid: null,
                name: null,
                email: null,
                description: null,
                imagen: null
            };

        case types.editarNombre:
            return {
                ...state,
                name: payload
            };

        case types.editarDescripcion:
            return {
                ...state,
                descripcion: payload
            };

        case types.editarImagen:
            return {
                ...state,
                imagen: payload
            };

        default:
            return state;
    }
}