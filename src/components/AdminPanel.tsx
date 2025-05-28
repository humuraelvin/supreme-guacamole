'use client'

import { useState } from 'react'
import { useWeb3 } from '@/context/Web3Context'

export default function AdminPanel() {
  const { contract } = useWeb3()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    imageUrl: '',
    description: '',
    votingDuration: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddCandidate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contract) return

    try {
      setLoading(true)
      const tx = await contract.addCandidate(
        formData.name,
        formData.imageUrl,
        formData.description
      )
      await tx.wait()
      setFormData({
        name: '',
        imageUrl: '',
        description: '',
        votingDuration: ''
      })
    } catch (error) {
      console.error('Error adding candidate:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStartVoting = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contract || !formData.votingDuration) return

    try {
      setLoading(true)
      const tx = await contract.startVoting(parseInt(formData.votingDuration))
      await tx.wait()
    } catch (error) {
      console.error('Error starting voting:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEndVoting = async () => {
    if (!contract) return

    try {
      setLoading(true)
      const tx = await contract.endVoting()
      await tx.wait()
    } catch (error) {
      console.error('Error ending voting:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-semibold mb-6">Admin Panel</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Add Candidate</h3>
          <form onSubmit={handleAddCandidate} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-400 mb-1">
                Image URL
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="https://"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={3}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Adding...' : 'Add Candidate'}
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Voting Control</h3>
            <form onSubmit={handleStartVoting} className="space-y-4">
              <div>
                <label htmlFor="votingDuration" className="block text-sm font-medium text-gray-400 mb-1">
                  Duration (days)
                </label>
                <input
                  type="number"
                  id="votingDuration"
                  name="votingDuration"
                  value={formData.votingDuration}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Starting...' : 'Start Voting'}
              </button>
            </form>
          </div>

          <div>
            <button
              onClick={handleEndVoting}
              disabled={loading}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Ending...' : 'End Voting'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 