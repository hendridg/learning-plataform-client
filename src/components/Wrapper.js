import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const WrapperContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
`;

const Wrapper = ({ children }) => (
  <WrapperContainer>{children}</WrapperContainer>
);

Wrapper.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Wrapper;
