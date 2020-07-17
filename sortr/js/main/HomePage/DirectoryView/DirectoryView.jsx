import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Image from 'react-bootstrap/Image';
import styles from '../styles';

const DirectoryView = () => (
  <Container className="px-4 pb-4 pt-2 h-100" style={styles.outline}>
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

const SearchBar = () => (
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

export default DirectoryView;
