import CircularBarChart from 'src/components/CircularBarChart'
import CircularLineChart from 'src/components/CircularLineChart'
import CircularMultiLineChartWithCSVLoader from 'src/components/CircularMultiLineChart/CircularMultiLineChart'

export const BarCircadianRhythmChart = ({
  csvPath,
}: {
  csvPath: string
}) => {
  return (
    <div>
      <h4>Max values</h4>
      <CircularBarChart csvPath={csvPath} />
    </div>
  )
}
export const LineCircadianRhythmChart = ({ csvPath }) => {
  return (
    <div>
      <h4>Frequencies</h4>
      <CircularMultiLineChartWithCSVLoader csvPath={csvPath} />
    </div>
  )
}
