import { Accordion, AccordionDetails, AccordionSummary, Box, Typography, styled } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { PostInfoContainer } from './PostInfoContainer'
import PostDetailContainer from './PostDetailContainer'
import PostEditButton from './buttons/PostEditButton'
import { type IPostResponse } from '../API/api'
import PostDeleteButton from './buttons/PostDeleteButton'

const ButtonContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center'
})
interface Props {
    postInfo: IPostResponse
}

export default function PostContainer({ postInfo }: Props): JSX.Element {
    return (
        <div>
            <Accordion sx={{
                backgroundColor: '#f4ede4'
            }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '60vw'
                    }}>
                        <PostInfoContainer postInfo={postInfo} />
                        <Typography variant='h5'>{postInfo.post_header}</Typography>
                        <ButtonContainer
                            sx={{
                                position: 'absolute',
                                right: '5%',
                                transform: 'translate(-50%)'
                            }}>
                            <PostEditButton postInfo={postInfo} />
                            <PostDeleteButton postInfo={postInfo} />
                        </ButtonContainer>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <PostDetailContainer postInfo={postInfo} />
                </AccordionDetails>
            </Accordion>
        </div>
    )
}
