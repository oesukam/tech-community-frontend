import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import TAGS from '../../constants/tags';
import './index.scss';

const TagsDropDown = ({ onTagsSelected }) => {
  const { tick } = useSelector(({ posts }) => posts);

  const [showTags, setShowTags] = useState();
  const optionTags = TAGS.map((TAG) => ({
    selected: false,
    text: TAG,
  }));
  const [tags, setTags] = useState(optionTags);
  const handleSelectTag = (tag) => {
    setTags(
      tags.map((TAG) => {
        if (TAG.text === tag) {
          return {
            text: tag,
            selected: !TAG.selected,
          };
        }
        return TAG;
      }),
    );

    const selectedTagsArray = tags
      .filter(({ selected }) => selected)
      .map(({ text }) => text);

    onTagsSelected([...selectedTagsArray, tag]);
  };

  useEffect(() => {
    if (tick) {
      setTags(optionTags);
    }
  }, [tick]);

  const selectedTags = tags.filter(({ selected }) => selected);

  return (
    <div
      className="tags"
      onMouseEnter={() => setShowTags(true)}
      onMouseLeave={() => setShowTags(false)}
    >
      <div className="tags__trigger">
        <div>+ Tags</div>
        {selectedTags.length > 0 && (
          <div className="tags__trigger--count">{selectedTags.length}</div>
        )}
      </div>
      {showTags && (
        <div className="tags__options">
          {tags.map(({ text, selected }) => (
            <div className="tags__options--option">
              <div>{text}</div>
              <input
                type="checkbox"
                checked={selected}
                onClick={() => handleSelectTag(text)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

TagsDropDown.defaultProps = {};

TagsDropDown.propTypes = {
  onTagsSelected: PropTypes.func.isRequired,
};

export default TagsDropDown;
