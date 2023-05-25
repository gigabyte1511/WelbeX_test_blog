import { Paper, Typography, styled } from '@mui/material'
import { type IPost } from '../types/PostType'

const Container = styled(Paper)({
    display: 'flex',
    justifyContent: 'space-between',
    padding: 10
})
const TextContainer = styled(Typography)({
    display: 'flex'
})
const ImageContainer = styled('img')({
    display: 'flex',
    height: '10vw',
    width: '10vw'
})

export default function PostDetailContainer({ postInfo }: { postInfo: IPost }): JSX.Element {
    return (
        <Container>
            <TextContainer variant='h6'>{postInfo.post_text}</TextContainer>
            <ImageContainer src={postInfo.post_previewURL}></ImageContainer>
        </Container>
    )
}
