import React, { Component } from 'react';
import { Picker } from 'emoji-mart';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import 'emoji-mart/css/emoji-mart.css';
import './PostTextArea.scss';

export class PostTextArea extends Component {
  state = {
    value: '',
    rows: 3,
    show: false,
    showEmojiPicker: false,
    disabled: true,
  };

  imageInput = React.createRef();
  emojiToggle = React.createRef();

  componentDidUpdate = prevProps => {
    const { tick } = this.props;
    if (prevProps.tick !== tick)
      this.setState({
        value: '',
        rows: 3,
        showEmojiPicker: false,
        imageUrl: '',
        image: {},
      });
  };

  componentDidMount() {
    window.addEventListener('click', e => {
      const {
        target: { id, parentNode },
      } = e;
      let isEmoji = false;
      let node = parentNode;
      for (let i = 0; i < 6; i++) {
        if (!node) break;
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
    const { minChar, maxChar } = this.props;
    if (maxChar && maxChar <= e.target.value.length - 1) return;

    if (e.target.value.length >= minChar) this.setState({ disabled: false });
    if (e.target.value.length < minChar) this.setState({ disabled: true });

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

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  submitPost = () => {
    const { value, image = '' } = this.state;
    const { post } = this.props;
    if (value) {
      post({ value, image });
    }
  };

  render() {
    const { showEmojiPicker, value, rows, imageUrl, disabled } = this.state;

    const { loading, tick, maxChar } = this.props;
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
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <img
            className="img-preview"
            style={{ width: '70%' }}
            alt="preview"
            src={imageUrl}
            onClick={this.showModal}
          />
        </Modal>
        {imageUrl ? (
          <div className="image">
            <div className="remove-image" onClick={this.restoreImage}>
              <span>&times;</span>
            </div>
            <img
              className="img-preview"
              alt="preview"
              src={imageUrl}
              onClick={this.showModal}
            />
          </div>
        ) : null}
        <div className="actions">
          <div>
            <i
              id="emoji-btn"
              className="fas fa-smile"
              onClick={this.toogleOnClickEmojiPicker}
            />
            <i
              className="fas fa-image"
              onClick={() => this.imageInput.current.click()}
            />

            {showEmojiPicker && (
              <Picker
                title="Tech Community"
                emoji="point_up"
                style={{ position: 'absolute', left: 0, top: '100%' }}
                onSelect={this.addEmoji}
              />
            )}
          </div>
          <div
            title={disabled ? 'The minimum number of character is 50' : ''}
            className="post-action"
          >
            <span
              className="number-character"
              style={{ color: disabled ? '#fff' : '#13c39a' }}
            >
              {value.length}/{maxChar}
            </span>
            <Button
              style={buttonStyle}
              loading={loading}
              text="POST"
              disabled={disabled}
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
  paddingTop: '5px',
  paddingBottom: '5px',
  paddingLeft: '10px',
  paddingRight: '10px',
  fontSize: '10px',
};

PostTextArea.propTypes = {
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  minChar: PropTypes.number,
  maxChar: PropTypes.number,
  loading: PropTypes.bool,
  tick: PropTypes.bool,
  post: PropTypes.func.isRequired,
};

PostTextArea.defaultProps = {
  minRows: 3,
  maxRows: 15,
  minChar: 50,
  maxChar: 500,
  loading: false,
  tick: false,
};

export default PostTextArea;
