import React, { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';
import { useSelector, useDispatch } from "react-redux";
import { appSelector, appActions } from "../../redux/appRedux";
import {
    Grid,
    Paper,
    Card,
    CardHeader,
    CardContent,
    Stack,
    TextField,
    Button,
    Checkbox,
    Typography,
} from '@mui/material';

//1°CRUD Todo. Primero Importamos las librerias

//8° Importamos las librerias faltantes


const Todo = () => {

    //2° Esto va de la Mano de las librerias

    const dispatch = useDispatch()
    const todo = useSelector(appSelector.todo)
    //3° Estado local para gestionar el formulario
    const [text, setText] = useState(null)



    //5° La funcion handleChange, para manejar el evento de actualización del input
    const handleChange = (e) => {
        setText(e.target.value)
    }

    //9°las funciones handleChecked que actualiza el atributo completed del elemento de la lista con true o false
    const handleChecked = (e, id) => {
        console.log(e.target.checked)
        dispatch(appActions.setCompletedTodo({ id, completed: e.target.checked }))
    }

    //6° La funcion addTask que agrega la tarea a la lista
    const addTask = async () => {
        dispatch(appActions.addTodo({ text: text, id: uuid() }))
        await setText(prev => '')
    }

    //°10 la función delTask que elimina la tarea de la lista:
    const delTask = async (id) => {
        dispatch(appActions.deleteTodo(id))
    }

    //4° Aqui agregamos las Tarjetas del Formulario. El JSX de la primer tarjeta es el siguiente:
    //La primera Tarjeta: es un TextInput y un botón para agregar nuevas tareas

    //7°La segunda Tarjeta: Va a iterar la lista que asignamos desde el selector a todo. y por cada ítem va a mostrar un checkbox para
    //actualizar las completadas, el nombre de la tarea y un botón para eliminar la tarea de la lista

    //11° Por ulitmo lo que tenmos que hacer es en el checkbox de la tarjeta 2 agregar esto en su linea <Checkbox checked={t.completed} onChange={e => handleChecked(e, t.id)} />

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                    <Card>
                        <CardHeader title="Agrega una tarea" />
                        <CardContent>
                            <Stack sx={{ justifyContent: 'space-around' }} direction='row'>
                                <Grid item md={6}>
                                    <TextField value={text} label="tarea" variant="outlined"
                                        onChange={handleChange} />
                                </Grid>
                                <Grid item md={6}>
                                    <Button variant="contained"
                                        onClick={() => addTask()}>Agregar</Button>
                                </Grid>
                            </Stack>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader title="Tareas" />
                        <CardContent>
                            {todo.map((t, index) =>
                            (
                                <Stack key={t.id} sx={{ justifyContent: 'space-between' }}
                                    direction='row'>
                                    <Grid item md={1}>
                                        <Checkbox checked={t.completed} onChange={e => handleChecked(e, t.id)} />
                                    </Grid>
                                    <Grid item md={9} sx={{ pt: 1 }}>
                                        <Typography sx={{
                                            fontSize: 18,
                                            fontWeight: 700
                                        }}>{t.text}</Typography>
                                    </Grid>
                                    <Grid item md={2}>
                                        <Button variant="contained"
                                            onClick={() => delTask(t.id)}>Eliminar</Button>
                                    </Grid>
                                </Stack>
                            )
                            )}
                        </CardContent>
                    </Card>
                </Paper>
            </Grid>
        </Grid>
    );
};
export default Todo;
