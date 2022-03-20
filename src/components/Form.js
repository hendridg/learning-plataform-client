import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ContainerForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  width: 50%;
  min-width: 18rem;
  max-width: 30rem;
  @media (min-width: 600px) {
    flex-direction: row;
    flex-wrap: wrap;
  }

  input,
  textarea,
  select {
    padding: 1em;
  }

  textarea {
    min-height: 6rem;
  }
`;

const Form = ({ children, onSubmit }) => (
  <ContainerForm onSubmit={onSubmit}>{children}</ContainerForm>
);

Form.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  onSubmit: PropTypes.func,
};

Form.defaultProps = {
  onSubmit: () => {},
};

export default Form;
