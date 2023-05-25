import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { useLocation, useNavigate } from 'react-router-dom'
import { ErrorMessage, Form, Formik } from 'formik'
import { TextField, Typography, styled } from '@mui/material'
import * as yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updatePostByID } from '../API/api'
import { GET_ALLPOSTS_QUERY_KEY } from './PostsAccordion'
import { type IPost } from '../types/PostType'
import { useSelector } from 'react-redux'
import { useTokenRefresh } from '../customHooks/useTokenRefresh'
import { useState } from 'react'

const ADD_NEW_POST_QUERY_KEY = 'ADD_NEW_POST_QUERY_KEY'

const DataContainer = styled(Form)({
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: 10
})
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '0.2vw solid #000',
    borderRadius: '1vw',
    boxShadow: 24,
    p: 4
}

export default function EditPost(): JSX.Element {
    const { state } = useLocation()
    console.log(state)
    const accessToken = useSelector((store) => store.user.accessToken)
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const [formData, setFormData] = useState()

    const { mutate } = useMutation({
        mutationKey: [ADD_NEW_POST_QUERY_KEY],
        mutationFn: updatePostByID,
        onSuccess: async () => {
            await queryClient.invalidateQueries([GET_ALLPOSTS_QUERY_KEY])
            navigate('/')
        },
        onError: (error) => {
            if (error.message === 'Unauthorized') {
                tokenRefresh()
            }
        }
    })
    const tokenRefresh = useTokenRefresh(mutate, formData)

    const handleClose = (): void => {
        navigate(-1)
    }
    const initialValue: IPost = {
        post_previewURL: state.post_previewURL,
        post_header: state.post_header,
        post_text: state.post_text
    }
    const handleSubmit = (values: IPost): void => {
        console.log(values)
        setFormData({
            id: state.id,
            data: {
                post_previewURL: values.post_previewURL,
                post_header: values.post_header,
                post_text: values.post_text
            },
            accessToken
        })
        console.log(values)
        mutate({
            id: state.id,
            data: {
                post_previewURL: values.post_previewURL,
                post_header: values.post_header,
                post_text: values.post_text
            },
            accessToken
        })
    }
    const YupValidation = yup.object().shape({
        post_previewURL: yup
            .string()
            .url('Not valid URL'),
        post_header: yup
            .string()
            .max(10)
            .required('Required'),
        post_text: yup
            .string()
            .max(10)
            .required('Required')
    })
    return (
        <Modal
            open={true}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Formik
                initialValues={initialValue}
                validationSchema={YupValidation}
                onSubmit={handleSubmit}
            >
                {(props) => {
                    const { post_previewURL, post_header, post_text } = props.values
                    return (
                        <DataContainer sx={style}>
                            <Typography variant='h5' textAlign={'center'}>Add new post</Typography>
                            <TextField
                                name="post_previewURL"
                                fullWidth
                                variant="outlined"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                label="Preview image URL"
                                value={post_previewURL}
                                helperText={<ErrorMessage name="post_previewURL" />}
                                error={(props.errors.post_previewURL != null) && props.touched.post_previewURL}
                            />
                            <TextField
                                name="post_header"
                                fullWidth
                                variant="outlined"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                label="Post header"
                                value={post_header}
                                helperText={<ErrorMessage name="post_header" />}
                                error={(props.errors.post_header != null) && props.touched.post_header}
                                required
                            />
                            <TextField
                                name="post_text"
                                fullWidth
                                variant="outlined"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                label="Post text"
                                value={post_text}
                                helperText={<ErrorMessage name="post_text" />}
                                error={(props.errors.post_text != null) && props.touched.post_text}
                                required
                            />
                            <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                                fullWidth>Submit</Button>
                        </DataContainer>
                    )
                }}
            </Formik>
        </Modal >
    )
}
