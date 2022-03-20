/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable object-curly-newline */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectTutors,
  fetchPostTutor,
  fetchDeleteTutor,
  fetchPutTutor,
  editTutor,
  deleteTutor,
  initStatusPutTutor,
} from '../redux/tutors/tutors';
import { Button, Form, ContainerInputs } from '../components';

const WrapperContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
`;

const ContainerTutors = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 40rem;
  margin-top: 3rem;
  gap: 0.5rem;
`;

const Tutor = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid lightgray;
  border-radius: 2px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const TutorInfo = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalEdit = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid lightgray;
  border-radius: 2px;
  position: fixed;
  width: 14rem;
  height: 18rem;
  z-index: 10;
`;

const BtnImg = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  img {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const ContainerFields = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 0.5rem;
  max-width: 20rem;
`;

const Tutors = () => {
  const tutors = useSelector(selectTutors);
  const [nameTutor, setnameTutor] = useState('');
  const [secureNumber, setsecureNumber] = useState('');
  const [isRepeatSN, setisRepeatSN] = useState(false);
  const [editName, setEditName] = useState('');
  const [editSecureNumber, seteditSecureNumber] = useState('');
  const [showEdit, setShowEdit] = useState(false);
  const [currentTutor, setcurrentTutor] = useState('');
  const dispatch = useDispatch();

  const clearFields = () => {
    setnameTutor('');
    setsecureNumber('');
  };

  const handleAddTutor = (e) => {
    e.preventDefault();
    if (tutors.find((tutor) => tutor.tutor_sn === secureNumber)) {
      setisRepeatSN(true);
    } else {
      dispatch(
        fetchPostTutor({
          name: nameTutor,
          tutor_sn: secureNumber,
        }),
      );
      setisRepeatSN(false);
      clearFields();
    }
  };

  const handleEditBtn = (tutor) => {
    setShowEdit(true);
    setcurrentTutor(tutor.id);
    setEditName(tutor.name);
    seteditSecureNumber(tutor.tutor_sn);
  };

  const handleEditTutor = (tutor) => {
    setShowEdit(false);
    dispatch(
      editTutor({
        id: tutor.id,
        name: editName,
        tutor_sn: editSecureNumber,
      }),
    );
    dispatch(
      fetchPutTutor({
        id: tutor.id,
        name: editName,
        tutor_sn: editSecureNumber,
      }),
    );
    dispatch(initStatusPutTutor());
  };

  return (
    <WrapperContainer>
      <h3>Tutors</h3>
      <Form onSubmit={handleAddTutor}>
        <ContainerInputs flexNumber={3}>
          <input
            type="text"
            name="name"
            required
            placeholder="name tutor"
            value={nameTutor}
            onChange={({ target }) => setnameTutor(target.value)}
          />
          <input
            type="text"
            name="name"
            required
            placeholder="secure number"
            value={secureNumber}
            onChange={({ target }) => setsecureNumber(target.value)}
          />
        </ContainerInputs>
        <div>
          <Button type="submit">+ Add Tutor</Button>
          {isRepeatSN && (
            <p style={{ color: '#e67700' }}>Secure Number is already used!</p>
          )}
        </div>
      </Form>
      <ContainerTutors>
        {tutors.map((tutor) => (
          <Tutor key={tutor.id}>
            <TutorInfo>
              {showEdit && tutor.id === currentTutor ? (
                <Form>
                  <ContainerInputs>
                    <input
                      value={editName}
                      onChange={({ target }) => setEditName(target.value)}
                    />
                    <input
                      value={editSecureNumber}
                      onChange={({ target }) =>
                        seteditSecureNumber(target.value)
                      }
                    />
                  </ContainerInputs>
                  <div>
                    <Button
                      type="button"
                      clickBtn={() => handleEditTutor(tutor)}
                    >
                      save
                    </Button>
                  </div>
                </Form>
              ) : (
                <>
                  <ContainerFields>
                    <p>{tutor.name}</p>
                    <p>{tutor.tutor_sn}</p>
                  </ContainerFields>
                  <div style={{ display: 'flex', gap: '0.1rem' }}>
                    <BtnImg type="button" onClick={() => handleEditBtn(tutor)}>
                      <img src="/edit-svgrepo-com.svg" alt="edit" />
                    </BtnImg>
                    <BtnImg
                      type="button"
                      onClick={() => {
                        dispatch(fetchDeleteTutor(tutor.id));
                        dispatch(deleteTutor(tutor.id));
                      }}
                    >
                      <img src="/delete-button-svgrepo-com.svg" alt="edit" />
                    </BtnImg>
                  </div>
                </>
              )}
            </TutorInfo>
          </Tutor>
        ))}
      </ContainerTutors>
      {false && (
        <ModalEdit>
          hello
          {/* <input type="text" placeholder="edit name" value={}/>
          <input type="text" placeholder="edit secure number" /> */}
          <button type="button" onClick={() => setShowEdit(false)}>
            close
          </button>
        </ModalEdit>
      )}
    </WrapperContainer>
  );
};

export default Tutors;
