import { Route, Routes } from "react-router-dom"
import { Modal } from "./components"
import { AboutUs, Home, OurAgents, Properties, PublicLayout, Search } from "./pages/public"
import {path} from './utils/path'
import { useAppStore } from "./store/useAppStore"

const App = () => {
  const {isShowModal} = useAppStore()

  return (
    <div className="relative">
      {isShowModal && 
        <Modal />
      }
      <Routes>
        <Route path={path.PUBLIC_LAYOUT} element={<PublicLayout />}>
          <Route path={path.HOME} element={<Home />}/>
          <Route path={path.ABOUT_US} element={<AboutUs />}/>
          <Route path={path.OUR_AGENTS} element={<OurAgents />}/>
          <Route path={path.PROPERTIES} element={<Properties />}/>
          <Route path={path.SEARCH} element={<Search />}/>
        </Route>

      </Routes>
    </div>
  )
}

export default App

