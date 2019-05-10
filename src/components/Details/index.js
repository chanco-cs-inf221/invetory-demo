import React from 'react'

function Details({item, itemToRemove}){
    const {name, price } = item

    const onDelete = () => {
        itemToRemove(name)
    }

    return (
        <div className="card" style={{width: '18rem', marginTop: '1rem'}}>
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{price}</h6>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <button onClick={onDelete} className="btn btn-danger">Delete</button>
            </div>
        </div>
    )
}

export default Details