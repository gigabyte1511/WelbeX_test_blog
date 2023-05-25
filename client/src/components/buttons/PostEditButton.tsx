import { Fab } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { type PostFromDB } from '../../API/api'
import { type ReduxState } from '../../redux/initialStore'

interface Props {
    postInfo: PostFromDB
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
            disabled={isDisabled}
            sx={{
                position: 'absolute',
                right: '5%',
                transform: 'translate(-50%)'
            }}>
            <EditIcon />
        </Fab>
    )
}
