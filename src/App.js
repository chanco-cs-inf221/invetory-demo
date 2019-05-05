import React from 'react';
import logo from './logo.svg';
import './App.css';
import Item from './components/Item';
import {Modal, ModalHeader, ModalBody, Button,  ModalFooter} from 'reactstrap'
class App extends React.Component {

  constructor(){
    super()
    this.items = [
      {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
      {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
      {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
      {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
      {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
      {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
    ]
    this.state = {
      searchValue: '',
      modal: false
    }
    this.renderItem = this.renderItem.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggle = this.toggle.bind(this);
  }

  renderItem(){

    return this.items.map((item)=>{
     return <Item 
        name={item.name}
        price={item.price}/>
    })

  }

  handleSubmit(e){
    
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
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}


export default App;
