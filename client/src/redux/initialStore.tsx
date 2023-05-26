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
    const localStorageState = localStorage.getItem('state')
    if (localStorageState !== null) {
        const { user } = JSON.parse(localStorageState) as ReduxState
        initialState.user.accessToken = user.accessToken
        initialState.user.refreshToken = user.refreshToken
        initialState.user.id = user.id
    }

    return initialState
}
