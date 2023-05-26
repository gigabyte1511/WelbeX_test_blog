import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { type ReduxState } from '../../redux/initialStore'
import { deletePostByID, type IPostResponse } from '../../API/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { GET_ALLPOSTS_QUERY_KEY } from '../PostsAccordion'
import { useTokenRefresh } from '../../customHooks/useTokenRefresh'

const DELETE_POST_QUERY_KEY = 'DELETE_POST_QUERY_KEY'
interface Props {
    postInfo: IPostResponse
}

export default function PostDeleteButton({ postInfo }: Props): JSX.Element {
    const accessToken = useSelector((store: ReduxState) => store.user.accessToken)
    const userID = useSelector((store: ReduxState) => store.user.id)
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationKey: [DELETE_POST_QUERY_KEY],
        mutationFn: deletePostByID,
        onSuccess: async () => {
            await queryClient.invalidateQueries([GET_ALLPOSTS_QUERY_KEY])
            navigate('/')
        },
        onError: (error: { message: string }) => {
            if (error.message === 'Unauthorized') {
                tokenRefresh()
            }
        }
    })

    const tokenRefresh = useTokenRefresh(mutate, {
        // @ts-expect-error
        id: postInfo.id,
        accessToken
    })

    let isDisabled = true
    if (accessToken && (userID === postInfo.user.id)) isDisabled = false
    return (
        <IconButton
            disabled={isDisabled}
            aria-label="delete"
            onClick={() => {
                mutate({
                    id: postInfo.id,
                    accessToken
                })
            }}
        >
            <DeleteIcon />
        </IconButton>
    )
}
