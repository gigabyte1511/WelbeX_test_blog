import { type IPost } from '../types/PostType'
import { type IUser } from '../types/UserType'

interface IErrorResponse {
    message: string
}
interface ISignErrorResponse {
    error: string
}
interface IAllPostsQueryParams {
    queryKey: [string, {
        page: number
        limits: number
    }]
}
interface IPostsCountResponse {
    posts_count: number
}
// interface IPostsByIDQueryParams {
//     queryKey: [string, {
//         id: number
//     }]
// }

interface INewPostResponse extends IPost {
    id: string
    userId: string
    updatedAt: string
    createdAt: string
}
export interface IPostResponse extends INewPostResponse {
    user: IUserSignUpResponse
}

interface IUserSignUpResponse {
    username: string
    email: string
    id: string
    updatedAt: string
    createdAt: string
}
interface IUserSiInResponse extends IUserSignUpResponse {
    refreshToken: string
    accessToken: string
}

// const baseURL = 'https://www.amazon-ec2.gigabyte-server.ru'
const baseURL = 'http://localhost:3050'

// get all posts from server
export const getAllPosts = async ({ queryKey }: IAllPostsQueryParams): Promise<IPostResponse[]> => {
    const request = await fetch(`${baseURL}/api/v0.1/post?page=${queryKey[1].page}&limits=${queryKey[1].limits}`, {
        method: 'GET'
    })
    if (request.status !== 200) {
        throw new Error(request.statusText)
    }
    return await request.json() as IPostResponse[]
}

// get posts count from server
export const getPostsCount = async (): Promise<IPostsCountResponse> => {
    const request = await fetch(`${baseURL}/api/v0.1/post/count`, {
        method: 'GET'
    })
    if (request.status !== 200) {
        throw new Error(request.statusText)
    }
    return await request.json() as IPostsCountResponse
}

// get post from server by id
// export const getPostByID = async ({ queryKey }: IPostsByIDQueryParams): Promise<IPost> => {
//     const request = await fetch(`${baseURL}/api/v0.1/post/${queryKey[1].id}`, {
//         method: 'GET'
//     })
//     if (request.status !== 200) {
//         throw new Error(request.statusText)
//     }
//     return await request.json() as PostFromDB
// }

// add new post to server
export const addNewPost = async ({ data, accessToken }: { data: IPost, accessToken: string }): Promise<INewPostResponse> => {
    const request = await fetch(`${baseURL}/api/v0.1/post/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(data)
    })
    if (request.status === 401) {
        throw new Error(request.statusText)
    }
    if (request.status !== 200) {
        const data = await request.json() as IErrorResponse
        throw new Error(data.message)
    }
    return await request.json() as INewPostResponse
}

// delete post from server by post id
export const deletePostByID = async ({ id, token }: { id: number, token: string }): Promise<string> => {
    const request = await fetch(`${baseURL}/api/v0.1/post/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            authorization: `Bearer ${token}`

        }
    })
    if (request.status !== 200) {
        const data = await request.json() as IErrorResponse
        throw new Error(data.message)
    }
    return await request.json() as string
}

// update post from server by post id
export const updatePostByID = async ({ id, data, accessToken }: { id: string, data: IPost, accessToken: string }): Promise<INewPostResponse> => {
    const request = await fetch(`${baseURL}/api/v0.1/post/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(data)
    })
    if (request.status !== 200) {
        throw new Error(request.statusText)
    }
    return await request.json() as INewPostResponse
}

// refresh token method
export const refresh = async (refreshToken: string): Promise<{ accessToken: string, refreshToken: string }> => {
    console.log('refresh api')
    const request = await fetch(`${baseURL}/api/v0.1/user/refresh`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${refreshToken}`
        }
    })
    if (request.status !== 200) {
        throw new Error(request.statusText)
    }
    console.log('refresh api - success')
    return await request.json() as { accessToken: string, refreshToken: string }
}

// signUp method
export const signUp = async (data: IUser): Promise<IUserSiInResponse> => {
    const request = await fetch(`${baseURL}/api/v0.1/user/signUp`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
    })
    if (request.status !== 200) {
        const errorMessage = await request.json() as ISignErrorResponse
        throw new Error(errorMessage.error)
    }
    return await signIn(data)
}

// signIn method
export const signIn = async (data: IUser): Promise<IUserSiInResponse> => {
    const request = await fetch(`${baseURL}/api/v0.1/user/signIn`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
    })
    if (request.status !== 200) {
        const data = await request.json() as ISignErrorResponse
        throw new Error(data.error)
    }
    return await request.json() as IUserSiInResponse
}

// signOut method
export const signOut = async ({ accessToken }: { accessToken: string }): Promise<string> => {
    const request = await fetch(`${baseURL}/api/v0.1/user/signOut`, {
        method: 'POST',
        headers: {
            authorization: `Bearer ${accessToken}`
        }
    })
    if (request.status !== 200) {
        const data = await request.json() as IErrorResponse
        throw new Error(data.message)
    }
    return await request.json() as string
}
