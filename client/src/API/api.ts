import { type IPost } from '../types/PostType'
import { type IUser } from '../types/UserType'

interface ErrorResponse {
    message: string
}
export interface PostFromDB extends IPost {
    user: IUser
}
interface AllPostsQueryParams {
    queryKey: [string, {
        page: number
        limits: number
    }]
}
interface PostsByIDQueryParams {
    queryKey: [string, {
        id: number
    }]
}
interface UserFromDBSignUp {
    username: string
    email: string
    id: string
    updatedAt: string
    createdAt: string
    refreshToken: string
    accessToken: string
}
interface UserFromDBSignIn extends UserFromDBSignUp {
    refreshToken: string
    accessToken: string
}

// const baseURL = 'https://www.amazon-ec2.gigabyte-server.ru'
const baseURL = 'http://localhost:3050'

export const getAllPosts = async ({ queryKey }: AllPostsQueryParams): Promise<PostFromDB[]> => {
    const request = await fetch(`${baseURL}/api/v0.1/post?page=${queryKey[1].page}&limits=${queryKey[1].limits}`, {
        method: 'GET'
    })
    if (request.status !== 200) {
        const data = await request.json() as ErrorResponse
        throw new Error(data.message)
    }
    return await request.json() as PostFromDB[]
}

export const getPostsCount = async (): Promise<PostFromDB[]> => {
    const request = await fetch(`${baseURL}/api/v0.1/post/count`, {
        method: 'GET'
    })
    if (request.status !== 200) {
        throw new Error(request.statusText)
    }
    return await request.json() as PostFromDB[]
}

export const getPostByID = async ({ queryKey }: PostsByIDQueryParams): Promise<PostFromDB> => {
    const request = await fetch(`${baseURL}/api/v0.1/post/${queryKey[1].id}`, {
        method: 'GET'
    })
    if (request.status !== 200) {
        const data = await request.json() as ErrorResponse
        throw new Error(data.message)
    }
    return await request.json() as PostFromDB
}

export const addNewPost = async ({ data, accessToken }: { data: IPost, accessToken: string }): Promise<PostFromDB> => {
    const request = await fetch(`${baseURL}/api/v0.1/post/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(data)
    })
    if (request.status !== 200) {
        throw new Error(request.statusText)
    }
    return await request.json() as PostFromDB
}

export const updatePostByID = async ({ id, data, accessToken }: { id: number, data: IPost, accessToken: string }): Promise<PostFromDB> => {
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
    return await request.json() as PostFromDB
}

export const deletePostByID = async ({ id, token }: { id: number, token: string }): Promise<string> => {
    const request = await fetch(`${baseURL}/api/v0.1/post/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            authorization: `Bearer ${token}`

        }
    })
    if (request.status !== 200) {
        const data = await request.json() as ErrorResponse
        throw new Error(data.message)
    }
    return await request.json() as string
}

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

export const signUp = async (data: IUser): Promise<UserFromDBSignUp> => {
    const request = await fetch(`${baseURL}/api/v0.1/user/signUp`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
    })
    if (request.status !== 200) {
        const errorMessage = await request.json() as ErrorResponse
        throw new Error(errorMessage.error)
    }
    const userFromDB = await request.json()
    console.log('userFromDB', userFromDB)
    console.log('data', data)

    return await signIn({ email: data.email, password: data.password })
    // return await request.json() as UserFromDBSignUp
}
export const signIn = async (data: IUser): Promise<UserFromDBSignIn> => {
    const request = await fetch(`${baseURL}/api/v0.1/user/signIn`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
    })
    if (request.status !== 200) {
        const data = await request.json() as ErrorResponse
        throw new Error(data.error)
    }
    return await request.json() as UserFromDBSignIn
}
export const signOut = async ({ accessToken }: { accessToken: string }): Promise<string> => {
    const request = await fetch(`${baseURL}/api/v0.1/user/signOut`, {
        method: 'POST',
        headers: {
            authorization: `Bearer ${accessToken}`
        }
    })
    if (request.status !== 200) {
        const data = await request.json() as ErrorResponse
        throw new Error(data.message)
    }
    return await request.json() as string
}
