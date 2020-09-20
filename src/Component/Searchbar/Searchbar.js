import React, { Component } from 'react';
export default class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  //при вводі в input передаємо це значання в state.inputValue
  handleChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  //передаємо значення inputValue в props.onSubmit, та скидуємо це значення після submit
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.inputValue);
    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            onChange={this.handleChange}
            value={this.state.inputValue}
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
