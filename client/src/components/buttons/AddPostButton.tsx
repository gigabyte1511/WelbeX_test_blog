import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function AddPostButton(): JSX.Element {
    const accessToken = useSelector((store) => store.user.accessToken)
    const navigate = useNavigate()
    return (
        <Fab onClick={() => { navigate('newPost') }}
            color="secondary"
            aria-label="add"
            disabled={(!accessToken)}
            sx={{
                position: 'absolute',
                left: '50%',
                transform: 'translate(-50%)'
            }}>
            <AddIcon></AddIcon>
        </Fab>
    )
}
