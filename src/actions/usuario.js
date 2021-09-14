import { toast } from "react-toastify";
import { fetchConToken, fetchImagen } from "../helpers/fetch";
import { types } from "../types/types";

export const cargarDatos = (usuario) => ({
    type: types.cargarDatos,
    payload: usuario
})

export const descargarDatos = () => ({
    type: types.descargarDatos
})

export const editarNombre = (nombre, uid) => {

    return async (dispatch) => {

        const promise = fetchConToken(`login/edit/${uid}`, { nombre }, "PUT").then(() => {
            dispatch(editarNombreSincronico(nombre));
        }).catch(() => {
            throw new Error("Error al cambiar el nombre")
        });

        toast.promise(
            promise,
            {
                containerId: 'A',
                pending: 'Cargando...',
                success: 'Nombre cambiado',
                error: 'Fallo al cambiar nombre'
            }
        )

    }
}

const editarNombreSincronico = (nombre) => ({
    type: types.editarNombre,
    payload: nombre,
})

export const editarDescripcion = (descripcion, uid) => {

    return async (dispatch) => {

        const promise = fetchConToken(`login/edit/${uid}`, { descripcion }, "PUT").then(() => {
            dispatch(editarDescripcionSincronico(descripcion));
        }).catch(() => {
            throw new Error("Error al cambiar la descripcion")
        });

        toast.promise(
            promise,
            {
                containerId: 'A',
                pending: 'Cargando...',
                success: 'Informacion cambiada correctamente',
                error: 'Fallo al cambiar informacion'
            }
        )

    }
}

const editarDescripcionSincronico = (descripcion) => ({
    type: types.editarDescripcion,
    payload: descripcion,
})


export const editarImagen = (file, uid) => {

    return async (dispatch) => {

        const promise = fetchImagen(`login/edit/${uid}`, file, "PUT")
            .then(({ imagen }) => {
                dispatch(editarImagenSincronico(imagen));
            }).catch(() => {
                throw new Error("Error al cambiar la imagen")
            });

        toast.promise(
            promise,
            {
                containerId: 'A',
                pending: 'Cargando...',
                success: 'Imagen cambiada correctamente',
                error: 'Fallo al cambiar imagen'
            }
        )
    }
}

const editarImagenSincronico = (imagen) => ({
    type: types.editarImagen,
    payload: imagen,
})

