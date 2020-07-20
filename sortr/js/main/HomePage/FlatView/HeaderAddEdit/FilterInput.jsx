import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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

export default FilterInput;
