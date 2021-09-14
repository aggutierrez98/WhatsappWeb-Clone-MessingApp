import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { activarChat, cargarMensajes } from "../actions/chat"
import { horaMes } from '../helpers/horaMes';
import defaultImage from "../assets/default-user-image.jpg";

export const SidebarChatItem = ({ usuario }) => {

    const { chatActivo, mensajesTotales } = useSelector(state => state.chat)
    const dispatch = useDispatch();

    const { imagen, uid, ultimoMensaje } = usuario
    const { fecha, mensaje, nuevosMensajes } = ultimoMensaje

    // console.log(nuevosMensajes);

    const onClick = async () => {
        dispatch(activarChat(usuario));
        dispatch(cargarMensajes(mensajesTotales, usuario.uid))
    }

    return (
        <div
            className={`chat_list ${(uid === chatActivo) && "active_chat"}`}
            onClick={onClick}
        >
            <div className="chat_people">
                <div className="chat_img">
                    {
                        imagen
                            ? <img className="info-user-img_img" src={imagen} alt="sunil" />
                            : <img className="info-user-img_img" src={defaultImage} alt="sunil" />
                    }

                </div>
                <div className="chat_ib">
                    <div className="chat-arriba">
                        <h5 className="chat_name">{usuario.nombre}</h5>
                        {
                            fecha &&
                            <p className="chat_fecha">{horaMes(fecha)}</p>
                        }
                    </div>
                    <div className="chat_last_message">
                        <p className="chat_mensaje">{mensaje}</p>

                    </div>
                    {
                        nuevosMensajes > 0 &&
                        <span className="chat__notifiy-messages">{nuevosMensajes}</span>
                    }
                </div>

            </div>
        </div>
    )
}
