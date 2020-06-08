import React, { useEffect, useState } from 'react'
import { useTheme } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip } from 'recharts'
import { Grid, CircularProgress } from '@material-ui/core'
import moment from 'moment'

import { getDownloads } from '../../../api/downloads'
import Title from './Title'

const CustomTooltip = ({ payload, label, active }) => {
  if (active) {
    return (
      <div>
        <Typography>Downloads: {payload[0] && payload[0].value}</Typography>
      </div>
    )
  }

  return null
}

const Chart = () => {
  const theme = useTheme()
  const [downloads, setDownloads] = useState()

  useEffect(() => {
    refreshChart()
  }, [])

  const refreshChart = () => {
    getDownloads().then((downloads) => {
      const sortedArray = downloads
        .sort((a, b) => {
          return moment(a.date).format('YYYYMMDD') - moment(b.date).format('YYYYMMDD')
        })
        .map((item) => ({ count: item.count, date: moment(item.date).format('MMMM Do YYYY') }))
      setDownloads(sortedArray)
    })
  }

  return (
    <>
      <Title refresh={refreshChart}>Downloads</Title>
      {downloads ? (
        <Grid style={{ height: 125 }}>
          <ResponsiveContainer>
            <LineChart
              data={downloads}
              margin={{
                top: 16,
                right: 16,
                bottom: 0,
                left: 24,
              }}
            >
              <XAxis dataKey='date' stroke={theme.palette.text.secondary} />
              <YAxis stroke={theme.palette.text.secondary}>
                <Label angle={270} position='left' style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}>
                  Count
                </Label>
              </YAxis>
              <Line type='monotone' dataKey='count' stroke={theme.palette.primary.main} dot={false} />
              <Tooltip content={<CustomTooltip />} />
            </LineChart>
          </ResponsiveContainer>
        </Grid>
      ) : (
        <Grid container justify='center' alignItems='center'>
          <CircularProgress />
        </Grid>
      )}
    </>
  )
}

export default Chart
