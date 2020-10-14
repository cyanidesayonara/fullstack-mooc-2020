import React from 'react'
import StatisticLine from './StatisticLine'

const Statistics = props => {
  const total = props.good + props.neutral + props.bad
  const average = (props.good - props.bad) / total
  const positive = props.good / total * 100

  const statistics = [
    {
      text: 'good',
      value: props.good
    },
    {
      text: 'neutral',
      value: props.neutral
    },
    {
      text: 'bad',
      value: props.bad,
    },
    {
      text: 'all',
      value: total,
    },
    {
      text: 'average',
      value: average,
    },
    {
      text: 'positive',
      value: positive + ' %',
    }
  ]

  return (
    <div>
      <h1>
        statistics
      </h1>
      {
        (total !== 0)
          ? <table>
            <tbody>
              {
                statistics.map(statistic =>
                  <StatisticLine key={statistic.text} text={statistic.text} value={statistic.value} />
                )
              }
            </tbody>
          </table>
          : <p>No feedback given</p>
      }
    </div>
  )
}

export default Statistics