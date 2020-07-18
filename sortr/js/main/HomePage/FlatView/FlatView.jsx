import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';
import { Redirect } from 'react-router-dom';
import { FolderComponents, FileComponents } from './DirectoryItems/DirectoryItems';
import HeaderAddEdit from './HeaderAddEdit/HeaderAddEdit';
import styles from '../styles';

class FlatView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingFolders: false,
      folderError: false,
      loadingFiles: false,
      fileError: false,
      folders: [],
      files: [],
      redirect: null,
    };

    this.fetchDirectoryData = this.fetchDirectoryData.bind(this);
    this.loadFolders = this.loadFolders.bind(this);
    this.loadFiles = this.loadFiles.bind(this);
  }

  componentDidMount() {
    const { loadingFolders, loadingFiles } = this.state;
    this.mounted = true;

    if (!loadingFolders) {
      this.loadFolders();
    }

    if (!loadingFiles) {
      this.loadFiles();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const { loadingFolders, loadingFiles } = this.state;
      if (!loadingFolders) {
        this.loadFolders();
      }

      if (!loadingFiles) {
        this.loadFiles();
      }
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  fetchDirectoryData(url, init, success, failure) {
    init();

    const { pathHash } = this.props;

    fetch(url + pathHash)
      .then((res) => {
        if (res.ok) {
          return Promise.resolve(res.json());
        }

        return Promise.reject(res.statusText);
      })
      .then((data) => {
        if (this.mounted) {
          success(data.results);
        }
      })
      .catch((err) => {
        console.warn('Handled: ', err);
        if (this.mounted) {
          failure();
        }
      });
  }

  loadFolders() {
    this.fetchDirectoryData(
      '/api/v1/directory/folders/',
      () => this.setState({
        loadingFolders: true,
        folderError: false,
      }),
      (results) => this.setState({
        loadingFolders: false,
        folders: results,
      }),
      () => this.setState({
        loadingFolders: false,
        folderError: true,
        redirect: '/browse',
      }),
    );
  }

  loadFiles() {
    this.fetchDirectoryData(
      '/api/v1/directory/files/',
      () => this.setState({
        loadingFiles: true,
        fileError: false,
      }),
      (results) => this.setState({
        loadingFiles: false,
        files: results,
      }),
      () => this.setState({
        loadingFiles: false,
        fileError: true,
        redirect: '/browse',
      }),
    );
  }

  render() {
    const {
      loadingFolders,
      folderError,
      loadingFiles,
      fileError,
      folders,
      files,
      redirect,
    } = this.state;

    if (redirect) {
      return <Redirect to={redirect} />;
    }

    const { pathHash } = this.props;
    const currentPath = atob(pathHash);

    return (
      <div className="p-4" style={styles.outline}>

        <HeaderAddEdit
          title="Folders"
          src="/static/assets/add_folder_26x26.png"
          size={24}
          gutter={4}
        />

        <FlexDisplay numChildren={folders.length} fetching={loadingFolders} error={folderError}>
          <FolderComponents currentPath={currentPath} folders={folders} />
        </FlexDisplay>

        <HeaderAddEdit
          title="Files"
          src="/static/assets/add_file_26x26.png"
          size={24}
          gutter={4}
        />

        <FlexDisplay numChildren={files.length} fetching={loadingFiles} error={fileError}>
          <FileComponents currentPath={currentPath} files={files} />
        </FlexDisplay>

      </div>
    );
  }
}

FlatView.propTypes = {
  pathHash: PropTypes.string.isRequired,
};

const FlexDisplay = ({
  children,
  numChildren,
  fetching,
  error,
}) => {
  const flexBox = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: '16px',
  };

  let elt;
  if (fetching && !error) {
    elt = <LoadingAnimation />;
  } else if (!fetching && !error) {
    elt = (
      <div style={flexBox}>
        { numChildren > 0
          ? children
          : <p className="text-muted">Nothing to see here!</p> }
      </div>
    );
  } else {
    elt = <p className="text-muted">Uh oh! Something went wrong...</p>;
  }

  return (
    <div style={flexBox}>
      { elt }
    </div>
  );
};

FlexDisplay.propTypes = {
  children: PropTypes.node.isRequired,
  numChildren: PropTypes.number.isRequired,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};

const LoadingAnimation = () => (
  <div className="mt-0">
    <Spinner animation="border" variant="primary" />
  </div>
);

export default FlatView;
