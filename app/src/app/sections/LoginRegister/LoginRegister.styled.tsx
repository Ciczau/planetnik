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
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 50px;
`;

export const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  width: 300px;
`;

export const Information = styled.p`
  margin: 20px 0;
  b {
    cursor: pointer;
  }
`;
