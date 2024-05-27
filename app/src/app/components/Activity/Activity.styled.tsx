import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  width: 700px;
  height: 240px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  margin: 0 auto;
`;

export const Image = styled.img`
  width: 250px;
  height: 100%;

  object-fit: cover;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  width: calc(100% - 250px);
`;

export const Title = styled.h3`
  font-size: 24px;
  margin: 0;
  margin-bottom: 5px;
`;

export const City = styled.div`
  font-size: 16px;
  margin-top: 5px;
  color: #000000;
`;

export const Date = styled.span`
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  text-align: right;
  color: #050505;
`;
