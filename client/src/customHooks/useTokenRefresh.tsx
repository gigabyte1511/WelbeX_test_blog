import { type MutationFunction, useMutation } from '@tanstack/react-query'
import { type IPostResponse, refresh } from '../API/api'
import { useDispatch, useSelector } from 'react-redux'
import { removeAccessToken, removeRefreshToken, removeUserID, setAccessToken, setRefreshToken } from '../redux/slices/userSlice'
import { type ReduxState } from '../redux/initialStore'
import { type IPost } from '../types/PostType'

interface IMutate {
  accessToken: string
  data?: IPost
  id?: string
}

export function useTokenRefresh(mutatePropFn: MutationFunction<IPostResponse, IMutate>, formData: IPost) {
  const dispatch = useDispatch()
  const refreshToken = useSelector((store: ReduxState) => store.user.refreshToken)
  const accessToken = useSelector((store: ReduxState) => store.user.accessToken)

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
