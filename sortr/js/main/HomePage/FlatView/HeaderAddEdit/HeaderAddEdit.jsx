import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';
import Collapse from 'react-bootstrap/Collapse';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
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
  const [showModal, setShowModal] = useState(false);
  const className = `button-icon-background ml-${gutter}`;

  const popover = (
    <Popover>
      <Popover.Title as="h3">Add</Popover.Title>
      <Popover.Content>
        <Button
          as="div"
          onClick={() => setShowModal(true)}
        >
          Add New
        </Button>
        <hr className="my-2" />
        <Button
          as="div"
        >
          Upload Existing
        </Button>
      </Popover.Content>
    </Popover>
  );

  const handleClose = () => {
    setShowModal(false);
  };

  // TODO: Make this say file/folder instead of item
  const modal = (
    <Modal centered show={showModal} onHide={handleClose}>
      <Modal.Header>
        <h3>Add New Item</h3>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>
              Name
            </Form.Label>
            <Form.Control type="text" placeholder="Name" required />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary">
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h4 style={{ width: '8vw' }}>{ title }</h4>
        <div className={className}>
          <OverlayTrigger trigger="click" placement="right" overlay={popover} rootClose>
            <Image
              fluid
              src={src}
              alt="Add"
              height={size}
              width={size}
            />
          </OverlayTrigger>
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
      { modal }
      <Collapse in={open}>
        <div style={styles.filersStyle}>
          <h6>Filters:</h6>
          <FilterInput active />
          <FilterInput active={false} />
          <div className="mb-2 text-center text-primary">
            Add
          </div>
        </div>
      </Collapse>
      <hr className="mt-0" />
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
