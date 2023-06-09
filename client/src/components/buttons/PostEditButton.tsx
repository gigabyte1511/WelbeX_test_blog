import { Fab } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { type ReduxState } from '../../redux/initialStore'
import { type IPostResponse } from '../../API/api'

interface Props {
    postInfo: IPostResponse
}

export default function PostEditButton({ postInfo }: Props): JSX.Element {
    const accessToken = useSelector((store: ReduxState) => store.user.accessToken)
    const userID = useSelector((store: ReduxState) => store.user.id)
    let isDisabled = true
    if (accessToken && (userID === postInfo.user.id)) isDisabled = false

    const navigate = useNavigate()
    return (
        <Fab onClick={() => { navigate('editPost', { state: { ...postInfo } }) }}
            color="secondary"
            aria-label="add"
            size="small"
            disabled={isDisabled}>
            <EditIcon />
        </Fab>
    )
}
