import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const InsightsPage = () => {
  return (
    <>
      <MetaTags title="Insights" description="Insights page" />

      <h1>InsightsPage</h1>
      <p>
        Find me in <code>./web/src/pages/InsightsPage/InsightsPage.tsx</code>
      </p>
      <p>
        My default route is named <code>insights</code>, link to me with `
        <Link to={routes.insights()}>Insights</Link>`
      </p>
    </>
  )
}

export default InsightsPage
