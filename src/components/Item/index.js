import React from 'react'

function Item({name, price}){
    return (
        <button type="button" class="list-group-item list-group-item-action">
            {name} {price}
        </button>
    )
}

export default Item