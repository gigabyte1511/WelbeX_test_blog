import { Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeAccessToken, removeRefreshToken, removeUserID } from '../../redux/slices/userSlice'
import { useQueryClient } from '@tanstack/react-query'
import { GET_ALLPOSTS_QUERY_KEY } from '../PostsAccordion'
import { type ReduxState } from '../../redux/initialStore'

export default function SignButton(): JSX.Element {
    const queryClient = useQueryClient()
    const accessToken = useSelector((store: ReduxState) => store.user.accessToken)
    const dispatch = useDispatch()

    const logInLabel = <Typography variant='h6'>Log Out</Typography>
    const logOutLabel = <Typography variant='h6'>Log In</Typography>

    const logIn = (): void => {
        navigate('sign')
    }
    const logOut = async (): Promise<void> => {
        dispatch(removeAccessToken())
        dispatch(removeRefreshToken())
        dispatch(removeUserID())
        localStorage.removeItem('set')
        await queryClient.invalidateQueries([GET_ALLPOSTS_QUERY_KEY])
        navigate('/')
    }

    const navigate = useNavigate()
    return (
        <Button variant="outlined" color="inherit" onClick={(accessToken) ? logOut : logIn}>
            {(accessToken) ? logInLabel : logOutLabel}
        </Button >
    )
}
