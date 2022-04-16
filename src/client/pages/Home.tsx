import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector } from '../hooks/redux';
import { fetchLogOut, selectAuth } from '../features/auth/authSlice';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function Home() {
  const navigate = useNavigate();
  const dispatcher = useDispatch();

  const { user } = useSelector((state) =>
    useAppSelector((state) => selectAuth(state))
  );

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);

  return (
    <Container>
      {user && (
        <>
          <h3>{user.name} 님 안녕하세요!</h3>
          <p>email : {user.email}</p>

          <button
            onClick={() => {
              console.log('test');
              dispatcher(fetchLogOut());
            }}
          >
            로그아웃
          </button>
        </>
      )}
    </Container>
  );
}

export default Home;
