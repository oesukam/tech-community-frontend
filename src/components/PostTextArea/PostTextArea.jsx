import React, { Component } from 'react';
import { Picker } from 'emoji-mart';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import postAction from '../../actions/postActions';
import Button from '../Button/Button';
import 'emoji-mart/css/emoji-mart.css';
import './PostTextArea.scss';

export class PostTextArea extends Component {
  state = {
    value: '',
    rows: 3,
    showEmojiPicker: false,
  };

  imageInput = React.createRef();
  emojiToggle = React.createRef();

  componentDidUpdate = prevProps => {
    const { tick } = this.props;
    if (prevProps.tick !== tick)
      this.setState({ value: '', rows: 3, showEmojiPicker: false });
  };

  componentDidMount() {
    window.addEventListener('click', e => {
      const {
        target: { id, parentNode },
      } = e;
      let isEmoji = false;
      let node = parentNode;
      for (let i = 0; i < 6; i++) {
        if (!node.classList) break;
        isEmoji = node && node.classList.contains('emoji-mart');
        node = node.parentNode;
        if (isEmoji) break;
      }
      if (id !== 'emoji-btn' && !isEmoji) {
        this.setState({
          showEmojiPicker: false,
        });
      }
    });
  }

  onChange = e => {
    const textareaLineHeight = 24;
    const { minRows, maxRows } = this.props;
    const { maxChar } = this.props;
    if (maxChar && maxChar <= e.target.value.length) return;

    const previousRows = e.target.rows;
    e.target.rows = minRows; // reset number of rows in textarea

    const currentRows = ~~(e.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      e.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      e.target.rows = maxRows;
      e.target.scrollTop = e.target.scrollHeight;
    }

    this.setState({
      value: e.target.value,
      rows: currentRows < maxRows ? currentRows : maxRows,
    });

    if (this.props.onChange) this.props.onChange(e.target.value);
  };

  onImageChange = e => {
    this.setState({
      imageUrl: URL.createObjectURL(e.target.files[0]),
      image: e.target.files[0],
    });
  };

  restoreImage = () => {
    this.setState({
      imageUrl: '',
      image: {},
    });
  };

  addEmoji = emoji => {
    this.setState({ value: this.state.value + emoji.native });
  };

  toogleOnClickEmojiPicker = () => {
    this.setState({ showEmojiPicker: !this.state.showEmojiPicker });
  };

  submitPost = () => {
    const { value, image = '' } = this.state;
    const { post } = this.props;
    if (value) {
      post({ value, image });
    }
  };

  render() {
    const { showEmojiPicker, value, rows, imageUrl } = this.state;

    const { error, loading, tick } = this.props;

    return (
      <div id="text-area-post">
        <textarea
          className="text-area-post"
          value={value}
          rows={rows}
          onChange={this.onChange}
          placeholder="Write something ..."
        />

        <input
          type="file"
          name="image"
          className="file-upload"
          onChange={this.onImageChange}
          accept="image/gif, image/jpeg, image/png, image/jpg"
          ref={this.imageInput}
          style={{ display: 'none' }}
        />
        <div className="actions">
          <div>
            <label htmlFor="emoji">
              <i
                id="emoji-btn"
                className="fas fa-smile"
                onClick={this.toogleOnClickEmojiPicker}
              />
            </label>
            {!imageUrl ? (
              <i
                className="fas fa-image"
                onClick={() => this.imageInput.current.click()}
              />
            ) : (
              <span id="restore" onClick={this.restoreImage}>
                X
              </span>
            )}

            {imageUrl ? (
              <img className="img-preview" alt="preview" src={imageUrl} />
            ) : null}

            {showEmojiPicker && (
              <Picker
                title="Tech Community"
                emoji="point_up"
                style={{ position: 'absolute', left: 0, top: '100%' }}
                onSelect={this.addEmoji}
              />
            )}
          </div>
          <div>
            <Button
              style={buttonStyle}
              error={error}
              loading={loading}
              text="POST"
              tick={tick}
              onClick={() => this.submitPost()}
            />
          </div>
        </div>
      </div>
    );
  }
}

const buttonStyle = {
  paddingTop: '3px',
  paddingBottom: '3px',
  paddingLeft: '10px',
  paddingRight: '10px',
  fontSize: '0.6em',
};

PostTextArea.propTypes = {
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  loading: PropTypes.bool,
  error: PropTypes.any,
  tick: PropTypes.bool,
};

PostTextArea.defaultProps = {
  minRows: 3,
  maxRows: 15,
  loading: false,
  error: false,
  tick: false,
};

/**
 * Maps the state to props
 * @param {*} { auth }
 * @returns {object} props
 */
export const mapStateToProps = ({ posts }) => {
  const { loading, error, post } = posts;
  return {
    loading,
    error,
    tick: !!post,
  };
};

/**
 * Maps dispatches to props
 * @param {*} dispatch
 * @returns {object} props
 */
export const mapDispatchToProps = dispatch => ({
  post: data => dispatch(postAction(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostTextArea);
