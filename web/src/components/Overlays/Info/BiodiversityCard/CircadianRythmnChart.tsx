import CircularBarChart from 'src/components/CircularBarChart'
import CircularLineChart from 'src/components/CircularLineChart'
import CircularMultiLineChartWithCSVLoader from 'src/components/CircularMultiLineChart/CircularMultiLineChart'

export const MaximumCircadianRhythmChart = ({
  csvPath,
}: {
  csvPath: string
}) => {
  return (
    <div>
      <h2> Maximum Results </h2>
      <CircularBarChart csvPath={csvPath} />
    </div>
  )
}

export const MedianCircadianRhythmChart = ({ csvPath }) => {
  return (
    <div>
      <h2>Median Results</h2>
      <CircularMultiLineChartWithCSVLoader csvPath={csvPath} />
    </div>
  )
}
