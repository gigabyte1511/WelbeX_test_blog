import { Typography, styled } from '@mui/material'
import { type PostFromDB } from '../API/api'

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: '100px'
})

interface Props {
    postInfo: PostFromDB
}
export function PostInfoContainer({ postInfo }: Props): JSX.Element {
    const date = new Date(postInfo.createdAt)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear().toString()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    const formattedTime = `${hours}:${minutes}:${seconds}`
    const formattedDate = `${day}.${month}.${year}`
    return (
        <Container>
            <Typography variant='h6'>{postInfo.user.username}</Typography>
            <Typography variant='body2'>{formattedTime}</Typography>
            <Typography variant='body2'>{formattedDate}</Typography>
        </Container>
    )
}
