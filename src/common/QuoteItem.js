import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './QuoteItem.css';

const RED_HEART = '❤️';
const WHITE_HEART = '♡';

class QuoteItem extends Component {
  state = {
    isFavorite: Boolean(this.props.quote.id)
  }

  handleFavoriteClick = e => {
    const { onFavorited, quote } = this.props;
    e.preventDefault();
    onFavorited(quote);
    this.setState({ isFavorite: !this.state.isFavorite });
  }

  render() {
    const { isFavorite } = this.state;
    const { quote } = this.props;

    return (
      <li className="QuoteItem">
        <Link to={`/quotes/${quote.id}`}>
          <h2>{quote.quote}</h2>
          <h3>{quote.author}</h3>
          <button className="favorite" onClick={this.handleFavoriteClick}>
            {isFavorite ? RED_HEART : WHITE_HEART}
          </button>
        </Link>
      </li>
    );
  }

}

export default QuoteItem;