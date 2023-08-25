const ADD_TODO = "ADD_TODO";
const COMPLETE_TODO = "COMPLETE_TODO";
const DELETE_TODO = "DELETE_TODO";
const SET_LOADING = "SET_LOADING";

//TP3:12° Agregamos librerias :const SET_LOADING = "SET_LOADING";

//1° Hasta aca definimos el valor inicial de las variables a las que queremos acceder
const stateInitial = {
  todo: [],
  loading: false,
};

//TP3:9° Agregamos  loading: false, Arriba

//2° Luego debemos definir un selector

export const appSelector = {
  todo: (state) => state.todo,
  loading: (state) => state.loading,
};

//TP3:10° Agregamos  loading: (state) => state.loading, Arriba

//3° Lo siguiente son las action.

export const appActions = {
  addTodo: (payload) => ({
    type: ADD_TODO,
    payload,
  }),
  setCompletedTodo: (payload) => ({
    type: COMPLETE_TODO,
    payload,
  }),
  deleteTodo: (id) => ({
    type: DELETE_TODO,
    id,
  }),
  loading: (value) => ({
    type: SET_LOADING,
    value,
  }),
};
//TP3:11° Agregamos  loading: (value) y lo sigue. Arriba

//4°_Definimos los reducers

export const appReducer = (state = stateInitial, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todo: [
          ...state.todo,
          {
            id: action.payload.id,
            text: action.payload.text,
            completed: false,
          },
        ],
      };
    case COMPLETE_TODO:
      return {
        ...state,
        todo: state.todo.map((t) => {
          if (t.id === action.payload.id) {
            return {
              ...t,
              completed: action.payload.completed,
            };
          }
          return t;
        }),
      };
    case DELETE_TODO:
      return {
        ...state,
        todo: state.todo.filter((t) => t.id !== action.id),
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.value,
      };
    default:
      return state;
  }
};

//TP3:13° Agregamos case SET_LOADING: y lo sigue. Arriba
