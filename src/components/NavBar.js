import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const WrapperNav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: #1f1f1f; */
  background: #228be6;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 1rem 2rem;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 60rem;
`;

const NavLinks = styled.div`
  display: none;
  flex: 1;
  justify-content: space-between;
  gap: 0.5rem;
  @media (min-width: 600px) {
    display: flex;
  }
`;

const TitleApp = styled.h1`
  flex: 2;
  text-align: left;
  color: white;
`;

const Link = styled(NavLink)`
  text-decoration: none;
  letter-spacing: 2px;
  font-size: 1em;
  font-weight: bold;
  color: #a9adc1;
  margin-left: 1.3em;
  :after {
    content: '';
    height: 4px;
    border-radius: 5px;
    display: block;
    position: relative;
    top: 3px;
    background-color: #ffd644;
    color: #a9adc1;

    transform: scaleX(0);
    transition: 500ms;
    transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
  }
  :hover {
    color: #ffd644;
    :after {
      transform: scaleX(1);
    }
  }
  &.active {
    color: white;
    :after {
      content: '';
      height: 4px;
      border-radius: 5px;
      display: block;
      position: relative;
      top: 3px;
      background-color: white;
      transform: scaleX(1);
    }
  }
`;

const MenuBtn = styled.button`
  display: flex;
  background: none;
  border: none;
  cursor: pointer;
  @media (min-width: 600px) {
    display: none;
  }
  img {
    width: 2rem;
    height: 1.5rem;
  }
`;

const CloseBtn = styled.button`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  @media (min-width: 600px) {
    display: none;
  }
  img {
    width: 2rem;
    height: 1.5rem;
  }
`;

const DropdownLink = styled(NavLink)`
  padding: 3rem 0;
  text-decoration: none;
  letter-spacing: 2px;
  font-size: 1em;
  font-weight: bold;
  color: #a9adc1;
  &.active {
    color: white;
    background-color: #1f1f1f;
  }
`;

const DropDownContent = styled.div`
  padding: 0;
  display: ${(props) => (props.setVisible ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  background: #000;
  top: 0;
  left: 0%;
  right: 0%;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  @media (min-width: 600px) {
    display: none;
  }
`;

const NavBar = () => {
  const [viewDropdown, setviewDropdown] = useState(false);
  return (
    <WrapperNav>
      <Container>
        <TitleApp>online learning</TitleApp>
        <NavLinks>
          <Link to="/">courses</Link>
          <Link to="/tutors">tutors</Link>
          <Link to="/students">students</Link>
          <Link to="/querys">querys</Link>
        </NavLinks>
        <MenuBtn type="button" onClick={() => setviewDropdown(true)}>
          <img src="/menu-icon.svg" alt="menu" />
        </MenuBtn>
        <DropDownContent setVisible={viewDropdown}>
          <CloseBtn type="button" onClick={() => setviewDropdown(false)}>
            <img src="/Icon-Cancel.svg" alt="close" />
          </CloseBtn>
          <DropdownLink to="/">courses</DropdownLink>
          <DropdownLink to="/tutors">tutors</DropdownLink>
          <DropdownLink to="/students">students</DropdownLink>
          <DropdownLink to="/querys">querys</DropdownLink>
        </DropDownContent>
      </Container>
    </WrapperNav>
  );
};

export default NavBar;
