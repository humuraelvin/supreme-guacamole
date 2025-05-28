'use client'

import { useState, useEffect } from 'react'
import moment from 'moment'

export default function VotingStatus() {
  const [timeLeft, setTimeLeft] = useState<string>('')
  const [votingActive, setVotingActive] = useState(true)
  const [totalVotes, setTotalVotes] = useState(43)
  const [totalVoters, setTotalVoters] = useState(50)

  useEffect(() => {
    // Mock end time - will be replaced with contract data
    const endTime = moment().add(5, 'days')

    const timer = setInterval(() => {
      const now = moment()
      const duration = moment.duration(endTime.diff(now))
      
      if (duration.asSeconds() <= 0) {
        setVotingActive(false)
        setTimeLeft('Voting ended')
        clearInterval(timer)
      } else {
        setTimeLeft(
          `${duration.days()}d ${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`
        )
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-300">Voting Status</h3>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${votingActive ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-sm text-gray-400">
              {votingActive ? 'Active' : 'Ended'}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-300">Time Remaining</h3>
          <p className="text-2xl font-mono text-purple-400">{timeLeft}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-300">Statistics</h3>
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>Total Votes:</span>
            <span className="font-medium text-white">{totalVotes}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>Participation Rate:</span>
            <span className="font-medium text-white">
              {((totalVotes / totalVoters) * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-700">
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
            style={{ width: `${(totalVotes / totalVoters) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
} 