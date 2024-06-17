import { FaHeart, FaRegHeart, FaRegSave, FaSave } from "react-icons/fa";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  width: 700px;
  height: 240px;
  border: 1px solid #ccc;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
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

  div {
    padding-right: 30px;
  }
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

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  position: absolute;
  right: 20px;
  top: 20px;
`;

export const HeartFilledIcon = styled(FaHeart)`
  color: red;
  height: 25px;
  width: 25px;
  cursor: pointer;
`;

export const HeartEmptyIcon = styled(FaRegHeart)`
  color: #929292;
  height: 25px;
  width: 25px;
  cursor: pointer;
`;

export const SaveFilledIcon = styled(FaSave)`
  color: #009945;
  height: 25px;
  width: 25px;
  cursor: pointer;
`;

export const SaveEmptyIcon = styled(FaRegSave)`
  color: #929292;
  height: 25px;
  width: 25px;
  cursor: pointer;
`;
