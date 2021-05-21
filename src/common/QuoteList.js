import React, { Component } from 'react';
import QuoteItem from './QuoteItem';
import './QuoteList.css';


class QuoteList extends Component {

  render() {
    const { quotes, onFavorited } = this.props;

    return (
      <ul className="QuoteList">
        {quotes.map((quote, i) => (
          <QuoteItem key={`${quote.quoteId} ${i}`} quote={quote} onFavorited={onFavorited} />
        ))}
      </ul>
    );
  }

}

export default QuoteList;