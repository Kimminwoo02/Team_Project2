import styled from '@emotion/styled';
import React from 'react';

const Container = styled.a`
  width: 300px;
  height: 45px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border: 1px solid #000;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);
  margin: 20px;
`;

type Props = {
  title: string;
  social: 'google' | 'naver' | 'kakao';
};

function SocialLink({ title, social }: Props) {
  return (
    <Container href={`/api/auth/social/login/${social}`}>{title}</Container>
  );
}

export default SocialLink;
