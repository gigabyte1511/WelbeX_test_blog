import { useMutation } from '@tanstack/react-query'
import { refresh } from '../API/api'
import { useDispatch, useSelector } from 'react-redux'
import { removeAccessToken, removeRefreshToken, removeUserID, setAccessToken, setRefreshToken, setUserID } from '../redux/slices/userSlice'
import { Navigate } from 'react-router-dom'

export function useTokenRefresh(mutatePropFn, formData) {
  const dispatch = useDispatch()
  const refreshToken = useSelector((store) => store.user.refreshToken)
  const accessToken = useSelector((store) => store.user.accessToken)

  const { mutate } = useMutation({
    mutationFn: refresh,
    onSuccess: (data) => {
      console.log('useTokenRefresh - Success refresh', data)
      dispatch(setAccessToken(data.accessToken))
      dispatch(setRefreshToken(data.refreshToken))
      mutatePropFn({ ...formData, accessToken })
    },
    onError: (error) => {
      console.log('useTokenRefresh - Error refresh', error)
      dispatch(removeAccessToken())
      dispatch(removeRefreshToken())
      dispatch(removeUserID())
    }
  })

  const doRefreshToken = (): void => {
    console.log('doRefreshTokenFn')
    mutate(refreshToken)
  }

  return doRefreshToken
}
