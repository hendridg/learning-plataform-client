import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 60rem;
  margin-top: 2rem;
  gap: 1rem;
  @media (min-width: 600px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const ContainerCards = ({ children }) => <Container>{children}</Container>;

ContainerCards.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default ContainerCards;
