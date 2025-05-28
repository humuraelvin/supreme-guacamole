'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useWeb3 } from '@/context/Web3Context'

interface Candidate {
  id: number
  name: string
  imageUrl: string
  description: string
  voteCount: number
  isActive: boolean
}

export default function CandidateList() {
  const { contract, address } = useWeb3()
  const [loading, setLoading] = useState(false)
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [totalVotes, setTotalVotes] = useState(0)

  const loadCandidates = async () => {
    if (!contract) return

    try {
      const total = await contract.totalCandidates()
      const totalVotes = await contract.totalVotes()
      setTotalVotes(totalVotes.toNumber())

      const loadedCandidates: Candidate[] = []
      for (let i = 1; i <= total; i++) {
        const candidate = await contract.getCandidate(i)
        loadedCandidates.push({
          id: candidate.id.toNumber(),
          name: candidate.name,
          imageUrl: candidate.imageUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${candidate.name}`,
          description: candidate.description,
          voteCount: candidate.voteCount.toNumber(),
          isActive: candidate.isActive
        })
      }
      setCandidates(loadedCandidates)
    } catch (error) {
      console.error('Error loading candidates:', error)
    }
  }

  const handleVote = async (candidateId: number) => {
    if (!contract || !address) return

    try {
      setLoading(true)
      const tx = await contract.vote(candidateId)
      await tx.wait()
      await loadCandidates()
    } catch (error) {
      console.error('Error voting:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (contract) {
      loadCandidates()

      // Listen for voting events
      contract.on('VoteCast', (voter, candidateId) => {
        loadCandidates()
      })

      return () => {
        contract.removeAllListeners('VoteCast')
      }
    }
  }, [contract])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Candidates</h2>
        <div className="text-sm text-gray-400">
          Total Votes: {totalVotes}
        </div>
      </div>

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
                  disabled={!address || loading || !candidate.isActive}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Voting...' : 'Vote'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {candidates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No candidates available.</p>
        </div>
      )}
    </div>
  )
} 