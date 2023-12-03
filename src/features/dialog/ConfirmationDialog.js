import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmationDialog(props)
{
    const handleCancel = () =>
    {
        props.callback(false);
    };

    const handleConfirm = () =>
    {
        props.callback(true);
    };

    return (
            <Dialog
                open={props.isOpen}
                onClose={handleCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"DA LI STE SIGURNI?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Ova akcija će zauvek obrisati podatke!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel}>Odustani</Button>
                    <Button onClick={handleConfirm} autoFocus>
                        OBRIŠI ZAUVEK
                    </Button>
                </DialogActions>
            </Dialog>
    );
}