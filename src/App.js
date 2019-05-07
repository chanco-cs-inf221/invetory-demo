import React from 'react';
import logo from './logo.svg';
import './App.css';
import Item from './components/Item';
import {Modal, ModalHeader, ModalBody, Button,  ModalFooter} from 'reactstrap'

const loadItems = () => {
  return JSON.parse(localStorage.getItem('items'))
} 

const saveItem = (items) => {
  localStorage.setItem('items', JSON.stringify(items))
} 
class App extends React.Component {

  constructor(){
    super()
    this.items = loadItems() || []
    this.state = {
      searchValue: '',
      modal: false,
      name: '',
      price: 0
    }
    this.renderItem = this.renderItem.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this)
  }

  renderItem(){

    return this.items.map((item)=>{
     return <Item 
        name={item.name}
        price={item.price}/>
    })

  }

  handleFormSubmit(e){
    console.log(this.state.name, this.state.price)

    const { name, price } = this.state; 
    this.items.push({id: this.generateID(5), name, price: `$${price}`})
    saveItem(this.items)
    e.preventDefault()
    this.toggle()
  }

  generateID(length){
    const result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  handleChange(event) {
    this.setState({searchValue: event.target.value});
    this.items = this.search(event.target.value)
    console.log(this.items)
  }

  search(name){
    console.log(name)
    return this.items.filter((item) => {
      return item.name.includes(name)
    })
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
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
