import React from 'react'
import { useDispatch } from 'react-redux';
import { editarImagen } from '../actions/usuario';
import defaultImage from "../assets/default-user-image.jpg";

export const EditarFoto = ({ imagen, uid }) => {
    const dispatch = useDispatch();

    const handlePictureClick = () => {
        document.querySelector("#fileSelector").click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            dispatch(editarImagen(file, uid));
        }
    }

    return (
        <>
            <input
                id="fileSelector"
                type="file"
                name="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept="image/png,image/jpeg"
            />
            <div className="perfil_contenedor-imagen">
                {
                    imagen
                        ? <img className="perfil_imagen" src={imagen} alt="sunil" />
                        : <img className="perfil_imagen" src={defaultImage} alt="sunil" />
                }
                <div onClick={handlePictureClick} className="perfil_contenedor_seleccionador-archivo"><ion-icon name="image"></ion-icon>Cambiar foto de perfil</div>
            </div>
        </>
    )
}
