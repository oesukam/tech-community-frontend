
import {
  InstantSearch,
  SearchBox,
  connectAutoComplete,
} from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import searchClient from '../../helpers/searchClient';
import './HeaderSearch.scss';
import { setSearchState } from '../../actions/searchActions';

const Autocomplete = ({ hits }) => (
  <ul className="search-autocomplete">
    {hits.map((hit) => (
      <li key={hit.objectID}>
        <Link to={`/${hit.resource}s/${hit.objectID}`}>
          <p>{hit.title}</p>
          <span>
            <i className="fa fa-list" />
            {hit.resource}
          </span>
        </Link>
      </li>
    ))}
  </ul>
);

const CustomAutocomplete = connectAutoComplete(Autocomplete);

Autocomplete.propTypes = {
  hits: PropTypes.any,
};

Autocomplete.defaultProps = {
  hits: [],
};

class HeaderSearch extends Component {
  state = {
    recommendation: true,
  }

  componentDidMount() {
    window.addEventListener('click', (e) => {
      if (e.target.className !== 'ais-SearchBox-input') {
        this.setState({ recommendation: false });
      }
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { history, searchState } = this.props;
    this.setState({
      recommendation: true,
    });
    history.push(`/?search=${searchState.query || ''}`);
  }

  onKeyDown = () => {
    const { searchState } = this.props;
    this.setState({
      recommendation: searchState.query !== '',
    });
  }

  render() {
    const { recommendation } = this.state;
    const { searchState, _setSearchState } = this.props;
    return (
      <InstantSearch
        indexName={process.env.REACT_APP_ALGOLIA_INDEX_NAME}
        searchClient={searchClient}
        searchState={searchState}
        onSearchStateChange={_setSearchState}
      >
        <SearchBox
          onSubmit={this.onSubmit}
          onKeyDown={this.onKeyDown}
        />
        { searchState.query && recommendation ? <CustomAutocomplete /> : null }
      </InstantSearch>
    );
  }
}

HeaderSearch.propTypes = {
  searchState: PropTypes.object,
  history: PropTypes.object,
  _setSearchState: PropTypes.func,
};

HeaderSearch.defaultProps = {
  searchState: {},
  history: {},
  _setSearchState: () => '',
};

const mapStateToProps = ({ search: { searchState } }) => ({
  searchState,
});

const mapDispatchToProps = (dispatch) => ({
  _setSearchState: (payload) => dispatch(setSearchState(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSearch);
