import { useState } from "react";

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)
const StatisticLine = props => <div>{props.name}: {props.value}</div>

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <div>
      <StatisticLine name="good" value={props.good} />
      <StatisticLine name="neutral" value={props.neutral} />
      <StatisticLine name="bad" value={props.bad} />
      <StatisticLine name="all" value={props.all} />
      <StatisticLine name="average" value={props.average} />
      <StatisticLine name="positive" value={props.positive} />
    </div>
  )
}
const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => {
        setGood(good + 1)
        setAll(all + 1)
        setPositive(((good + 1) / (all + 1)) * 100)
        setAverage(((good + 1) - bad) / (all + 1))
      }} text="good" />
      <Button handleClick={() => {
        setNeutral(neutral + 1)
        setAll(all + 1)
        setPositive(((good) / (all + 1)) * 100)
        setAverage(((good) - bad) / (all + 1))
      }} text="neutral" />
      <Button handleClick={() => {
        setBad(bad + 1)
        setAll(all + 1)
        setPositive(((good) / (all + 1)) * 100)
        setAverage(((good) - (bad + 1)) / (all + 1))
      }} text="bad" />
      <h1>StatisticLine</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </div>
  )
}

export default App