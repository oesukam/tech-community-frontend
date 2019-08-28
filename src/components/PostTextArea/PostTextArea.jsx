import React, { Component } from 'react';
import { Picker } from 'emoji-mart';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import postAction from '../../actions/postActions';
import 'emoji-mart/css/emoji-mart.css';
import './PostTextArea.scss';

class PostTextArea extends Component {
  state = {
    value: '',
    rows: 3,
    showEmojiPicker: false,
  };

  fileInput = React.createRef();
  imageInput = React.createRef();

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
      image: e.target.files[0]
    })
  }

  restoreImage = () => {
    this.setState({
      imageUrl: '',
      image: {}
    })
  }

  onFileChange = e => {
    this.setState({
      file: URL.createObjectURL(e.target.files[0])
    })
  }

  addEmoji = emoji => {
    this.setState({ value: this.state.value + emoji.native });
  };

  toogleEmojiPicker = () => {
    this.setState({ showEmojiPicker: !this.state.showEmojiPicker });
  };

  submitPost = () => {
    const { value, image = '' } = this.state;
    const { post } = this.props;
    if (value) {
      post({ value, image })
    }
  }

  render() {
    const { showEmojiPicker, value, rows, imageUrl } = this.state;
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
          name="file"
          className="file-upload"
          onChange={this.fileChange}
          ref={this.fileInput}
          style={{ display: 'none' }}
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
            {/* <i
              className="fas fa-paperclip"
              onClick={() => this.fileInput.current.click()}
            /> */}
            <i className="fas fa-smile" onClick={this.toogleEmojiPicker} />
            {!imageUrl ? <i
              className="fas fa-image"
              onClick={() => this.imageInput.current.click()}
            /> : <span onClick={this.restoreImage}>X</span>}
            {imageUrl ? <img className='img-preview' alt='preview' src={imageUrl} /> : null}
            {showEmojiPicker ? (
              <Picker
                title=""
                emoji="point_up"
                style={{ position: 'absolute', left: 0, top: '100%' }}
                onSelect={this.addEmoji}
              />
            ) : null}
          </div>
          <div>
            <button onClick={() => this.submitPost()}>POST</button>
          </div>
        </div>

      </div>
    );
  }
}

PostTextArea.propTypes = {
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
};

PostTextArea.defaultProps = {
  minRows: 3,
  maxRows: 15,
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
  null,
  mapDispatchToProps,
)(PostTextArea);
