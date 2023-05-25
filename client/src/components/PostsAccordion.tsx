import { styled } from '@mui/material'
import PostContainer from './PostContainer'
import { useQuery } from '@tanstack/react-query'
import { getAllPosts } from '../API/api'
import PostSkeleton from './PostSkeleton'

export const GET_ALLPOSTS_QUERY_KEY = 'GET_ALLPOSTS_QUERY_KEY'

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: 10
})

export default function PostsAccordion({ pageNumber }: { pageNumber: number }): JSX.Element {
    const limitsCounter = 20
    const $postskeletons = Array.from({ length: limitsCounter }, (_, index) => <PostSkeleton key={index} />)
    const { isError, isSuccess, data, error } = useQuery({
        queryKey: [GET_ALLPOSTS_QUERY_KEY, { page: pageNumber, limits: limitsCounter }],
        queryFn: getAllPosts
    })
    if (isError) console.log('ERROR', error)
    if (isSuccess) {
        const $posts = data.map((post) => <PostContainer key={post.id} postInfo={post} />)
        return (
            <Container>
                {$posts}
            </Container>
        )
    }
    return (
        <div>
            <Container>
                {$postskeletons}
            </Container>
        </div>
    )
}
