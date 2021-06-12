import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { getCategories } from '../../../api/user/getCategories';
import { postComplaint } from '../../../api/user/postComplaint';
import { Category } from '../../../models/category';
import { PropsUser } from '../../../Pages';

const useStyles = makeStyles({
    form: {
        display: "flex",
        flexDirection:"column",
        justifyContent:"space-evenly"
    },
    buttons: {
        display: "flex",
        justifyContent: "flex-end"
    },
    margins:{
        margin:"0.5em"
    }
});

interface CreateComplaintProps extends PropsUser {
    setOpen: (value: React.SetStateAction<boolean>) => void;  
}
const CreateComplaint = (props: CreateComplaintProps) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [note, setNote] = useState<string>('');
    const [category, setCategory] = useState<number>(-1);
    const [categories, setCategories] = useState<Category[]>([]);
    
    useEffect(() => {
        getCategories().then((res) => {
          if (res.isError) {
            enqueueSnackbar("Could not get all malfunctions", { variant: "error" });
          } else {
            setCategories(res.data || []);
          }
        });
    }, [enqueueSnackbar]);  

    const sendClick = (e: any) => {
        e.preventDefault();
        if(category < 0)
        {
            enqueueSnackbar("Category cannot be null", { variant: "info" })
            return;
        }
         postComplaint({
             SenderId: props.user?.Id || "",
             TargetFirstName: firstName,
             TargetLastName: lastName,
             Note: note,
             Category: category
         }).then((res) => {
            if (res.isError) {
                enqueueSnackbar("Could not send", { variant: "error" });
            } else {
                enqueueSnackbar("Sent", { variant: "success" });
                props.setOpen(false)
            }
          });
        };  
    return (
        <form onSubmit={sendClick} className={classes.form}>
        <TextField 
            className={classes.margins} 
            id="fname" 
            label="Target First Name" 
            variant="outlined" 
            required 
            onChange={(event: any) => setFirstName(event.target.value)}/>
        <TextField 
            className={classes.margins} 
            id="lname" 
            label="Target Last Name" 
            variant="outlined" 
            required 
            onChange={(event: any) => setLastName(event.target.value)}/>
        <Autocomplete
            className={classes.margins} 
            id="category"
            aria-required
            options={categories}
            getOptionLabel={(option) => option.title}
            style={{ width: 300 }}
            onChange={(object, values) => setCategory(values?.id || -1)}
            renderInput={(params) => <TextField {...params} label="Category" variant="outlined" 
            />}
        />
        <TextField
            type="text"
            label="Note"
            variant="filled"
            id="note"
            rows="5"
            className={classes.margins} 
            defaultValue={note}
            multiline
            onChange={(event) => setNote(event.target.value)}
        />
        <div className={classes.buttons}>
        <Button className={classes.margins} 
            size="small" 
            variant="outlined" 
            color="secondary"
            onClick={()=> props.setOpen(false)}
            >Cancel</Button>
        <Button className={classes.margins} 
            size="small" 
            variant="outlined" 
            color="primary"
            type="submit"
            >Send</Button>
        </div>
        </form>
            )
}

export default CreateComplaint;