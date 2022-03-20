import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Btn = styled.button`
  display: block;
  font-family: 'Poppins', sans-serif;
  font-size: 0.8em;
  padding: 1.5em 3em;
  border-radius: 2em;
  border: none;
  min-width: 10rem;
  background-color: greenyellow;
  color: #1f1f1f;
  background: ${(props) => (props.accent ? 'greenyellow' : '#228be6')};
  font-weight: 500;
  letter-spacing: 1px;
  cursor: pointer;
  transition: box-shadow ease-in-out 300ms, opacity ease-in-out 300ms;
  :hover {
    opacity: 0.9;
    box-shadow: 0px 0px 0px 3px #fff,
      0px 0px 0px 5px ${(props) => (props.accent ? 'greenyellow' : '#228be6')};
  }
`;

const Button = ({
  children, accent, clickBtn, type,
}) => (
  <Btn accent={accent} onClick={clickBtn} type={type}>
    {children}
  </Btn>
);

Button.propTypes = {
  children: PropTypes.string.isRequired,
  accent: PropTypes.bool,
  clickBtn: PropTypes.func,
  type: PropTypes.string,
};

Button.defaultProps = {
  accent: false,
  clickBtn: () => {},
  type: 'button',
};

export default Button;
