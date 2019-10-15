import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { getFeed } from '../../actions/feedActions';

import './HomeLeft.scss';


export class HomeLeft extends Component {
  navigateTo = (category) => {
    const { history, searchState: { query: search = '' }, onGetFeed } = this.props;
    history.push(`/?search=${search}&category=${category}`);
    onGetFeed({
      limit: 0,
      itemsLength: 0,
      category,
      search,
    });
  };

  render() {
    const { location } = this.props;
    const { category = 'general' } = queryString.parse(location.search);
    return (
      <div className="side-container">
        <div className="side-container__header">Posts</div>
        <div
          role="presentation"
          onClick={() => this.navigateTo('general')}
          className={`side-container__item ${category === 'general' ? 'active' : ''}`}
        >
          <i className="fa fa-globe" />
      General
        </div>
        <div
          role="presentation"
          onClick={() => this.navigateTo('job')}
          className={`side-container__item ${category === 'job' ? 'active' : ''}`}
        >
          <i className="fa fa-globe" />
      Jobs
        </div>
        <div
          role="presentation"
          onClick={() => this.navigateTo('event')}
          className={`side-container__item ${category === 'event' ? 'active' : ''}`}
        >
          <i className="fa fa-globe" />
      Events
        </div>
        <div
          role="presentation"
          onClick={() => this.navigateTo('announcement')}
          className={`side-container__item ${category === 'announcement' ? 'active' : ''}`}
        >
          <i className="fa fa-globe" />
      Announcements
        </div>
        <div
          role="presentation"
          onClick={() => this.navigateTo('question')}
          className={`side-container__item ${category === 'question' ? 'active' : ''}`}
        >
          <i className="fa fa-globe" />
      Questions
        </div>
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
export const mapStateToProps = ({
  search: {
    searchState,

  },
}) => ({ searchState });

/**
 * Maps dispatches to props
 * @param {*} dispatch
 * @returns {object} props
 */
export const mapDispatchToProps = (dispatch) => ({
  onGetFeed: (limit, itemsLength) => dispatch(getFeed(limit, itemsLength)),
});

export default connect(
  null,
  mapDispatchToProps,
)(HomeLeft);
