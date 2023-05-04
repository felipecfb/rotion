import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import * as Collapsible from '@radix-ui/react-collapsible'

import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'

import icon from '../../../../../resources/icon.png'

export function Default() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <>
      <header className="mx-5 py-1 region-drag">
        <img src={icon} alt="Ícone" className="w-8 region-no-drag" />
      </header>
      <Collapsible.Root
        defaultOpen
        onOpenChange={setIsSidebarOpen}
        className="h-screen w-screen bg-rotion-900 text-rotion-100 flex"
      >
        <Sidebar />

        <div className="flex-1 flex flex-col max-h-screen">
          <Header isSidebarOpen={isSidebarOpen} />
          <Outlet />
        </div>
      </Collapsible.Root>
    </>
  )
}
