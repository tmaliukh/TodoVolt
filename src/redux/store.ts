import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import todoListSlice from './todoList'
import alertSlice from './alert'

export const store = configureStore({
  reducer: {
    todos: todoListSlice,
    alerts: alertSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 