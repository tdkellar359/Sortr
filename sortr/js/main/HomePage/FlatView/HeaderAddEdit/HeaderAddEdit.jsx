import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';
import Collapse from 'react-bootstrap/Collapse';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FilterInput from './FilterInput';
import styles from '../../styles';
import './HeaderAddEdit.css';

const HeaderAddEdit = ({
  title,
  src,
  size,
  gutter,
}) => {
  const [open, setOpen] = useState(false);
  const className = `button-icon-background ml-${gutter}`;

  const popover = (
    <Popover>
      <Popover.Title as="h2">Create</Popover.Title>
      <Popover.Content>
        <InputGroup>
          <Form.Control type="text" placeholder="Name" required />
          <InputGroup.Append>
            <Button variant="primary">
              Add New
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <div className="my-2 text-center text-muted">
          - or -
        </div>
        <div className="text-center">
          <Button variant="outline-secondary">
            Upload Existing
          </Button>
        </div>
      </Popover.Content>
    </Popover>
  );

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h4 style={{ width: '8vw' }}>{ title }</h4>
        <OverlayTrigger trigger="click" placement="right" overlay={popover} rootClose>
          <div className={className}>
            <Image
              fluid
              src={src}
              alt="Add"
              height={size}
              width={size}
            />
          </div>
        </OverlayTrigger>
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
          <div style={styles.filersStyle}>
            <h6>Filters:</h6>
            <FilterInput active />
            <FilterInput active={false} />
            <div className="mb-2 text-center text-primary">
              Add
            </div>
          </div>
        </div>
      </Collapse>
      <hr className={open ? 'mt-0' : 'mt-1'} />
    </>
  );
};

HeaderAddEdit.propTypes = {
  title: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  size: PropTypes.number,
  gutter: PropTypes.number,
};

HeaderAddEdit.defaultProps = {
  size: 24,
  gutter: 2,
};

export default HeaderAddEdit;
