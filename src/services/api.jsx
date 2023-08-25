import axios from "axios";
import { BASE_URL, IMG_URL } from "../constants";

//TP3:16° Agregar la libreria Axion
//7° Importamos las librerias de capeta Services >index.js

//1°Instalamos en la consola npm install axios

//2° función que devuelva las cabeceras
const headers = () => {
    const headers = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    return headers
}
//3° Luego creamos una funciona para cada metodo

const POST = async (url, payload) => {
    let res = null;
    try {
        res = await axios.post(url, payload, headers());
        return (res && res.data) || null
    } catch (error) {
        throw (error && error.response.data.error) || errorMessage
    }
};


const PATCH = async (url, payload) => {
    let res = null;
    try {
        res = await axios.patch(url, payload, headers());
        return (res && res.data) || null
    } catch (error) {
        throw (error && error.response.data.error) || errorMessage
    }
};


const UPDATE = async (url, payload) => {
    let res = null;
    try {
        res = await axios.update(url, payload, headers());
        return (res && res.data) || null
    } catch (error) {
        throw (error && error.response.data.error) || errorMessage
    }
};


const GET = async (url) => {
    let res = null;
    try {
        res = await axios.get(url, headers());
        return (res && res.data) || null
    } catch (error) {
        throw (error && error.response.data.error) || errorMessage
    }
};


const DELETE = async (url) => {
    let res = null;
    try {
        res = await axios.delete(url, headers());
        return (res && res.data) || null
    } catch (error) {
        throw (error && error.response.data.error) || errorMessage
    }
};

//4°Como los metodo estan con un Try Catch - Para el caso de que exista un error pero no se pueda obtener de la respuesta del servidor
//vamos a definir un mensaje de error para poder manejarlo siempre:

const errorMessage = {
    message: "Error en el servidor",
    name: "serverError",
    statusCode: 500
}

//5°Exportamos todas las funciones por defecto. También debemos agregar las rutas que
//vamos a utilizar al objeto pero por ahora se ve así:

export default {
    POST,
    GET,
    PATCH,
    UPDATE,
    DELETE,
    pokemons: `${BASE_URL}/pokemon`,
}

//8°Entonces como estamos exportando los metodos tambien, vamos a importar las rutas:en el api.js
//pokemons: `${BASE_URL}/pokemon`,

//9°Nos vamos a fecthlist