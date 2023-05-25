import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { PostInfoContainer } from './PostInfoContainer'
import { type PostFromDB } from '../API/api'
import PostDetailContainer from './PostDetailContainer'
import PostEditButton from './buttons/PostEditButton'

interface Props {
    postInfo: PostFromDB
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
                        <PostEditButton postInfo={postInfo} />
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <PostDetailContainer postInfo={postInfo} />
                </AccordionDetails>
            </Accordion>
        </div>
    )
}
