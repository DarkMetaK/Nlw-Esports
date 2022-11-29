import * as Dialog from '@radix-ui/react-dialog';

import './styles/main.css';

import logoImg from './assets/logo-nlw-esports.svg';
import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAppModal } from './components/CreateAppModal';
import { GameSlider } from './components/GamesSlider';

function App() {

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20 p-10'>
      <img src={logoImg} alt="" />

      <h1 className='text-6xl text-white font-black mt-20 mb-10'>
        Seu <span className='bg-nlw-gradient text-transparent bg-clip-text'>duo</span> está aqui
      </h1>

     <GameSlider />

      <Dialog.Root>
        
        <CreateAdBanner />

        <CreateAppModal />

      </Dialog.Root>

    </div>
  )
}

export default App
