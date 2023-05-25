import { type Store, configureStore } from '@reduxjs/toolkit'
import { userReducer } from './slices/userSlice'
import { type ReduxState } from './initialStore'

export const store: Store<ReduxState> = configureStore({
    reducer: {
        user: userReducer
    }
})
store.subscribe(() => {
    localStorage.setItem('state', JSON.stringify(store.getState()))
})
