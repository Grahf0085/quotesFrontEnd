import React, { Component } from 'react';

export default class SearchPage extends Component {

    state = {
      search: ''
    }

handleChange = ({ target }) => {
  this.setState({ search: target.value });
}

handleSubmit = e => {
  const { onSearch } = this.props;
  e.preventDefault();
  onSearch(this.state.search);
}

render() {
  const { search } = this.state;
  return (
    <form className="QuoteSearch" onSubmit={this.handleSubmit}>
      <input value={search} onChange={this.handleChange}/>
      <button>Search quotes</button>
    </form>
  );
}
}
