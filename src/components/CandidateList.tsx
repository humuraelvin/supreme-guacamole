'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useAccount } from 'wagmi'

interface Candidate {
  id: number
  name: string
  imageUrl: string
  description: string
  voteCount: number
}

export default function CandidateList() {
  const { isConnected } = useAccount()
  const [loading, setLoading] = useState(false)
  
  // Mock data - will be replaced with contract data
  const [candidates] = useState<Candidate[]>([
    {
      id: 1,
      name: "Alice Johnson",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
      description: "Experienced leader with a vision for sustainable development",
      voteCount: 25
    },
    {
      id: 2,
      name: "Bob Smith",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
      description: "Advocate for technological innovation and digital transformation",
      voteCount: 18
    }
  ])

  const handleVote = async (candidateId: number) => {
    try {
      setLoading(true)
      // Contract interaction will be implemented here
      console.log(`Voting for candidate ${candidateId}`)
    } catch (error) {
      console.error('Error voting:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Candidates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-gray-800/50 backdrop-blur-lg rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
          >
            <div className="aspect-square relative bg-gradient-to-br from-blue-500/20 to-purple-500/20">
              <Image
                src={candidate.imageUrl}
                alt={candidate.name}
                fill
                className="object-cover p-4"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{candidate.name}</h3>
              <p className="text-gray-400 mb-4">{candidate.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Votes: {candidate.voteCount}
                </span>
                <button
                  onClick={() => handleVote(candidate.id)}
                  disabled={!isConnected || loading}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Voting...' : 'Vote'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 