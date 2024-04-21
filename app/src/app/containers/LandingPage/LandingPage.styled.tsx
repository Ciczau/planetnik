import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
`;

export const Container = styled.div`
  width: calc(100% - 90px);
  margin: 0 auto;
  max-width: 1240px;
  padding: 40px;
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  max-width: 1240px;
  justify-content: space-between;
`;

export const Warning = styled.div`
  width: 100%;
  font-size: 40px;
  text-align: center;
  color: red;
  margin-top: 200px;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  width: 100%;
  gap: 20px;
  flex-wrap: wrap;
`;

export const Calendar = styled.div`
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.25);
  width: 500px;
  height: 300px;
  padding: 20px;
`;

export const WeatherAlerts = styled.div`
  height: 300px;
  width: calc(100% - 520px);
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.25);
  padding: 20px;
`;

export const RecommendedActivities = styled.div`
  width: 500px;
  height: 300px;
  padding: 20px;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.25);
`;
