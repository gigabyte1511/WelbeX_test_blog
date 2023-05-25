import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeAccessToken, removeRefreshToken, removeUserID } from '../../redux/slices/userSlice'
import { useQueryClient } from '@tanstack/react-query'
import { GET_ALLPOSTS_QUERY_KEY } from '../PostsAccordion'

export default function SignButton(): JSX.Element {
    const queryClient = useQueryClient()
    const accessToken = useSelector((store) => store.user.accessToken)
    const dispatch = useDispatch()

    const logIn = (): void => {
        navigate('sign')
    }
    const logOut = async (): void => {
        dispatch(removeAccessToken())
        dispatch(removeRefreshToken())
        dispatch(removeUserID())
        localStorage.removeItem('set')
        await queryClient.invalidateQueries([GET_ALLPOSTS_QUERY_KEY])
        navigate('/')
    }

    const navigate = useNavigate()
    return (
        <Button color="inherit" onClick={(accessToken) ? logOut : logIn}>
            {(accessToken) ? 'LOG OUT' : 'LOG IN'}
        </Button >
    )
}
