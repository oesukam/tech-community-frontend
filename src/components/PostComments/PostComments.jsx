import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './PostComments.scss';
import { getPostComments } from '../../actions/postComments';
import TimeAgo from '../Helpers/TimeAgo';
import ContentLoader from '../Helpers/ContentLoader';
import defaultAvatar from '../../assets/images/person.png';

export class PostComments extends Component {
  componentDidMount() {
    const {
      slug,
      onGetPostComments,
    } = this.props;
    onGetPostComments(slug);
  }

  render() {
    const {
      items,
      loading,
    } = this.props;

    return (
      <div className="post-comments">
        <div className="posts">
          {loading && <ContentLoader />}

          {!loading && items.map(({
            author: { username, picture: profilePicture }, createdAt, body, _id,
          }) => (
            <div className="post" key={_id}>
              <img src={profilePicture || defaultAvatar} alt="profile" />
              <div className="right">
                <div className="top">
                  <span className="name">{username}</span>
                  <span className="date">
                    <TimeAgo date={createdAt} />
                  </span>
                </div>
                <div className="body">{body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

PostComments.propTypes = {
  items: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
  onGetPostComments: PropTypes.func.isRequired,
};

export const mapStateToProps = ({ postComments: { loading, items = [] } }) => ({
  loading,
  items,
});

export const mapDispatchToProps = (dispatch) => ({
  onGetPostComments: (slug) => dispatch(getPostComments(slug)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostComments);
