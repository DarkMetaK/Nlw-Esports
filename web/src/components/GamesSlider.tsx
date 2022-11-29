import { useState, useEffect } from 'react'
import axios from 'axios';
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

import { GameBanner } from './GameBanner';

interface Game {
    id: string;
    title: string;
    bannerUrl: string;
    _count: {
      ads: number;
    }
  }

export function GameSlider() {

    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        axios('http://localhost:3333/games')
            .then(response => {
                setGames(response.data);
            });
    }, [])

    const [options, setOptions] = useState({})
    const [slider] = useKeenSlider(options)

    useEffect(() => {
      setTimeout(() => {
        setOptions({
          slides: { perView: 1.5, spacing: 24, origin: 'center' },
          breakpoints: {
              "(min-width: 521px)": {
                  slides: { perView: 2.5, spacing: 24, origin: 'center' },
              },
              "(min-width: 769px)": {
                slides: { perView: 3.5, spacing: 24, origin: 'center' },
              },
              "(min-width: 1025px)": {
                  slides: { perView: 5.5, spacing: 24, origin: 'center' },
                },
            },
          loop: true,
        })
      }, 1000)
    }, [])

    return (
        <div ref={slider} className="keen-slider container mx-auto">
          {games.map(game => {
            return (
            <GameBanner 
                title={game.title} 
                bannerUrl={game.bannerUrl} 
                adsCount={game._count.ads}
                key={game.id}
            />
            )
          })}
        </div>
    )
}