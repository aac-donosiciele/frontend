import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { UserProps } from '../../UserPage';

const useStyles = makeStyles({
    container: {
        marginTop: '1em',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    paper: {
        padding: '1em',
        margin: '1em',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        margin: '1em',
    },
    subheader: {
        padding: '0.25em',
        paddingLeft: '0.5em',
    },
});
const categories = [
        {name:'Policja'},
        {name:'Straż Miejska'}
];

const CreateComplaint = (props: UserProps) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [note, setNote] = useState<string>('');

    return (
        <>
        <TextField id="outlined-basic" label="Target First Name" variant="outlined" required onChange={(event: any) => setFirstName(event.target.value)}/>
        <TextField id="outlined-basic" label="Target Last Name" variant="outlined" required onChange={(event: any) => setLastName(event.target.value)}/>
        <Autocomplete
            id="category"
            options={categories}
            getOptionLabel={(option) => option.name}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Category" variant="outlined" />}
        />
        <TextField
            type="text"
            label="Note"
            variant="filled"
            id="email_text_field"
            rows="5"
            defaultValue={note}
            multiline
            onChange={(event) => setNote(event.target.value)}
        />
        </>
    )
}

export default CreateComplaint;