'use client'

import { useState, useEffect } from 'react'
import { useWeb3 } from '@/context/Web3Context'
import CandidateList from '@/components/CandidateList'
import VotingStatus from '@/components/VotingStatus'
import AdminPanel from '@/components/AdminPanel'
import Header from '@/components/Header'

export default function Home() {
  const { address, isAdmin, loading } = useWeb3()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

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

        {address ? (
          <div className="space-y-8">
            <VotingStatus />
            <CandidateList />
            {isAdmin && <AdminPanel />}
          </div>
        ) : (
          <div className="text-center mt-12">
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg p-8 max-w-md mx-auto border border-gray-700">
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
