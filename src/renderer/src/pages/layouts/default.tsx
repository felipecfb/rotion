import { Outlet } from 'react-router-dom'

import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'

import icon from '../../../../../resources/icon.png'

export function Default() {
  return (
    <>
      <header className="mx-5 py-1 region-drag">
        <img src={icon} alt="Ícone" className="w-8 region-no-drag" />
      </header>
      <div className="h-screen w-screen bg-rotion-900 text-rotion-100 flex">
        <Sidebar />

        <div className="flex-1 flex flex-col max-h-screen">
          <Header />
          <Outlet />
        </div>
      </div>
    </>
  )
}
