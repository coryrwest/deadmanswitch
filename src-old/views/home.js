export default ({count}) => (
  <div>
    <p>DeadManSwitch is a simple app to act as your dead man switch.</p>
    <button data-click={{type: 'decrement'}}> - </button>
    <span> {count} </span>
    <button data-click={{type: 'increment'}}> + </button>
  </div>
)
