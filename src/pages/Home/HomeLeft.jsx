import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { getFeed } from '../../actions/feedActions';
import categories from '../../constants/categories';
import './HomeLeft.scss';

export class HomeLeft extends Component {
  navigateTo = (category) => {
    const {
      history,
      searchState: { query: search = '' },
      onGetFeed,
    } = this.props;
    history.push(`/?search=${search}&category=${category}`);
    onGetFeed({
      limit: 0,
      itemsLength: 0,
      category,
      search,
      clear: true,
    });
  };

  render() {
    const { location } = this.props;
    const { category = '' } = queryString.parse(location.search);

    return (
      <div className="side-container">
        <div className="side-container__header">Categories</div>
        {categories.map(({ name, value, icon }) => (
          <div
            role="presentation"
            onClick={() => this.navigateTo(value)}
            className={`side-container__item ${
              category === value ? 'active' : ''
            }`}
            key={name}
          >
            <span>
              <i className={`fa fa-${icon}`} />
            </span>
            {name}
          </div>
        ))}
      </div>
    );
  }
}

HomeLeft.propTypes = {
  history: PropTypes.any,
  location: PropTypes.any,
  onGetFeed: PropTypes.func,
  searchState: PropTypes.object,
};

HomeLeft.defaultProps = {
  history: {},
  location: {},
  onGetFeed: () => '',
  searchState: {},
};

/**
 * Maps the state to props
 * @param {*} { auth }
 * @returns {object} props
 */
export const mapStateToProps = ({ search: { searchState } }) => ({
  searchState,
});

/**
 * Maps dispatches to props
 * @param {*} dispatch
 * @returns {object} props
 */
export const mapDispatchToProps = (dispatch) => ({
  onGetFeed: (limit, itemsLength) => dispatch(getFeed(limit, itemsLength)),
});

export default connect(null, mapDispatchToProps)(HomeLeft);
