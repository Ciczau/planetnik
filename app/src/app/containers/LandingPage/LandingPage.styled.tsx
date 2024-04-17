import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
`;

export const Content = styled.div`
  width: calc(100% - 90px);
  padding: 40px;
`;

export const ContentHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const Warning = styled.div`
  width: 100%;
  font-size: 40px;
  text-align: center;
  color: red;
  margin-top: 200px;
`;
