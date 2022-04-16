import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Input from '../components/Input';
import { logIn } from '../features/auth/authSlice';

const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function Register() {
  const dispatcher = useDispatch();

  const [form, setForm] = useState({
    email: '',
    name: '',
    phone: '',
  });

  useEffect(() => {
    fetch('/api/auth/decode/peopleme')
      .then((res) => res.json())
      .then((myJson) => setForm({ ...form, email: myJson.email }))
      .catch((err) => console.error(err));
  }, []);

  const handleResigter = () => {
    fetch('/api/auth/resister', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((myJson) => dispatcher(logIn({ user: myJson })))
      .catch((err) => console.error(err));
  };

  const createChangeTextHandler =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [name]: event.target.value });
    };

  /**
   * Todo2. validation 체크
   */

  return (
    <Container>
      {/**
       * Todo1. 개인정보수집 동의
       */}

      <Input
        label="이메일"
        placeholder="example@email.com"
        value={form.email}
        disabled
      />
      <Input
        label="이름"
        placeholder="홍길동"
        value={form.name}
        onChange={createChangeTextHandler('name')}
      />
      <Input
        label="전화번호"
        placeholder="010-0000-000"
        value={form.phone}
        onChange={createChangeTextHandler('phone')}
      />

      <button onClick={handleResigter}>가입</button>
    </Container>
  );
}

export default Register;
