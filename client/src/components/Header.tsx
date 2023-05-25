import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import AddPostButton from './buttons/AddPostButton'
import SignButton from './buttons/SignButton'

export default function Header(): JSX.Element {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        WelBex test blog
                    </Typography>
                    <AddPostButton />
                    <SignButton />
                </Toolbar>
            </AppBar>
        </Box>
    )
}
