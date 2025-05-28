'use client'

import { ConnectKitButton } from 'connectkit'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-gray-900/60 backdrop-blur-md border-b border-gray-800">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-white">
              VoteChain
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/candidates" className="text-gray-300 hover:text-white transition-colors">
                Candidates
              </Link>
              <Link href="/results" className="text-gray-300 hover:text-white transition-colors">
                Results
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <ConnectKitButton />
          </div>
        </div>
      </nav>
    </header>
  )
} 