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

  h1 {
    margin-bottom: 20px;
  }
`;

export const Information = styled.p`
  margin: 30px 0 15px 0;
  b {
    cursor: pointer;
  }
`;
export const Input = styled.input<{ error: boolean }>`
  padding: 15px;
  width: 400px;
  border: ${({ error }) => (error ? "1px solid red" : "1px solid black")};
  margin-top: 20px;
`;

export const ErrorMessage = styled.div`
  width: 400px;
  text-align: left;
  color: red;
  font-size: 14px;
  margin: 5px 0 0px 4px;
  font-weight: bold;
`;
