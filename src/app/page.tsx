'use client'

import { useState, useEffect } from 'react'
import { ConnectKitButton } from 'connectkit'
import { useAccount } from 'wagmi'
import CandidateList from '@/components/CandidateList'
import VotingStatus from '@/components/VotingStatus'
import AdminPanel from '@/components/AdminPanel'
import Header from '@/components/Header'

export default function Home() {
  const { isConnected, address } = useAccount()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Check if connected address is admin
    // This will be implemented when we connect to the contract
  }, [address])

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Decentralized Voting System
          </h1>
          <p className="text-lg text-gray-400 text-center max-w-2xl">
            A secure and transparent voting platform powered by blockchain technology.
            Cast your vote with confidence and verify the results in real-time.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <ConnectKitButton />
        </div>

        {isConnected && (
          <div className="space-y-8">
            <VotingStatus />
            <CandidateList />
            {isAdmin && <AdminPanel />}
          </div>
        )}

        {!isConnected && (
          <div className="text-center mt-12">
            <div className="bg-gray-800 rounded-lg p-8 max-w-md mx-auto">
              <h2 className="text-2xl font-semibold mb-4">Connect Your Wallet</h2>
              <p className="text-gray-400">
                Please connect your wallet to participate in the voting process.
                You'll be able to view candidates and cast your vote once connected.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
