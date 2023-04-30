import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Header = ({title}) => {
  return (
    <h1>{title}</h1>
  )
}

const MostVotes = ({anecdotes, votes}) => {
  const mostVotesIndex = votes.indexOf(Math.max(...votes))
  const mostVotesAnecdotes = anecdotes[mostVotesIndex]
  const mostVotes = votes[mostVotesIndex]
  
  return (
    <div>
      <p>{mostVotesAnecdotes}</p>
      <p>has {mostVotes} votes</p>
    </div>
  )
} 

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const randomAnecdote = Math.floor(Math.random() * anecdotes.length)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(randomAnecdote)  
  
  const handleNextClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));    
  };

  const handleVoteClick = () => {    
    const copy= [...votes]
    copy[selected] += 1
    setVotes(copy)       
  } 
  
  return (
    <div> 
      <Header title = 'Anectode of the day'/>     
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={handleVoteClick} text='vote' />
      <Button handleClick={handleNextClick} text='next anecdote' />
      <Header title = 'Anecdote with most votes'/>
      <MostVotes anecdotes={anecdotes} votes= {votes} />
    </div>    
  )
}

export default App