// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title VotingSystem
 * @dev A secure and time-bound voting system smart contract
 */
contract VotingSystem is Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;

    struct Candidate {
        uint256 id;
        string name;
        string imageUrl;
        string description;
        uint256 voteCount;
        bool isActive;
    }

    struct Voter {
        bool hasVoted;
        uint256 votedFor;
        bool isRegistered;
    }

    // State variables
    uint256 public votingStart;
    uint256 public votingEnd;
    bool public votingActive;
    
    Counters.Counter private _candidateIds;
    mapping(uint256 => Candidate) public candidates;
    mapping(address => Voter) public voters;
    uint256 public totalVotes;
    uint256 public totalCandidates;

    // Events
    event CandidateAdded(uint256 indexed candidateId, string name);
    event VoteCast(address indexed voter, uint256 indexed candidateId);
    event VotingStarted(uint256 startTime, uint256 endTime);
    event VotingEnded(uint256 endTime);
    event VoterRegistered(address indexed voter);

    // Modifiers
    modifier onlyDuringVoting() {
        require(votingActive, "Voting is not active");
        require(block.timestamp >= votingStart, "Voting has not started");
        require(block.timestamp <= votingEnd, "Voting has ended");
        _;
    }

    modifier onlyRegisteredVoter() {
        require(voters[msg.sender].isRegistered, "Voter is not registered");
        _;
    }

    constructor() {
        votingActive = false;
    }

    /**
     * @dev Start the voting period
     * @param durationInDays The duration of voting period in days
     */
    function startVoting(uint256 durationInDays) external onlyOwner {
        require(!votingActive, "Voting is already active");
        require(durationInDays > 0, "Duration must be positive");
        
        votingStart = block.timestamp;
        votingEnd = block.timestamp + (durationInDays * 1 days);
        votingActive = true;
        
        emit VotingStarted(votingStart, votingEnd);
    }

    /**
     * @dev End the voting period
     */
    function endVoting() external onlyOwner {
        require(votingActive, "Voting is not active");
        votingActive = false;
        votingEnd = block.timestamp;
        
        emit VotingEnded(votingEnd);
    }

    /**
     * @dev Add a new candidate
     */
    function addCandidate(
        string memory name,
        string memory imageUrl,
        string memory description
    ) external onlyOwner {
        require(bytes(name).length > 0, "Name cannot be empty");
        
        _candidateIds.increment();
        uint256 newCandidateId = _candidateIds.current();
        
        candidates[newCandidateId] = Candidate({
            id: newCandidateId,
            name: name,
            imageUrl: imageUrl,
            description: description,
            voteCount: 0,
            isActive: true
        });
        
        totalCandidates++;
        emit CandidateAdded(newCandidateId, name);
    }

    /**
     * @dev Register a voter
     */
    function registerVoter(address voter) external onlyOwner {
        require(!voters[voter].isRegistered, "Voter already registered");
        
        voters[voter] = Voter({
            hasVoted: false,
            votedFor: 0,
            isRegistered: true
        });
        
        emit VoterRegistered(voter);
    }

    /**
     * @dev Cast a vote for a candidate
     */
    function vote(uint256 candidateId) external onlyDuringVoting onlyRegisteredVoter nonReentrant {
        require(!voters[msg.sender].hasVoted, "Already voted");
        require(candidates[candidateId].isActive, "Candidate is not active");
        
        voters[msg.sender].hasVoted = true;
        voters[msg.sender].votedFor = candidateId;
        candidates[candidateId].voteCount++;
        totalVotes++;
        
        emit VoteCast(msg.sender, candidateId);
    }

    /**
     * @dev Get candidate details
     */
    function getCandidate(uint256 candidateId) external view returns (
        uint256 id,
        string memory name,
        string memory imageUrl,
        string memory description,
        uint256 voteCount,
        bool isActive
    ) {
        Candidate memory candidate = candidates[candidateId];
        return (
            candidate.id,
            candidate.name,
            candidate.imageUrl,
            candidate.description,
            candidate.voteCount,
            candidate.isActive
        );
    }

    /**
     * @dev Get voting status and time information
     */
    function getVotingStatus() external view returns (
        bool isActive,
        uint256 start,
        uint256 end,
        uint256 timeLeft
    ) {
        uint256 _timeLeft = 0;
        if (votingActive && block.timestamp < votingEnd) {
            _timeLeft = votingEnd - block.timestamp;
        }
        
        return (votingActive, votingStart, votingEnd, _timeLeft);
    }

    /**
     * @dev Check if an address has voted
     */
    function hasVoted(address voter) external view returns (bool) {
        return voters[voter].hasVoted;
    }

    /**
     * @dev Get total number of votes for a candidate
     */
    function getVoteCount(uint256 candidateId) external view returns (uint256) {
        return candidates[candidateId].voteCount;
    }
} 