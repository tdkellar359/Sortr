import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { FolderComponents, FileComponents } from './DirectoryItems/DirectoryItems';
import { getFiles, getFolders } from '../../../api/directory';
import FlexDisplay from './FlexDisplay';
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

    this.loadFolders = this.loadFolders.bind(this);
    this.loadFiles = this.loadFiles.bind(this);
  }

  componentDidMount() {
    this.updateView();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.updateView();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateView() {
    const {
      loadingFolders,
      folderError,
      loadingFiles,
      fileError,
    } = this.state;
    this.mounted = true;

    if (!loadingFolders && !folderError) {
      this.loadFolders();
    }

    if (!loadingFiles && !fileError) {
      this.loadFiles();
    }
  }

  loadFolders() {
    const { pathHash } = this.props;

    this.setState({
      loadingFolders: true,
      folderError: false,
    });

    getFolders(pathHash)
      .then((data) => {
        this.setState({
          loadingFolders: false,
          folders: data.results,
        });
      })
      .catch((err) => {
        console.error(err);

        this.setState({
          loadingFolders: false,
          folderError: true,
        });
      });
  }

  loadFiles() {
    const { pathHash } = this.props;

    this.setState({
      loadingFiles: true,
      fileError: false,
    });

    getFiles(pathHash)
      .then((data) => {
        console.log(data);
        this.setState({
          loadingFiles: false,
          files: data.results,
        });
      })
      .catch((err) => {
        console.error(err);

        this.setState({
          loadingFiles: false,
          fileError: true,
        });
      });
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

        <FlexDisplay
          numChildren={folders ? folders.length : 0}
          fetching={loadingFolders}
          error={folderError}
        >
          <FolderComponents currentPath={currentPath} folders={folders || []} />
        </FlexDisplay>

        <HeaderAddEdit
          title="Files"
          src="/static/assets/add_file_26x26.png"
          size={24}
          gutter={4}
        />

        <FlexDisplay
          numChildren={files ? files.length : 0}
          fetching={loadingFiles}
          error={fileError}
        >
          <FileComponents currentPath={currentPath} files={files || []} />
        </FlexDisplay>

      </div>
    );
  }
}

FlatView.propTypes = {
  pathHash: PropTypes.string.isRequired,
};

export default FlatView;
