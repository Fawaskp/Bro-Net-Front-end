import React from 'react'

function Navbar() {
  return (
    <header className="border-b border-gray-150">
        <nav className="container mx-auto flex justify-between items-center py-4">
            <div className="logo-side px-3">
                <h3 className="md:text-xl text-indigo-600 font-bold tracking-wider uppercase">BroNet</h3>
            </div>
        </nav>
    </header>
  )
}

export default Navbar
