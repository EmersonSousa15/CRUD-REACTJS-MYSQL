import React from 'react';
import './Cards.css'
import FormDialog from '../dialog/Dialog';

export default function Cards(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickCard = () => {
        setOpen(true)
    }
    return (
        <>
            <FormDialog 
            open={open} 
            setOpen={setOpen} 
            id={props.id}
            name={props.name} 
            cost={props.cost} 
            category={props.category} 
            image={props.image}
            listCard={props.listGames} 
            setListGames={props.setListGames}/>
            <div className='card--container' onClick={() => handleClickCard()}>
                <img className='card--image' src={props.image}></img>
                <div className='informations--container'>
                    <div className='cat--til--container'>
                        <h1 className='title'>{props.name}</h1>
                        <p className='card--category'>{props.category}</p>
                    </div>
                    <p className='card--cost'> R$ {props.cost}</p>
                </div>    
            </div>
        </>
    )
}