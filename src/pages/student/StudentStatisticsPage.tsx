import { observer } from 'mobx-react-lite';
import { useStore } from '../UseStore/UseStore';



export const StudentStatisticsPage = observer(() => {
  
  const counter = useStore().counterStore;
  console.log(counter)

  return (
    <div>
      <div>
        <button onClick={() => counter.increment() }>+</button>
      </div>
      <h3>{counter.value}</h3>
      <div>
        <button onClick={() => counter.decrement() }>-</button>
      </div>
      <button onClick={() => counter.reset() }>reset</button>
    </div>
  );
});