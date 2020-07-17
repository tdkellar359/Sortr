import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';
import Collapse from 'react-bootstrap/Collapse';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from '../../styles';

const HeaderAddEdit = ({
  title,
  src,
  size,
  gutter,
}) => {
  const [open, setOpen] = useState(false);
  const className = `button-icon-background ml-${gutter}`;

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h4 style={{ width: '8vw' }}>{ title }</h4>
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

const FilterInput = ({ active }) => {
  const [dropDownTitle, setDropDownTitle] = useState('Select a Filter');
  const [disabled, setDisabled] = useState(true);
  const [controlType, setControlType] = useState('text');

  const onSelectFilter = (name, dataType) => {
    setDropDownTitle(name);
    setControlType(dataType);
    setDisabled(false);
  };

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
        <Button
          variant={active ? 'outline-warning' : 'outline-success'}
        >
          {active ? 'Disable' : 'Enable'}
        </Button>
      </InputGroup.Append>
      <InputGroup.Append>
        <Button variant="outline-danger">Remove</Button>
      </InputGroup.Append>
    </InputGroup>
  );
};

FilterInput.propTypes = {
  active: PropTypes.bool.isRequired,
};

export default HeaderAddEdit;
