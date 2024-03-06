import { createSlice } from '@reduxjs/toolkit'

const initialAlertState: AlertState = {
  isVisible: false,
  title: '',
}

const alertSlice = createSlice({
  name: 'alert',
  initialState: initialAlertState,
  reducers: {
    showAlert: (state, action) => {
      return {
        ...state,
        isVisible: true,
        ...action.payload,
      }
    },
    hideAlert: () => {
      return initialAlertState
    },
  },
})

export type AlertState = {
  isVisible: boolean
  title: string
}  

export const { showAlert, hideAlert } = alertSlice.actions
export default alertSlice.reducer