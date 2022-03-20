import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  flex: ${(props) => props.flexNumber};
  flex-direction: column;
  gap: 1rem;
`;

const ContainerInputs = ({ children, flexNumber }) => (
  <Container flexNumber={flexNumber}>{children}</Container>
);

ContainerInputs.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  flexNumber: PropTypes.number,
};

ContainerInputs.defaultProps = {
  flexNumber: 1,
};

export default ContainerInputs;
