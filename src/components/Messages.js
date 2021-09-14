import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { mensajesVistos } from '../actions/chat'
import { scrollToBottom } from '../helpers/scrollToBottom'
import { IncomingMessage } from './IncomingMessage'
import { MessageProfile } from './MessageProfile'
import { OutgoingMessage } from './OutgoingMessage'
import { SendMessage } from './SendMessage'
import { SinMensajes } from './SinMensajes'

export const Messages = () => {

    const dispatch = useDispatch();
    const { mensajes, chatActivo } = useSelector(state => state.chat)
    const { uid } = useSelector(state => state.usuario)


    useEffect(() => {
        if (mensajes) {
            scrollToBottom("mensajes");
        }

        dispatch(mensajesVistos(chatActivo?.uid))

    }, [mensajes, chatActivo, dispatch]);

    return (

        <div className={`mesgs`}>

            <MessageProfile />

            <div
                id="mensajes"
                className="msg_history"
            >

                {
                    (mensajes.length === 0) &&
                    <SinMensajes />
                }
                {
                    mensajes?.map((msg) => {

                        return (
                            (msg.para === uid)
                                ? <IncomingMessage key={msg._id} msg={msg} />
                                : <OutgoingMessage key={msg._id} msg={msg} />
                        )
                    })
                }

            </div>

            <SendMessage />

        </div>

    )
}
