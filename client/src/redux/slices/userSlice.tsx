import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getInitialState } from '../initialStore'

const userSlice = createSlice({
    name: 'user',
    initialState: { accessToken: getInitialState().user.accessToken, refreshToken: getInitialState().user.refreshToken, id: getInitialState().user.id },
    reducers: {
        setAccessToken: (state, action: PayloadAction<string>) => ({ ...state, accessToken: action.payload }),
        removeAccessToken: (state) => ({ ...state, accessToken: '' }),
        setRefreshToken: (state, action: PayloadAction<string>) => ({ ...state, refreshToken: action.payload }),
        removeRefreshToken: (state) => ({ ...state, refreshToken: '' }),
        setUserID: (state, action: PayloadAction<string>) => ({ ...state, id: action.payload }),
        removeUserID: (state) => ({ ...state, id: '' })

    }
})
export const { setAccessToken, removeAccessToken, setRefreshToken, removeRefreshToken, setUserID, removeUserID } = userSlice.actions
export const userReducer = userSlice.reducer
