import { useState } from 'react'

function Home() {
    const [count, setCount] = useState(0)
  
    return (
      <>
        <div className='increment-decr'>
            <p className='counter'>{ count }</p>
          <button className='addButton' onClick={() => setCount((count) => count + 1)}>
            Increase
          </button>
          <button className='decButton' onClick={() => setCount((count) => count - 1)}>
            Decrease
          </button>
        </div>
      </>
    )
  }
  
  export default Home