import { Component } from 'react';
import './QuoteDetailPage.css';
import { getQuote } from '../app/utils/quotes-api';

export default class QuoteDetailPage extends Component {
  state = {
    quote: null,
    loading: false
  }

  async componentDidMount() {
    try {
      const { match } = this.props;
      this.setState({ loading: true });

      const quote = await getQuote(match.params.id);
      this.setState({ quote: quote });
    }
    catch (err) {
      console.log(err.message);
    }
    finally {
      this.setState({ loading: false });
    }
  }

  render() {

    const { quote } = this.state;

    return (
      <section className="QuoteDetailPage">
        <pre>
          {JSON.stringify(quote, true, 2)}
        </pre>
      </section>
    );
  }
}