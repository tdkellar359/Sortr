import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link, useParams } from 'react-router-dom';
import FlatView from './FlatView/FlatView';
import DirectoryView from './DirectoryView/DirectoryView';
import './HomePage.css';

const HomePage = () => {
  const { pathHash } = useParams();

  const pageStyle = {
    width: '100%',
    height: '100%',
  };

  let path;
  try {
    path = atob(pathHash);
  } catch (err) {
    console.error(err);
  }

  return (
    <div className="HomePage p-3" style={pageStyle}>
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
  const directories = path.split('/').filter((elt) => elt.length !== 0);

  let key = 0;
  let currentPath = '';
  return directories.map((dir, idx) => {
    if (idx === 0) {
      currentPath += dir;
    } else {
      currentPath += `/${dir}`;
    }

    key += 1;
    return (
      <Breadcrumb.Item
        key={key}
        linkAs={Link}
        linkProps={{ to: `/browse/${btoa(currentPath)}` }}
        active={idx === directories.length - 1}
      >
        { dir }
      </Breadcrumb.Item>
    );
  });
};

export default HomePage;
