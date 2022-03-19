import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const WrapperCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  max-width: 18rem;
  border: 1px solid lightgray;
  border-radius: 3px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 1rem 0.5rem;
  h2,
  h4,
  p {
    padding: 0;
    margin: 0;
    text-align: left;
  }
  h4 {
    opacity: 0.6;
  }
  p {
    margin-top: 0.6rem;
  }

  div {
    align-self: flex-end;
    margin-top: 1rem;
  }
`;

const Span = styled.span`
  background-color: ${(props) => (props.badgeColor ? '#e67700' : 'yellowgreen')};
  font-size: 0.8em;
  font-weight: bold;
  color: white;
  padding: 0.4em 1em;
  margin-left: 1rem;
  border-radius: 1em;
`;

const Card = (props) => {
  const {
    name, tutor, description, day, hour,
  } = props;
  return (
    <WrapperCard>
      <h2>{name}</h2>
      <h4>{`By ${tutor}`}</h4>
      <p>{description}</p>
      <div>
        <Span badgeColor>{day}</Span>
        <Span>{hour}</Span>
      </div>
    </WrapperCard>
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
  tutor: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  hour: PropTypes.string.isRequired,
};

export default Card;
