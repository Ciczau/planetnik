import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  overflow: hidden;
  height: 100vh;
`;

export const Container = styled.div`
  width: calc(100% - 90px);
  margin: 0 auto;
  overflow-y: scroll;
  max-width: 1240px;
  padding: 40px;
`;

export const NavigationPanel = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 0px 5px 3px #00000034;
`;

export const Menu = styled.div`
  display: flex;
  gap: 35px;
`;

export const NavigationPanelItem = styled.div<{ active: boolean }>`
  cursor: pointer;
  p {
    font-weight: ${(props) => (props.active ? "700" : "400")};
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
  width: 50%;
  margin: 100px auto;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #000;
`;
