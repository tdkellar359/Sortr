import React, { useState } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import Image from 'react-bootstrap/Image';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Collapse from 'react-bootstrap/Collapse';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, Redirect, useParams } from 'react-router-dom';
import './HomePage.css';
import Form from 'react-bootstrap/Form';

const iconSrc = (ext) => {
  switch(ext) {
    case 'txt':
      return '/static/assets/txt_icon_24x24.png';
    case 'pdf':
      return '/static/assets/pdf_icon_24x24.png';
    default:
      return '/static/assets/file_icon_24x24.png';
  }
}

const HomePage = () => {
  const { pathHash } = useParams();

  const pageStyle = {
    width: '100%',
    height: '100%',
    padding: '20px'
  };

  let path;
  try {
    path = atob(pathHash);
  } catch {
    return <Redirect to="/browse" />
  }

  return (
    <div className="HomePage" style={pageStyle}>
      <Container fluid>
        <Row>
          <Col md={3}>
            <DirectoryView />
          </Col>
          <Col className="ml-3">
            <Row>
              <Col md={12}>
                <Breadcrumb>
                  <BreadCrumbItems path={path} />
                </Breadcrumb>
              </Col>
            </Row>
            <FlatView pathHash={pathHash} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const BreadCrumbItems = ({ path }) => {
  const directories = path.split('/').filter(elt => elt.length !== 0);

  let key = 1;
  let currentPath = '';
  return directories.map((dir, idx) => {
    currentPath += `${dir}/`;

    return (
      <Breadcrumb.Item 
        key={key++}
        linkAs={Link}
        linkProps={{ to: `/browse/${btoa(currentPath)}` }}
        // onClick={() => this.forceUpdate()}
        active={idx === directories.length - 1}
      >
        { dir }
      </Breadcrumb.Item>
    );
  });
}

const outline = {
  border: 'solid lightgrey 0.5px',
  borderRadius: '5px',
  height: '75vh'
};

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
      redirect: null
    };

    this.fetchDirectoryData = this.fetchDirectoryData.bind(this);
    this.loadFolders = this.loadFolders.bind(this);
    this.loadFiles = this.loadFiles.bind(this);
  }

  componentDidMount() {
    const { loadingFolders, loadingFiles } = this.state;
    this.mounted = true;
    console.log('loadingFolders', loadingFolders);
    console.log('loadingFiles', loadingFiles);

    if (!loadingFolders) {
      console.log('Fetching folders');
      this.loadFolders();
    }

    if (!loadingFiles) {
      console.log('Fetching files');
      this.loadFiles();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.pathHash !== prevProps.pathHash) {
      setTimeout(() => this.loadFolders());
      setTimeout(() => this.loadFiles());
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  fetchDirectoryData(url, init, success, failure) {
    init();

    const { pathHash } = this.props;

    fetch(url + pathHash)
      .then(res => {
        if (res.ok)
          return Promise.resolve(res.json());
        
        return Promise.reject(res.statusText);
      })
      .then(data => {
        if (this.mounted)
          success(data.results);
      })
      .catch(err => {
        console.warn('Handled: ', err);
        if (this.mounted)
          failure();
      });
  }

  loadFolders() {
    this.fetchDirectoryData(
      '/api/v1/directory/folders/',
      () => this.setState({
        loadingFolders: true,
        folderError: false
      }),
      (results) => this.setState({
        loadingFolders: false,
        folders: results
      }),
      () => this.setState({
        loadingFolders: false,
        folderError: true,
        redirect: '/browse'
      })
    );
  }

  loadFiles() {
    this.fetchDirectoryData(
      '/api/v1/directory/files/',
      () => this.setState({
        loadingFiles: true,
        fileError: false
      }),
      (results) => this.setState({
        loadingFiles: false,
        files: results
      }),
      () => this.setState({
        loadingFiles: false,
        filesError: true,
        redirect: '/browse'
      })
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
      redirect
    } = this.state;
    
    if (redirect) {
      return <Redirect to={redirect} />
    }

    const { pathHash } = this.props;
    const currentPath = atob(pathHash);

    return (
      <div className="p-4" style={outline}>

        <HeaderAddEdit 
          title="Folders"
          src="/static/assets/add_folder_26x26.png"
          size={24}
          gutter="4"
        />

        <FlexDisplay numChildren={folders.length} fetching={loadingFolders} error={folderError}>
          <FolderComponents currentPath={currentPath} folders={folders} />
        </FlexDisplay>
        
        <HeaderAddEdit 
          title="Files"
          src="/static/assets/add_file_26x26.png"
          size={24}
          gutter="4"
        />

        <FlexDisplay numChildren={files.length} fetching={loadingFiles} error={fileError}>
          <FileComponents currentPath={currentPath} files={files} />
        </FlexDisplay>

      </div>
    );
  }
}

const directoryItemStyle = {
  border: 'solid lightgrey 0.5px',
  borderRadius: '5px',
  padding: '8px'
};

const DirectoryItems = ({data, customIcons, currentPath, spacing}) => {
  let key = 0;
  return data.map((item, idx) => {
    let className = 'directory-item';
    if (idx > 0) {
      className += (spacing ? ` ml-${spacing}` : ' ml-3');
    }

    let ext = null;
    if (customIcons) {
      const fileParts = item.name.split('.').filter(x => x.length !== 0);
      if (fileParts.length > 1)
        ext = fileParts[fileParts.length - 1];
    }

    return (
      <Link
        to={btoa(currentPath + item.name + '/')}
        key={key++}
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
}

const FolderComponents = ({ currentPath, folders }) => {
  return (
    <DirectoryItems
      data={folders}
      currentPath={currentPath}
      customIcons={false}
      spacing="3"
    />
  );
}

const FileComponents = ({ currentPath, files }) => {
  return (
    <DirectoryItems
      data={files}
      currentPath={currentPath}
      customIcons={true}
      spacing="3"
    />
  );
}

const HeaderAddEdit = ({title, src, size, gutter}) => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState([]);
  const className = 'button-icon-background' + (gutter ? ` ml-${gutter}` : ' ml-2');

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h4 style={{ width: '8vw'}}>{ title }</h4>
        <div className={className}>
          <Image
            fluid
            src={src}
            alt="Add"
            height={size}
            width={size}
          />
        </div>
        <div className={className}>
          <Image
            fluid
            src="/static/assets/ellipsis_icon_30x30.png"
            alt="Edit"
            height={size}
            width={size}
            onClick={() => setOpen(!open)}
          />
        </div>
      </div>
      <Collapse in={open}>
        <div>
          <h6>Active Filters:</h6>
          <FilterInput />
          <div className="mb-2 text-center">
            <Link to="#">Add</Link>
          </div>
        </div>
      </Collapse>
      <hr className="mt-0" />
    </>
  );
}

const FilterInput = () => {
  const [dropDownTitle, setDropDownTitle] = useState('Select a Filter');
  const [disabled, setDisabled] = useState(true);
  const [controlType, setControlType] = useState('text');

  const onSelectFilter = (name, dataType) => {
    setDropDownTitle(name);
    setControlType(dataType);
    setDisabled(false);
  }

  return (
    <InputGroup className="mb-3">
      <DropdownButton
        as={InputGroup.Prepend}
        variant="outline-primary"
        title={dropDownTitle}
        id="input-group-dropdown-1"
      >
        <Dropdown.Item onClick={() => onSelectFilter('Alphabetical', 'text')}>Alphabetical</Dropdown.Item>
        <Dropdown.Item onClick={() => onSelectFilter('Date Modified', 'date')}>Date Modified</Dropdown.Item>
        <Dropdown.Item onClick={() => onSelectFilter('Date Created', 'date')}>Date Created</Dropdown.Item>
        <Dropdown.Item onClick={() => onSelectFilter('Limit', 'number')}>Limit</Dropdown.Item>
        <Dropdown.Item onClick={() => onSelectFilter('Search', 'text')}>Search</Dropdown.Item>
      </DropdownButton>
      <Form.Control disabled={disabled} type={controlType}></Form.Control>
      <InputGroup.Append>
        <Button variant="outline-secondary">Remove</Button>
      </InputGroup.Append>
    </InputGroup>
  );
}

const FlexDisplay = ({children, numChildren, fetching, error}) => {
  const flexBox = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: '16px'
  };

  let elt;
  if (fetching && !error) {
    elt = <LoadingAnimation />;
  } else if (!fetching && !error) {
    elt = (
      <div style={flexBox}>
        { numChildren > 0 ? 
            children : 
            <p className="text-muted">Nothing to see here!</p>
        }
      </div>
    );
  } else {
    elt = <p className="text-muted">Uh oh! Something went wrong...</p>
  }

  return (
    <div style={flexBox}>
      { elt }
    </div>
  );
}

const DirectoryView = () => {
  return (
    <Container className="px-4 pb-4 pt-2 h-100" style={outline}>
      <Row>
        <SearchBar />
      </Row>

      <div className="mt-5 text-center">
        <Image
          className="img-fluid"
          src="/static/assets/under_construction.png"
          alt="Under Construction"
        />
      </div>
    </Container>
  );
}

const SearchBar = () => {
  return (
    <InputGroup className="w-100 mt-0">
      <FormControl
        placeholder="Search..."
        aria-label="Search..."
        aria-describedby="basic-addon2"
      />
      <InputGroup.Append>
        <Button variant="primary">Search</Button>
      </InputGroup.Append>
    </InputGroup>
  );
}

const LoadingAnimation = () => {
  return (
    <div className="mt-0">
      <Spinner animation="border" variant="primary" />
    </div>
  );
}

export default HomePage;
