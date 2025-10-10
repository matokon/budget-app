import * as React from 'react'

export default function Form()
{
  return (
    <div className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-100'>
      <h1 className='text-5xl font-semibold'>Witaj ponownie!</h1>
      <p className='font-medium text-lg text-gray-600 mt-4'>Wprowadź swoje dane.</p>
      <div className='mt-8'>
        <label className='text-lg font-medium'>Email: </label>
        <input 
          className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
          placeholder='Wprowadź swój email'
        />
      </div>
      <div>
        <label className='text-lg font-medium'>Hasło: </label>
        <input 
          className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
          placeholder='Wprowadź swoje hasło'
          type='password'
        />
      </div>
      <button className='text-violet-500 text-base pt-3 font-medium flex justify-center items-center'>Przypomnij hasło</button>

      <button className='w-full h-100 bg-[#b3b3ff] text-white font-medium rounded
    hover:bg-[#9999ff] active:bg-[#8080ff] transition-colors mt-4 py-3'>Zaloguj się</button>

      <div className='mt-8 flex justify-center items-center'>
        <p className='font-medium text-base'>Nie masz konta?</p>
        <button className='text-violet-500 text-base ml-3 font-medium'>Zarejestruj się!</button>
      </div>
    </div>
  )
}
