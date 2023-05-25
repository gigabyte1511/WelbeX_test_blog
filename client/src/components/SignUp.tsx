import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { ErrorMessage, Form, Formik } from 'formik'
import { TextField, Typography, styled } from '@mui/material'
import * as yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { signUp } from '../API/api'
import { GET_ALLPOSTS_QUERY_KEY } from './PostsAccordion'
import { type IUser } from '../types/UserType'
import { useDispatch } from 'react-redux'
import { setAccessToken, setRefreshToken, setUserID } from '../redux/slices/userSlice'

const SIGN_UP_QUERY_KEY = 'SIGN_UP_QUERY_KEY'

const DataContainer = styled(Form)({
})
const style = {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    borderRadius: '2vw',
    boxShadow: 24,
    p: 4
}

export default function SignUp(): JSX.Element {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { mutate, error, isError } = useMutation({
        mutationKey: [SIGN_UP_QUERY_KEY],
        mutationFn: signUp,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries([GET_ALLPOSTS_QUERY_KEY])
            dispatch(setAccessToken(data.accessToken))
            dispatch(setRefreshToken(data.refreshToken))
            dispatch(setUserID(data.id))
            navigate('/')
        },
        onError: (error) => { console.log('Error', error) }
    })
    const initialValue: IUser = {}
    const handleSubmit = (values: IUser): void => {
        // console.log(values)
        mutate({
            username: values.username,
            email: values.email,
            password: values.password
        })
    }
    const YupValidation = yup.object().shape({
        username: yup
            .string()
            .max(10)
            .required('Required'),
        email: yup
            .string()
            .email()
            .required('Required'),
        password: yup
            .string()
            .max(10)
            .required('Required')
    })
    return (

        <Formik
            initialValues={initialValue}
            validationSchema={YupValidation}
            onSubmit={handleSubmit}
        >
            {(props) => {
                const { username, email, password } = props.values
                // setImageState(image)
                return (
                    <DataContainer sx={style}>
                        <TextField
                            name="username"
                            fullWidth
                            variant="outlined"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            label="Username"
                            value={username}
                            helperText={<ErrorMessage name="username" />}
                            error={(props.errors.username != null) && props.touched.username}
                            required
                        />
                        <TextField
                            name="email"
                            fullWidth
                            variant="outlined"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            label="Email"
                            value={email}
                            helperText={<ErrorMessage name="email" />}
                            error={(props.errors.email != null) && props.touched.email}
                            required
                        />
                        <TextField
                            name="password"
                            fullWidth
                            variant="outlined"
                            type="password"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            label="Password"
                            value={password}
                            helperText={<ErrorMessage name="password" />}
                            error={(props.errors.password != null) && props.touched.password}
                            required
                        />
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            fullWidth>Submit
                        </Button>
                        <Typography textAlign={'center'} color={'error'}>{(isError) ? error.message : ''}</Typography>
                    </DataContainer>
                )
            }}
        </Formik>
    )
}
