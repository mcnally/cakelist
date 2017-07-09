import React, { Component } from 'react';
import cakeData from './cake.json';
import CakeList from './CakeList';
import Form from './Form';
import './App.css';

export default class App extends Component {
  static getDefaultFormData() {
    return { id: -1, title: '', desc: '', image: '' };
  }

  constructor(props) {
    super(props);
    let idCount = 0;
    const cakes = cakeData.map((cake) => {
      const newCake = cake;
      newCake.id = idCount;
      idCount += 1;
      return newCake;
    });
    this.state = {
      cakes,
      filteredCakes: cakes,
      idCount,
      formOpen: false,
      formData: App.getDefaultFormData(),
    };
    this.handleCakeForm = this.handleCakeForm.bind(this);
    this.filter = this.filter.bind(this);
    this.editAction = this.editAction.bind(this);
  }

  handleCakeForm(cake) {
    const newCakes = this.state.cakes;
    let idCount = this.state.idCount;
    if (cake.id !== -1) {
      // Update
      for (let i = 0; i < newCakes.length; i += 1) {
        if (newCakes[i].id === cake.id) {
          newCakes[i] = cake;
        }
      }
    } else {
      // New item
      const newCake = cake;
      newCake.id = this.state.idCount;
      idCount += 1;
      newCakes.unshift(newCake);
    }
    this.setState({
      cakes: newCakes,
      filteredCakes: newCakes,
      idCount,
      formOpen: false,
      formData: App.getDefaultFormData(),
    });
  }

  editAction(cake) {
    this.setState({ formData: cake, formOpen: true });
  }

  filter(value) {
    let results = [];
    let filtered = false;
    if (value === '') {
      results = this.state.cakes;
    } else {
      results = this.state.cakes.filter(({ title, desc }) => {
        if (
          title.toLowerCase().indexOf(value) !== -1 ||
          desc.toLowerCase().indexOf(value) !== -1
        ) {
          return true;
        }
        return false;
      });
      filtered = this.state.cakes.length !== this.state.filteredCakes.length;
    }
    this.setState({ filteredCakes: results, filtered, formOpen: false });
  }
  openForm() {
    this.setState({ formOpen: true });
  }

  render() {
    return (
      <div className="App">
        <input
          placeholder="Search"
          onChange={(event) => {
            this.filter(event.target.value);
          }}
        />
        {!this.state.formOpen &&
          <div className="action">
            <button
              onClick={() => {
                this.openForm();
              }}
            >
              Add new cake
            </button>
          </div>}
        {this.state.formOpen &&
          <Form
            open={this.state.formOpen}
            formData={this.state.formData}
            handleSubmit={this.handleCakeForm}
          />}
        <CakeList
          cakes={this.state.filteredCakes}
          editAction={this.editAction}
        />
      </div>
    );
  }
}
