import React from 'react';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';

const iconSrc = (ext) => {
  switch (ext) {
    case 'txt':
      return '/static/assets/txt_icon_24x24.png';
    case 'pdf':
      return '/static/assets/pdf_icon_24x24.png';
    default:
      return '/static/assets/file_icon_24x24.png';
  }
};

const directoryItemStyle = {
  border: 'solid lightgrey 0.5px',
  borderRadius: '5px',
  padding: '8px',
};

const DirectoryItems = ({
  data,
  customIcons,
  currentPath,
  spacing,
}) => {
  let key = 0;
  return data.map((item, idx) => {
    let className = 'directory-item';
    if (idx > 0) {
      className += (spacing ? ` ml-${spacing}` : ' ml-3');
    }

    let ext = null;
    if (customIcons) {
      const fileParts = item.name.split('.').filter((x) => x.length !== 0);
      if (fileParts.length > 1) {
        ext = fileParts[fileParts.length - 1];
      }
    }

    key += 1;

    return (
      <Link
        to={btoa(`${currentPath}${item.name}/`)}
        key={key}
        className={className}
        style={directoryItemStyle}
      >
        <div>
          <Image
            fluid
            src={iconSrc(ext)}
            alt="Icon"
          />
          {' '}
          { item.name }
        </div>
      </Link>
    );
  });
};

export const FolderComponents = ({ currentPath, folders }) => (
  <DirectoryItems
    data={folders}
    currentPath={currentPath}
    spacing="3"
  />
);

FolderComponents.propTypes = {
  currentPath: PropTypes.string.isRequired,
  folders: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export const FileComponents = ({ currentPath, files }) => (
  <DirectoryItems
    data={files}
    currentPath={currentPath}
    customIcons
    spacing="3"
  />
);

FileComponents.propTypes = {
  currentPath: PropTypes.string.isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
