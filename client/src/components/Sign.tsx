import { Box, Modal, Switch, Typography, styled } from '@mui/material'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '0.2vw solid #000',
    borderRadius: '2vw',
    boxShadow: 24,
    p: 4
}
const SwitchContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center'
})

export default function Sign(): JSX.Element {
    const [checked, setChecked] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (checked) navigate('signUp')
        else navigate('signIn')
    }, [checked])

    const handleChange = (event): void => {
        setChecked(event.target.checked)
    }
    const handleClose = (): void => {
        navigate('/')
    }
    return (
        <Modal
            open={true}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <SwitchContainer>
                    <Typography variant='h6'>Sign In</Typography>
                    <Switch
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <Typography variant='h6'>Sign Up</Typography>
                </SwitchContainer>
                <Outlet />
            </Box>
        </Modal >
    )
}
