import React, { Component } from 'react';
import { Picker } from 'emoji-mart';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import 'emoji-mart/css/emoji-mart.css';
import './PostTextArea.scss';

const buttonStyle = {
  paddingTop: '3px',
  paddingBottom: '3px',
  paddingLeft: '10px',
  paddingRight: '10px',
  fontSize: '0.6em',
};

const categoryButtonStyle = {
  paddingTop: '3px',
  paddingBottom: '3px',
  paddingLeft: '10px',
  paddingRight: '10px',
  fontSize: '1rem',
  width: '100%',
};

export class PostTextArea extends Component {
  state = {
    value: '',
    rows: 3,
    show: false,
    showEmojiPicker: false,
    disabled: true,
    showConfirmCategory: false,
    category: 'general',
  };

  imageInput = React.createRef();

  emojiToggle = React.createRef();

  componentDidMount() {
    window.addEventListener('click', (e) => {
      const {
        target: { id, parentNode },
      } = e;
      let isEmoji = false;
      let node = parentNode;
      for (let i = 0; i < 6; i += 1) {
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

  componentDidUpdate = (prevProps) => {
    const { tick } = this.props;
    if (prevProps.tick !== tick) {
      this.setState({
        value: '',
        rows: 3,
        showEmojiPicker: false,
        imageUrl: '',
        image: {},
      });
    }
  };

  trimedTextLength = (text) => String(text).replace(/\s\s+/g, ' ').length;

  _onChange = (e) => {
    const textareaLineHeight = 24;
    const text = e.target.value;
    const textLength = this.trimedTextLength(text);

    const {
      minRows, maxRows, minChar, maxChar, onChange,
    } = this.props;
    if (maxChar && maxChar <= e.target.value.length - 1) return;

    if (textLength >= minChar) this.setState({ disabled: false });
    if (textLength < minChar) this.setState({ disabled: true });

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

    if (onChange) onChange(e.target.value);
  };

  onImageChange = (e) => {
    this.setState({
      imageUrl: URL.createObjectURL(e.target.files[0]),
      image: e.target.files[0],
    });
  };

  onCategoryChange = ({ target: { id } }) => {
    this.setState({
      category: id,
    });
  }

  restoreImage = () => {
    this.setState({
      imageUrl: '',
      image: {},
    });
  };

  addEmoji = (emoji) => {
    const { minChar } = this.props;
    const { value: textValue } = this.state;
    const value = textValue + emoji.native;

    this.setState({ value });
    if (value.length >= minChar) this.setState({ disabled: false });
  };

  toogleOnClickEmojiPicker = () => {
    const { showEmojiPicker } = this.state;
    this.setState({ showEmojiPicker: !showEmojiPicker });
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  submitPost = () => {
    const {
      onToggleSocialModal, isAuth, post, slug, comment,
    } = this.props;
    if (!isAuth) return onToggleSocialModal(true);

    const {
      value, image = '', showConfirmCategory, category,
    } = this.state;

    if (value && (showConfirmCategory || comment)) {
      post({
        value, image, slug, category,
      });
      this.setState({
        showConfirmCategory: false,
      });
      return;
    }
    this.setState({
      showConfirmCategory: true,
    });
  };

  closeConfirmCategory =() => {
    this.setState({
      showConfirmCategory: false,
    });
  };

  renderConfirmCategory = () => {
    const { showConfirmCategory, category } = this.state;
    const {
      loading,
      tick,
    } = this.props;
    return (
      <Modal show={showConfirmCategory} handleClose={this.closeConfirmCategory}>
        <div className="post-category">
          <h3>Choose post category</h3>
          <p>
            <input
              type="radio"
              id="general"
              name="category"
              onChange={this.onCategoryChange}
              checked={category === 'general'}
            />
            <label htmlFor="general">
              <span>
                <i className="fa fa-globe" />
              </span>
              General
            </label>
          </p>
          <p>
            <input
              type="radio"
              id="job"
              name="category"
              onChange={this.onCategoryChange}
              checked={category === 'job'}
            />
            <label htmlFor="job">
              <span>
                <i className="fa fa-suitcase" />
              </span>
              Jobs
            </label>
          </p>
          <p>
            <input
              type="radio"
              id="event"
              name="category"
              onChange={this.onCategoryChange}
              checked={category === 'event'}
            />
            <label htmlFor="event">
              <span>
                <i className="fa fa-calendar" />
              </span>
              Events
            </label>
          </p>
          <p>
            <input
              type="radio"
              id="annoucement"
              name="category"
              onChange={this.onCategoryChange}
              checked={category === 'annoucement'}
            />
            <label htmlFor="annoucement">
              <span>
                <i className="fa fa-bullhorn" />
              </span>
              Announcements
            </label>
          </p>

          <p>
            <input
              type="radio"
              id="question"
              name="category"
              onChange={this.onCategoryChange}
              checked={category === 'question'}
            />
            <label htmlFor="question">
              <span>
                <i className="fa fa-question" />
              </span>
              Questions
            </label>
          </p>

          <Button
            style={categoryButtonStyle}
            loading={loading}
            text="POST"
            tick={tick}
            onClick={() => this.submitPost()}
          />
        </div>
      </Modal>
    );
  }

  render() {
    const {
      showEmojiPicker,
      value,
      rows,
      imageUrl,
      disabled,
      show,
    } = this.state;

    const textLength = this.trimedTextLength(value);

    const {
      loading,
      tick,
      maxChar,
      allowImagePicker,
      placeholder,
    } = this.props;
    return (
      <>
        {this.renderConfirmCategory()}
        <div id="text-area-post">
          <textarea
            className="text-area-post"
            value={value}
            rows={rows}
            onChange={this._onChange}
            placeholder={placeholder}
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
          <Modal show={show} handleClose={this.hideModal}>
            <img
              role="presentation"
              className="img-preview"
              style={{ width: '70%' }}
              alt="preview"
              src={imageUrl}
              onClick={this.showModal}
            />
          </Modal>
          {imageUrl ? (
            <div className="image">
              <div
                role="presentation"
                className="remove-image"
                onClick={this.restoreImage}
              >
                <span>&times;</span>
              </div>
              <img
                role="presentation"
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
                role="presentation"
                id="emoji-btn"
                className="fas fa-smile"
                onClick={this.toogleOnClickEmojiPicker}
              />
              {allowImagePicker && (
              <i
                role="presentation"
                className="fas fa-image"
                onClick={() => this.imageInput.current.click()}
              />
              )}

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
                {textLength}
                /
                {maxChar}
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
      </>
    );
  }
}

PostTextArea.propTypes = {
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  minChar: PropTypes.number,
  maxChar: PropTypes.number,
  slug: PropTypes.string,
  allowImagePicker: PropTypes.bool,
  placeholder: PropTypes.string,
  loading: PropTypes.bool,
  tick: PropTypes.bool,
  post: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  comment: PropTypes.bool,
  isAuth: PropTypes.bool.isRequired,
  onToggleSocialModal: PropTypes.func.isRequired,
};

PostTextArea.defaultProps = {
  minRows: 3,
  maxRows: 15,
  minChar: 50,
  maxChar: 500,
  slug: null,
  allowImagePicker: true,
  placeholder: 'Write something ...',
  loading: false,
  tick: false,
  onChange: () => '',
  comment: false,
};

export default PostTextArea;
