import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

export default function CustomSnackbar(props) {
    return (
        <Snackbar
            open={props.show}
            autoHideDuration={5000}
            onClose={() => props.setShowSnackbar(false)}>
            <Alert severity={props.severity}>
                {props.message}
            </Alert>
        </Snackbar>
    )
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}
