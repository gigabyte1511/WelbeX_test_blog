import { type CombinedState } from '@reduxjs/toolkit'

export interface ReduxState extends CombinedState<{
    user: {
        accessToken: string
        refreshToken: string
        id: string
    }
}> { }

export function getInitialState(): ReduxState {
    const initialState = {
        user: {
            accessToken: '',
            refreshToken: '',
            id: ''
        }
    }
    if (localStorage.getItem('state') !== null) {
        const { user } = JSON.parse(localStorage.getItem('state')) as ReduxState
        initialState.user.accessToken = user.accessToken
        initialState.user.refreshToken = user.refreshToken
        initialState.user.id = user.id
    }

    return initialState
}
