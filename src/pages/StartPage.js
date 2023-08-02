import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import logoMixed from "../assets/icons/logoMixed.svg";
import mainImage from "../assets/designs/[S22]mainImage.svg";

function StartPage() {
  return (
    <Wrapper>
      <Welcome>
        <img className="logo-mixed" src={logoMixed} alt="베르니 콤비 로고" />
        <p className="sentence1">에 오신 것을 환영합니다!</p>
      </Welcome>
      <Explain>
        <p className="sentence2">
          고전미술, 최신미술, 배리어프리 문화예술관광지와 함께 나만의 세계를
          넓혀 보세요!
        </p>
      </Explain>
      <Buttons>
        <Link to="/signup">
          <button className="signup-btn">회원가입</button>
        </Link>
        <Link to="/login">
          <button className="login-btn">로그인</button>
        </Link>
      </Buttons>
    </Wrapper>
  );
}

export default StartPage;

const Wrapper = styled.div`
  width: 360px;
  height: 731px;
  flex-shrink: 0;
  background-image: url(${mainImage});
`;

const Buttons = styled.div`
  .signup-btn {
    display: flex;
    padding: 12px 16px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    border-radius: 12px;
    background: var(--p-primary-20, #003354);
  }

  .login-btn {
    display: flex;
    padding: 12px 16px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    border-radius: 12px;
    background: var(--p-primary-90, #cfe5ff);
  }
`;

const Welcome = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;

  .logo-mixed {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .sentence1 {
    color: var(--n-neutral-100, #fff);

    /* Heading/1 */
    font-family: Pretendard;
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 30.8px */
  }
`;

const Explain = styled.div`
  align-self: stretch;

  .sentence2 {
    color: var(--n-neutral-80, #c6c6c9);
    text-align: center;

    /* Body/3 */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 19.6px */
  }
`;
