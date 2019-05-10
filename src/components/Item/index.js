import React from 'react'

function Item({item, selectedItem}){
    const {name, price} = item

    const onSelect = () => {
        selectedItem(item)
    }
    return (
        <button onClick={onSelect} type="button" class="list-group-item list-group-item-action">
            {name} {price}
        </button>
    )
}

export default Item