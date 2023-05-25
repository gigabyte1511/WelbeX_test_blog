import { Skeleton, styled } from '@mui/material'

const SkeletonContainer = styled(Skeleton)({
    height: '5vw',
    width: '80vw',
    borderRadius: 6
})

export default function PostSkeleton(): JSX.Element {
    return (
        <SkeletonContainer variant="rectangular" />
    )
}
