import { Pagination, Stack, styled } from '@mui/material'
import PostsAccordion from './PostsAccordion'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPostsCount } from '../API/api'

const GET_POSTS_COUNT_QUERY_KEY = 'GET_POSTS_COUNT_QUERY_KEY'

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    padding: 10

})

export default function Body(): JSX.Element {
    const { isError, isSuccess, data, error } = useQuery({
        queryKey: [GET_POSTS_COUNT_QUERY_KEY],
        queryFn: getPostsCount
    })
    const [page, setPage] = useState(1)
    const handleChange = (_event, value): void => {
        setPage(value)
    }
    if (isError) console.log('ERROR', error)
    if (isSuccess) {
        console.log(data)
        console.log(data.posts_count / 20)
        return (
            <Container>
                <Stack spacing={2}>
                    <Pagination count={Math.ceil(data.posts_count / 20)} color="primary" page={page} onChange={handleChange} />
                </Stack>
                <PostsAccordion pageNumber={page} />
                <Stack spacing={2}>
                    <Pagination count={Math.ceil(data.posts_count / 20)} color="primary" page={page} onChange={handleChange} />
                </Stack>
            </Container>
        )
    }
}
