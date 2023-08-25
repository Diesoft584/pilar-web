import React, { useEffect, useState } from "react";
import {
    Grid,
    Paper,
    Typography,
    Card,
    CardContent,
    CardMedia
} from '@mui/material';
import api from '../../services/api'
import { appActions } from "../../redux/appRedux";
import { useDispatch } from "react-redux";
import { IMG_URL } from "../../constants";

//TP3:14° No olvidar en imortar las librerias faltantes

//3° Importamos en las librerias import api from '../../services/api'

//TP3:17° Agregamos la imagen poke.png = const POKE_IMG = require("../../assets/images/poke.png")

const POKE_IMG = require("../../assets/images/poke.png")

const Fetchlist = () => {

    //TP3:15° Agregar const dispatch = useDispatch()
    //4° Definimos las constantes:

    const dispatch = useDispatch()
    const [pokemons, setPokemons] = useState(null)
    const [next, setNext] = useState("")

    //1°SEGUNDA PARTE PDF3: Primero
    //Entonces creamos un estado pokemons para ir guardando los pokemons que consumimos.

    useEffect(() => {
        getPokemons()
    }, [])


    //2°_Segundo la funcion_De Pokemos es una funcion asincronica:
    //Que realiza una operacion con los get:

    const getPokemons = async () => {
        try {
            dispatch(appActions.loading(true))
            const result = await api.GET(api.pokemons)
            if (result) {
                console.log('poke: ', result)
                setPokemons(result.results)
                setNext(result.next)
            }
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(appActions.loading(false))
        }
    }
    //7° La función getPokemonImgId nos devuelve el id para pasar a la ruta para obtener la imagen
    //correcta para el item. Dicha función la escribimos así:

    const getPokemonImgId = (id) => {
        console.log('long. ' + id.length)
        switch (id.length) {
            case 1:
                return `00${id}`
            case 2:
                return `0${id}`
            default:
                return id
        }
    }

    //8°Ahora solo queda definir la función LoadMore con la cual podemos traer la siguiente tanda
    //de pokemons:
    //Nota_Seguimos:dispatch(appActions.loading(true)) Esto lo tenemos que definir en el redux aparece tp3:9°

    const loadMore = async () => {
        try {
            dispatch(appActions.loading(true))
            const result = await api.GET(next)
            if (result) {
                console.log('poke: ', result.results)
                setPokemons(prev => [...prev, ...result.results])
                setNext(result.next)
            }
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(appActions.loading(false))
        }
    }


    //6° La función renderItem se define:
    const renderItem = (item) => {
        const path = item.url.split('/')
        const imgID = getPokemonImgId(path[6])
        return (
            <Card p={2} sx={{
                display: 'flex', height: 100, cursor: 'pointer',
                '&:hover': { backgroundColor: '#5acdbd', color: 'white' }
            }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        N° {imgID}
                    </Typography>
                    <Typography component="div" variant="h5">
                        {item.name}
                    </Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    sx={{ width: 100 }}
                    src={`${IMG_URL}${imgID}.png`}
                    alt="Live from space album cover"
                />
            </Card>
        )
    }



    //5°Cuando obtenemos el resultado seteamos el estado de pokemons y debemos guardar en un estado la url del siguiente conjunto a buscar - 
    //El JSX de la pagina para renderizar la lista se puede escribir asi: 

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography component="div" variant="h5">
                    Mi Pokedex
                </Typography>
            </Grid>
            {
                pokemons && pokemons.map((p, index) => {
                    return (
                        <Grid item xs={4} key={index}>
                            {renderItem(p)}
                        </Grid>
                    )
                })
            }
            <Grid item xs={4} >
                <Card p={2} sx={{
                    display: 'flex', height: 100, cursor: 'pointer',
                    backgroundColor: '#317b52', '&:hover': { backgroundColor: '#5acdbd' }
                }}
                    onClick={() => loadMore()}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5" sx={{ color: 'white' }}>
                            Cargar Más
                        </Typography>
                    </CardContent>
                    <CardMedia
                        component="img"
                        sx={{ width: 100, p: 2 }}
                        image={POKE_IMG}
                        alt="Live from space album cover"
                    />
                </Card>
            </Grid>
        </Grid >
    );
};

export default Fetchlist;
