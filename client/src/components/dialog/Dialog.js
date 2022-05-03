import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Axios from 'axios'

export default function FormDialog(props) {
   
    const [editValues, setEditValues] = useState({
        id: props.id,
        name: props.name,
        cost: props.cost,
        category: props.category
    });

    const handleSave = () => {
        Axios.put("http://localhost:3001/edit", {
            id: editValues.id,
            name: editValues.name,
            cost: editValues.cost,
            category: editValues.category
        })

        handleClose();
    }

    const handleDelete = () => {
        Axios.delete(`http://localhost:3001/delete/${editValues.id}`);
        handleClose();
    }

    const handleClickOpen = () => {
        props.setOpen(true);
        };
    
        const handleClose = () => {
        props.setOpen(false);
        };

        const handleEditValues = (value) => {
            setEditValues((listEditValues) => ({
                ...listEditValues,
                [value.target.id]: value.target.value,
            }))
        }

  return (
  
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Editar</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome do Jogo"
            defaultValue={props.name}
            type="text"
            fullWidth
            variant="standard"
            onChange={handleEditValues}
          />
          <TextField
            autoFocus
            margin="dense"
            id="cost"
            defaultValue={props.cost}
            label="Valor do Jogo"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleEditValues}
          />
          <TextField
            autoFocus
            margin="dense"
            id="category"
            defaultValue={props.category}
            label="Categoria do Jogo"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleEditValues}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Salvar</Button>
          <Button onClick={handleDelete}>Excluir</Button>
        </DialogActions>
      </Dialog>

  );
}