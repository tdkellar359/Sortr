import React from 'react';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';
import Fade from 'react-bootstrap/Fade';
import { Link } from 'react-router-dom';

const iconSrc = (ext) => {
  switch (ext) {
    case 'txt':
      return '/static/assets/txt_icon_24x24.png';
    case 'pdf':
      return '/static/assets/pdf_icon_24x24.png';
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return '/static/assets/image_icon_24x24.png';
    case 'docx':
    case 'doc':
      return '/static/assets/word_icon_24x24.png';
    default:
      return '/static/assets/file_icon_24x24.png';
  }
};

const DirectoryItems = ({
  data,
  iconPath,
  currentPath,
  spacing,
}) => {
  let key = 0;
  const directoryItemStyle = {
    border: 'solid lightgrey 0.5px',
    borderRadius: '5px',
    padding: '8px',
    margin: `${spacing}px`,
    flex: '1 1 content',
  };

  return data.map((item) => {
    const className = 'directory-item';

    let ext = null;
    const fileParts = item.itemName.split('.').filter((x) => x.length !== 0);
    if (fileParts.length > 1) {
      ext = fileParts[fileParts.length - 1];
    }

    key += 1;

    // TODO: Make this fade in correctly
    return (
      <Fade appear in mountOnEnter key={key}>
        <Link
          to={btoa(`${currentPath}/${item.itemName}`)}
          className={className}
          style={directoryItemStyle}
        >
          <div>
            <Image
              fluid
              src={iconPath || iconSrc(ext)}
              alt="Icon"
            />
            {' '}
            { item.itemName }
          </div>
        </Link>
      </Fade>
    );
  });
};

export const FolderComponents = ({ currentPath, folders }) => (
  <DirectoryItems
    data={folders}
    currentPath={currentPath}
    iconPath="/static/assets/folder_icon_24x24.png"
    spacing="8"
  />
);

FolderComponents.propTypes = {
  currentPath: PropTypes.string.isRequired,
  folders: PropTypes.arrayOf(
    PropTypes.shape({
      itemName: PropTypes.string.isRequired,
      pathname: PropTypes.string.isRequired,
      objectUrl: PropTypes.string,
    }),
  ).isRequired,
};

export const FileComponents = ({ currentPath, files }) => (
  <DirectoryItems
    data={files}
    currentPath={currentPath}
    spacing="8"
  />
);

FileComponents.propTypes = {
  currentPath: PropTypes.string.isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      itemName: PropTypes.string.isRequired,
      pathname: PropTypes.string.isRequired,
      objectUrl: PropTypes.string,
    }),
  ).isRequired,
};
