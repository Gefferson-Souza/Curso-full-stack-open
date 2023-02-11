import { useState } from "react";

const Header = () => <h1>Give Feeedback</h1>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticsLine = (props) => {
  return (
    <>
      <tbody>
        <tr>
          <td>{props.text}</td>
          <td>{props.value}</td>
        </tr>
      </tbody>
    </>
  );
};
const Statistics = (props) => {
  return (
    <>
      <h2>Statistics</h2>
      <table>
        <StatisticsLine text="good" value={props.good} />
        <StatisticsLine text="neutral" value={props.neutral} />
        <StatisticsLine text="bad" value={props.bad} />
        <StatisticsLine text="all" value={props.all} />
        <StatisticsLine text="average" value={props.average} />
        <StatisticsLine text="positive" value={props.positive} />
      </table>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (param) => {
    if (param === "good") {
      return setGood((prevValue) => prevValue + 1);
    } else if (param === "neutral") {
      return setNeutral((prevValue) => prevValue + 1);
    } else if (param === "bad") {
      return setBad((prevValue) => prevValue + 1);
    }
  };
  console.log(good, neutral, bad);
  const all = good + neutral + bad;
  const average = (all / 3).toFixed(3);
  const positive = ((good / all) * 100).toFixed(2) + "%";

  return (
    <div>
      <Header />
      <Button onClick={() => handleClick("good")} text="Good" />
      <Button onClick={() => handleClick("neutral")} text="Neutral" />
      <Button onClick={() => handleClick("bad")} text="Bad" />
      {all ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          all={all}
          average={average}
          positive={positive}
        />
      ) : (
        <div>
          <h2>Statistics</h2>
          <p>No Feeedback given</p>
        </div>
      )}
    </div>
  );
};

export default App;
