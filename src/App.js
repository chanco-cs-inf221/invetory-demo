import React from 'react';
import './App.css';
import Item from './components/Item';
import {Modal, ModalHeader, ModalBody, Button,  ModalFooter} from 'reactstrap'
import Details from './components/Details';
import { loadItems, saveItem } from './globals'

class App extends React.Component {

  constructor(){
    super()
    this.state = {
      searchValue: '', // corresponds to input search value
      isItemSelected: false, // true or false depending on whether item was selected or not
      modal: false, // controls the modal
      name: '', // value from item name field on add new item form 
      items: loadItems() || [], // house all items in app
      item: {}, // house selected item in app
      price: 0, // value of item price on add new item form
    }

    this.renderItem = this.renderItem.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.filterOut = this.filterOut.bind(this)
    this.setSelectedItem = this.setSelectedItem.bind(this)
  }


  // process all the items then render them 
  renderItem(){
    return this.state.items.map((item)=>{
     return <Item 
        item={item}
        selectedItem={this.setSelectedItem}/>
    })

  }

  // fired after add new item form has been submitted
  handleFormSubmit(e){
    const { name, price } = this.state; 
    const newItems = [
      ...this.state.items, // copy elements from old array to new array
      {id: this.generateID(5), name, price: `$${price}`} // append new array element
    ]
    
    saveItem(newItems)
      .then((result) => {
        // update items in state on successful save
        return this.setState({items: result})
      })

    e.preventDefault()
    this.toggle()
  }

  // generate unique id for item
  generateID(length){
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // update state.name and state.price values upon entering data in corresponding fields
  onChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  // fire upon entering data in search input field
  handleChange(event) {
    const itemToSearch = event.target.value

    this.setState({
      searchValue: itemToSearch.trim(),
      items: this.search(itemToSearch.trim())
    })
  }

  // filter items array on item name
  search(name){
      if (name === ''){
        return loadItems() // return all items when nothing entered, backspace on will reset
      }
      else{
        // return matched items
        return this.state.items.filter((item) => {
          return item.name.includes(name)
        })
      }
  }

  // control the modal for new item form
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  // fire when deleting item
  removeItem = (name) => {
    const newItems = this.filterOut(name) // filter out matching item name from items
    
    saveItem(newItems)
      .then((result) => {
        // update state values upon successfull save
        return this.setState({
          items: result,
          item: {},
          isItemSelected: false
        })

      })
  }

  // fiter out item with matching name in items
  filterOut(name) {
    return this.state.items.filter((item) => {
      return !item.name.includes(name)
    })
  }


  setSelectedItem(item){
    this.setState({item, isItemSelected: true})
  }

  render(){

    
    return(
      <div className="App">
       <header>
          <nav class="d-flex navbar navbar-expand-lg navbar-light bg-light ">
          <a class="navbar-brand" href="#">Invetory</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse ml-auto">
              <form onSubmit={this.handleSubmit} class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="name" onKeyUp={this.handleChange} placeholder="Search"/>
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>
            </div>
          </nav>
       </header>
      
       <section class="container">
            <Button color="primary" onClick={this.toggle}>Launch demo modal</Button>
            <div class="list-group mt-5">
                <button type="button" class="list-group-item list-group-item-action active">
                  Items in Stock 
                </button>
                { this.renderItem() }
              </div>
            
            {/*condition ? whentrue : whenfalse*/}

            { this.state.isItemSelected ? 
              <Details 
                item={this.state.item}
                itemToRemove={this.removeItem}/> 
                
                :

              <></>
            }
        </section>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <form onSubmit={this.handleFormSubmit}>
            <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
            <ModalBody>
            
                <div className="form-group">
                    <label >Item Name</label>
                    <input onChange={this.onChange} type="text" name='name' className="form-control" defaultValue={this.state.name}  placeholder="Enter item name"/>
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input onChange={this.onChange} type="number" name='price' className="form-control" defaultValue={this.state.price}  placeholder="Enter item name"/>
                </div>
            
            </ModalBody>
            <ModalFooter>
              <input type="submit" className='btn btn-primary' value='Add New Item'/>
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    )
  }
}


export default App;
