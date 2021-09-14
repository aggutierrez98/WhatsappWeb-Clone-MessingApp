import { combineReducers } from 'redux'
import { authReducer } from './authReducer';
import { chatReducer } from './chatReducer';
import { contactosReducer } from './contactosReducer';
import { usuarioReducer } from './usuarioReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    chat: chatReducer,
    contactos: contactosReducer,
    usuario: usuarioReducer
});
