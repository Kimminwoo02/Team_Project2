import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { logIn, selectAuth } from '../features/auth/authSlice';
import SocialLink from '../components/SocialLink';
import '../style/login.scss';

const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > h1 {
    font-size: 20pt;
    font-weight: bold;
  }

  > div {
    margin-top: 20px;
  }
`;



function Login() {
  const navigate = useNavigate();

  const dispatcher = useDispatch();

  const { user } = useSelector((state) =>
    useAppSelector((state) => selectAuth(state))
  );

  useEffect(() => {
    fetch('/api/auth/check').catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user]);

  return (
    <Container>
      <h1>주문모아</h1>
      <div className='sns'>
        <SocialLink title="구글 로그인" social="google" />
        <SocialLink title="카카오 로그인" social="kakao" />
        <SocialLink title="네이버 로그인" social="naver" />
      </div>
    </Container>
  );
}

export default Login;
