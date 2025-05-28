'use client'

import { useState, useEffect } from 'react'
import { useWeb3 } from '@/context/Web3Context'

interface VotingStatusData {
  isActive: boolean
  start: number
  end: number
  timeLeft: number
}

export default function VotingStatus() {
  const { contract } = useWeb3()
  const [status, setStatus] = useState<VotingStatusData | null>(null)
  const [timeLeft, setTimeLeft] = useState<string>('')

  const loadStatus = async () => {
    if (!contract) return

    try {
      const status = await contract.getVotingStatus()
      setStatus({
        isActive: status.isActive,
        start: status.start.toNumber(),
        end: status.end.toNumber(),
        timeLeft: status.timeLeft.toNumber()
      })
    } catch (error) {
      console.error('Error loading voting status:', error)
    }
  }

  useEffect(() => {
    if (contract) {
      loadStatus()
      const interval = setInterval(loadStatus, 1000)
      return () => clearInterval(interval)
    }
  }, [contract])

  useEffect(() => {
    if (status?.timeLeft) {
      const days = Math.floor(status.timeLeft / (24 * 60 * 60))
      const hours = Math.floor((status.timeLeft % (24 * 60 * 60)) / (60 * 60))
      const minutes = Math.floor((status.timeLeft % (60 * 60)) / 60)
      const seconds = status.timeLeft % 60

      setTimeLeft(
        `${days}d ${hours}h ${minutes}m ${seconds}s`
      )
    }
  }, [status])

  if (!status) {
    return null
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-semibold mb-4">Voting Status</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Status:</span>
          <span className={`px-3 py-1 rounded-full text-sm ${
            status.isActive 
              ? 'bg-green-500/20 text-green-400'
              : 'bg-red-500/20 text-red-400'
          }`}>
            {status.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>

        {status.isActive && (
          <>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Time Remaining:</span>
              <span className="text-purple-400 font-mono">{timeLeft}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-1000"
                style={{
                  width: `${((status.end - Date.now() / 1000) / (status.end - status.start)) * 100}%`
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
} 