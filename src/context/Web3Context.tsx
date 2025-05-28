'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/config/contract'

interface Web3ContextType {
  contract: ethers.Contract | null
  signer: ethers.Signer | null
  address: string | null
  isAdmin: boolean
  loading: boolean
  connect: () => Promise<void>
}

const Web3Context = createContext<Web3ContextType>({
  contract: null,
  signer: null,
  address: null,
  isAdmin: false,
  loading: true,
  connect: async () => {},
})

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const [contract, setContract] = useState<ethers.Contract | null>(null)
  const [signer, setSigner] = useState<ethers.Signer | null>(null)
  const [address, setAddress] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  const connect = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const address = await signer.getAddress()
        
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          signer
        )

        const contractOwner = await contract.owner()
        setIsAdmin(contractOwner.toLowerCase() === address.toLowerCase())
        
        setContract(contract)
        setSigner(signer)
        setAddress(address)
      }
    } catch (error) {
      console.error('Error connecting to MetaMask', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    connect()
  }, [])

  return (
    <Web3Context.Provider
      value={{
        contract,
        signer,
        address,
        isAdmin,
        loading,
        connect,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

export const useWeb3 = () => useContext(Web3Context) 