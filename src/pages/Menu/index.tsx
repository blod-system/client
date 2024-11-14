import { useNavigate } from 'react-router-dom';
import { routerMap } from '../../routes/routerMap';

export default function Menu() {
  const navigate = useNavigate()

  return (
    <div className='w-full max-h-28 min-h-24 flex justify-around items-center border-b-4 border-dashed mb-5'>
      {
        routerMap.map(item => (
          <button
            key={item.path}
            className='text-2xl  px-4 py-1 rounded-md shadow-lg shadow-cyan-500/80 hover:bg-cyan-500 hover:shadow hover:text-white'
            onClick={() => navigate(item.path)}
          >
            {item.name}
          </button>
        ))
      }
    </div>
  )
}