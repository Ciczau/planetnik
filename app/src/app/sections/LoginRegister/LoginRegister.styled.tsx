import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

export const LeftContainer = styled.div`
  height: 100%;
  width: 50%;
  background-color: gray;
`;

export const RightContainer = styled.div`
  height: 100%;
  width: 50%;
`;

export const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Information = styled.p`
  b {
    cursor: pointer;
  }
`;
