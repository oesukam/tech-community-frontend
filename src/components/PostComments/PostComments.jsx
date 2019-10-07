import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './PostComments.scss';
import { getPostComments } from '../../actions/postComments';
import TimeAgo from '../../components/Helpers/TimeAgo';
import ContentLoader from '../../components/Helpers/ContentLoader';
import defaultAvatar from '../../assets/images/person.png';

export class PostComments extends Component {
  static propTypes = {
    post: PropTypes.shape({
      slug: PropTypes.string.isRequired,
      likesCount: PropTypes.number.isRequired,
    }).isRequired,
  };

  componentWillMount() {
    const {
      post: { slug },
      onGetPostComments,
    } = this.props;
    onGetPostComments(slug);
  }

  render() {
    const {
      post: { likesCount },
      items,
      loading,
    } = this.props;

    const commentsCount = items.length;

    return (
      <div className="post-comments">
        <div className="info">
          <span>
            {commentsCount} Comment{commentsCount !== 1 ? 's' : ''}
          </span>
          <span>
            {likesCount} Like{likesCount !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="posts">
          {loading && <ContentLoader />}

          {items.map(
            ({ author: { picture, username }, createdAt, body }, index) => (
              <div className="post" key={index}>
                <img src={undefined || defaultAvatar} alt="profile" />
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
            ),
          )}
        </div>
      </div>
    );
  }
}

export const mapStateToProps = ({ postComments: { loading, items = [] } }) => ({
  loading,
  items,
});

export const mapDispatchToProps = dispatch => ({
  onGetPostComments: slug => dispatch(getPostComments(slug)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostComments);
