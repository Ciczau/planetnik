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

export const Title = styled.h1``;

export const Subtitle = styled.h2`
  font-weight: 400;
`;

export const SearchInput = styled.input`
  padding: 15px;
  border: none;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.25);
  width: 500px;
`;
export const Warning = styled.div`
  width: 100%;
  font-size: 40px;
  text-align: center;
  color: red;
  margin-top: 200px;
`;
