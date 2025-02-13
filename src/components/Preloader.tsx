import { GiPlantWatering } from 'react-icons/gi';

const Preloader = () => {
  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-yellow-100 z-50'>
      <GiPlantWatering className='h-20 w-20 text-green-700 animate-bounce' />
      <p className='mt-2 text-lg text-yellow-800 font-semibold'>
        Growing data for smarter decisions...
      </p>
      <div className='flex mt-3 space-x-2'>
        <div className='w-2 h-2 rounded-full bg-yellow-500 animate-pulse' style={{ animationDelay: '0s' }}></div>
        <div className='w-2 h-2 rounded-full bg-yellow-500 animate-pulse' style={{ animationDelay: '0.2s' }}></div>
        <div className='w-2 h-2 rounded-full bg-yellow-500 animate-pulse' style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
}

export default Preloader;
