/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom"
import { Navigation, Topheader } from "~/components"
import clsx from 'clsx'
import withRouter from "~/hocs/withRouter"

const PublicLayout = ({location}) => {
  return (
    <main>
      <Topheader />
      <Navigation />
      <div className={clsx(location.pathname === '/' ? 'pt-0' : "pt-[191px]")}>
        <Outlet />
      </div>
    </main>
  )
}

export default withRouter(PublicLayout)
