import {
  FaCloud,
  FaCloudRain,
  FaCloudSunRain,
  FaSearch,
  FaSun,
} from "react-icons/fa";
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
  width: 550px;
  height: 300px;
  padding: 20px;
`;

export const WeatherAlerts = styled.div`
  height: 300px;
  width: calc(100% - 570px);
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.25);
  padding: 20px;
`;

export const RecommendedActivities = styled.div`
  width: 550px;
  height: 400px;
  position: relative;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.25);
  button {
    position: absolute;
    left: 20px;
    bottom: 20px;
  }
  h3 {
    padding: 20px;
  }
  h4 {
    padding: 20px;
  }
`;

export const Glob = styled(WeatherAlerts)`
  height: 400px;
`;
export const Activity = styled.div`
  border-bottom: 1px solid #dddddd;
`;
export const ChartLegend = styled.div`
  margin-top: 10px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const IconsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin: 20px 0;
`;

export const SunIcon = styled(FaSun)`
  width: 25px;
  height: 25px;
  color: #ffdb0e;
`;

export const RainIcon = styled(FaCloudSunRain)`
  width: 25px;
  height: 25px;
  color: #0079b1;
`;

export const CloudIcon = styled(FaCloud)`
  width: 25px;
  height: 25px;
  color: #195383;
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const SearchIcon = styled(FaSearch)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  height: 20px;
  width: 20px;
  color: #3f3f3f;
`;
