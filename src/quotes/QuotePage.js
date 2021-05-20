import { Component } from 'react';
import QuoteList from '../common/QuoteList';
import QuoteSearch from '../quotes/QuoteSearch';
import Loader from '../common/Loader';
import { getQuotes, addFavorite, deleteFavorite, getMyQuotes } from '../utils/quotes-api';
import './QuoteSearch.css';

export default class QuotePage extends Component {
  state = {
    quotes: [],
    favorites: [],
    loading: false
  }

  async componentDidMount() {
    try {
      this.setState({ loading: true });

      const favorites = await getMyQuotes();
      this.setState({ favorites: favorites });
    }
    catch (err) {
      console.log(err.message);
    }
    finally {
      this.setState({ loading: false });
    }
  }

  handleSearch = async search => {
    try {
      this.setState({ loading: true });
      const { favorites } = this.state;

      const quotes = await getQuotes(search);

      const upgradedQuotes = quotes.map(quote => {
        const found = favorites.find(favorite => favorite.quoteId === quote.quoteId);
        return found ? found : quote;
      });
    
      this.setState({ quotes: upgradedQuotes });
    }
    catch (err) {
      console.log(err.message);
    }
    finally {
      this.setState({ loading: false });
    }
  }
}
handleFavorited = async quote => {
  try {
    this.setState({ loading: true });
    const { quotes } = this.state;


    const favoriteId = quote.id;

    if (favoriteId) {
      await deleteFavorite(favoriteId);

      const updatedQuotes = quotes.map(q => {
        return q.id === favoriteId
          ? {
            quoteId: quote.quoteId,
            author: quote.author,
            tag: quote.tag
          }
          : q;
      });

      this.setState({ quotes: updatedQuotes });
    }
    else {
      const addedFavorite = await addFavorite(quote);

      const updatedQuotes = quotes.map(q => {
        return q.quoteId === addedFavorite.quoteId ? addedFavorite : q;
      });

      this.setState({ quotes: updatedQuotes });
    }

  }
  catch (err) {
    console.log(err.message);
  }
  finally {
    this.setState({ loading: false });
  }
};

render() {
  const { quotes, loading } = this.state;

  return (
    <div className="QuotesPage">
      <Loader loading={loading}/>
      <QuoteSearch onSearch={this.handleSearch}/>
      <QuoteList quotes={quotes} onFavorited={this.handleFavorited}/>
    </div>
  );
};

