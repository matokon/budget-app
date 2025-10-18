import * as React from 'react';
import { AuthAPI, health } from './lib/api';

export default function Form() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [mode, setMode] = React.useState('login'); // 'login' | 'register'
  const [loading, setLoading] = React.useState(false);
  const [msg, setMsg] = React.useState(null);

  React.useEffect(() => {
    health().then(() => setMsg('API OK')).catch(() => setMsg('API niedostępne'));
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      if (mode === 'register') {
        await AuthAPI.signup({ email, password });
        const res = await AuthAPI.signin({ email, password });
        const userText = res?.data?.email || res?.data?.user?.email || '';
        setMsg(`Zarejestrowano i zalogowano${userText ? `: ${userText}` : ''}`);
      } else {
        const res = await AuthAPI.signin({ email, password });
        const userText = res?.data?.email || res?.data?.user?.email || '';
        setMsg(`Zalogowano${userText ? `: ${userText}` : ''}`);
      }
    } catch (err) {
      const text = err?.response?.data?.error || err?.response?.data?.message || err.message;
      setMsg(`Błąd: ${text}`);
    } finally {
      setLoading(false);
    }
  };

  const onForgot = () => {
    setMsg('Funkcja „przypomnij hasło” jeszcze nie podpięta');
  };

  const doLogout = async () => {
    try {
      await AuthAPI.signout();
      setMsg('Wylogowano');
    } catch (e) {
      setMsg('Wylogowanie nie powiodło się');
    }
  };

  return (
    <form onSubmit={onSubmit} className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-100 min-w-[360px]'>
      <h1 className='text-5xl font-semibold'>Witaj ponownie!</h1>
      <p className='font-medium text-lg text-gray-600 mt-4'>
        {mode === 'login' ? 'Zaloguj się.' : 'Zarejestruj nowe konto.'}
      </p>

      <div className='mt-8'>
        <label className='text-lg font-medium'>Email: </label>
        <input
          className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
          placeholder='Wprowadź swój email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          type='email'
          required
        />
      </div>

      <div className='mt-4'>
        <label className='text-lg font-medium'>Hasło: </label>
        <input
          className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
          placeholder='Wprowadź swoje hasło'
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type='button'
        onClick={onForgot}
        className='text-violet-500 text-base pt-3 font-medium flex justify-center items-center'
      >
        Przypomnij hasło
      </button>

      <div className='flex gap-2 mt-2'>
        <button
          type='submit'
          disabled={loading}
          className='w-full h-100 bg-[#b3b3ff] text-white font-medium rounded
                     hover:bg-[#9999ff] active:bg-[#8080ff] transition-colors mt-4 py-3 disabled:opacity-60'
        >
          {loading ? 'Przetwarzanie…' : (mode === 'login' ? 'Zaloguj się' : 'Zarejestruj i zaloguj')}
        </button>
        <button
          type='button'
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          className='text-violet-500 text-base ml-3 font-medium self-end mb-1'
        >
          {mode === 'login' ? 'Zarejestruj się!' : 'Zaloguj się!'}
        </button>
      </div>

      <div className='mt-4 flex items-center gap-3'>
        <button type='button' onClick={doLogout} className='text-sm underline text-gray-600'>
          Wyloguj
        </button>
        {msg && (
          <span className={msg.startsWith('Błąd') ? 'text-red-600' : 'text-green-700'}>
            {msg}
          </span>
        )}
      </div>
    </form>
  );
}
