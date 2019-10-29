import React from 'react';
import PropTypes from 'prop-types';
import resolvePlaceholder from '../../helpers/resolvePlaceHolder';
import TimeAgo from '../Helpers/TimeAgo';
import Like from '../Like/Like';
import './FeedCard.scss';


const navigateTo = (e, { push, url }) => {
  e.stopPropagation();
  push(url);
};

const FeedCard = ({
  push,
  content: {
    author: { username, picture: profilePicture },
    userType,
    image: postImage,
    description,
    likesCount,
    createdAt,
    liked,
    slug,
    organization,
    commentsCount,
  },
  handleShare,
}) => (
  <div
    role="presentation"
    className="post"
    key={slug}
  >
    <div
      role="presentation"
      className="header"
      onClick={(e) => navigateTo(e, { push, url: `/posts/${slug}` })}
    >
      <div className="right">
        <img
          role="presentation"
          className="image"
          src={resolvePlaceholder(profilePicture, userType)}
          alt="placeholder"
          onClick={(e) => navigateTo(e, {
            push,
            url: `/${userType === 'person' ? 'profiles' : 'organizations'}/${organization || username}`,
          })}
        />

        <div
          className="info"
        >
          <span
            role="presentation"
            className="name"
            onClick={(e) => navigateTo(e, {
              push,
              url: `/${userType === 'person' ? 'profiles' : 'organizations'}/${organization || username}`,
            })}
          >
            {username}
          </span>
          <span className="label">{userType}</span>
        </div>
      </div>

      <div className="date">
        <TimeAgo date={createdAt} />
      </div>
    </div>

    {postImage && (
    <img
      src={postImage}
      onClick={(e) => navigateTo(e, { push, url: `/posts/${slug}` })}
      alt="Post cover"
      role="presentation"
      className="post-image"
    />
    )}

    <div
      role="presentation"
      className="body"
      onClick={(e) => navigateTo(e, { push, url: `/posts/${slug}` })}
    >
      {description}
    </div>

    <div className="category">Web design</div>

    <div
      className="bottom"
    >
      <div className="left">
        <Like {...{ slug, likesCount, liked }} />

        <div
          className="action"
          role="presentation"
          onClick={() => push(`/posts/${slug}`)}
        >
          <i className="far fa-comment-alt" />
          <span className="count">{commentsCount}</span>
        </div>
      </div>

      <div
        role="presentation"
        className="action share"
        onClick={() => handleShare({
          url: `/posts/${slug}`,
          title: `${description.substring(0, 40)}...`,
          content: description,
        })}
      >
        <i className="fas fa-share-alt" />
      </div>
    </div>
  </div>
);

FeedCard.propTypes = {
  push: PropTypes.any,
  content: PropTypes.object,
  handleShare: PropTypes.func,
};


FeedCard.defaultProps = {
  push: {},
  content: { author: {} },
  handleShare: () => '',
};

export default FeedCard;
