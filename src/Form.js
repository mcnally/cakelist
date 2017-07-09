import React, { Component } from 'react';
import './Form.css';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = props.formData;
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.formData);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.state);
  }

  render() {
    const isEditing = this.state.id !== -1;

    return (
      <form
        className="Form"
        onSubmit={(event) => {
          this.handleSubmit(event);
        }}
      >
        <p>
          {isEditing ? `Updating cake #${this.state.id + 1}` : 'Adding new cake'}
        </p>
        <input
          name="title"
          placeholder="Enter cake name"
          type="text"
          value={this.state.title}
          required="required"
          onChange={this.handleInputChange}
        />
        <input
          name="desc"
          placeholder="Enter cake description"
          type="text"
          value={this.state.desc}
          required="required"
          onChange={this.handleInputChange}
        />
        <input
          name="image"
          placeholder="Enter image url"
          type="text"
          value={this.state.image}
          required="required"
          onChange={this.handleInputChange}
        />
        <button type="submit">
          {isEditing ? 'Update' : 'Add'}
        </button>
      </form>
    );
  }
}
