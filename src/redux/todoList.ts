import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialStateValue: TodoList = {
  todoList: [],
  todoFilter: 'all'
}

const todoListSlice = createSlice({
  name: 'todoListSlice',
  initialState: initialStateValue,
  reducers: {
    removeAll: () => {
      return initialStateValue
    },
    addTodo: (state, action) => {
      const newItem: TodoItem = {
        id: uuidv4(),
        title: action.payload,
        checked: false,
        editing: false,
      }

      state.todoList.push(newItem)

      // return {
      //   ...state,
      //   todoList: [...state.todoList, newItem],
      // }
    },
    deleteTodo: (state, action) => {
      const newTodo = state.todoList.filter(
        (item) => item.id !== action.payload
      )

      state.todoList = newTodo
    },
    editTodoTitle: (state, action) => {
      return {
        ...state,
        todoList: state.todoList.map((todo) => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              editing: !todo.editing,
              title: action.payload.title,
            }
          }
          return todo
        }),
      }
    },
    toggleEdit: (state, action) => {
      return {
        ...state,
        todoList: state.todoList.map((todo) => {
          if (todo.id === action.payload) {
            return { ...todo, editing: !todo.editing }
          }
          return { ...todo, editing: false }
        }),
      }
    },
    checkTodo: (state, action) => {
      return {
        ...state,
        todoList: state.todoList.map((todo) => {
          if (todo.id === action.payload) {
            return { ...todo, checked: !todo.checked }
          }
          return todo
        }),
      }
    },
    filterChecked: (state, action) => {
      state.todoFilter = action.payload
    },
  }
})

export type TodoList = {
  todoList: TodoItem[]
  todoFilter: string
}

export type TodoId = typeof uuidv4

export type TodoItem = {
  id: string
  title: string
  checked: boolean
  editing: boolean

}

export const {
  removeAll,
  addTodo,
  deleteTodo,
  editTodoTitle,
  checkTodo,
  toggleEdit,
  filterChecked,
} = todoListSlice.actions
export default todoListSlice.reducer
