import React from 'react';

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { searchTerm: '' };
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search(e) {
    this.props.onSearch(e.target.value);
  }

  handleTermChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  render() {
    return (
      <div className="SearchBar">
        <input 
          placeholder="Enter A Song, Album, or Artist" 
          value={ this.state.searchTerm }
          onChange={ this.handleTermChange }
          />
        <button 
          className="SearchButton"
          onClick={this.search}>SEARCH</button>
      </div>
    )
  }
}