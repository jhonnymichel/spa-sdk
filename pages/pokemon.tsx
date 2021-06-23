import { NextPage } from 'next'
import { useStore, initializeStore, GetServerSideStoreState } from 'store'
import { observer } from 'mobx-react'
import Head from 'next/head'
import classNames from 'classnames'

const pokemons = [
  {
    id: 4,
    name: 'charmander',
    type: ['fire'],
    picture:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
  },
  {
    id: 10,
    name: 'caterpie',
    type: ['bug'],
    picture:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png',
  },
  {
    id: 25,
    name: 'pikachu',
    type: ['electric'],
    picture:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
  },
  {
    id: 149,
    name: 'dragonite',
    type: ['dragon', 'flying'],
    picture:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png',
  },
  {
    id: 94,
    name: 'gengar',
    type: ['ghost', 'poison'],
    picture:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png',
  },
  {
    id: 845,
    name: 'cramorant',
    type: ['flying', 'water'],
    picture:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/845.png',
  },
]

const Todos: NextPage = observer(() => {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Nunito:400,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="container px-10 mx-auto max-w-screen-2xl font-nunito">
        <div className="flex flex-wrap -mx-4">
          {pokemons.map((pokemon) => (
            <div key={pokemon.id} className="w-6/12 p-4 md:w-4/12 lg:w-3/12 xl:w-2/12">
              <div
                className={classNames('bg-white overflow-hidden rounded-lg border', {
                  'border-fire': pokemon.type[0] === 'fire',
                  'border-bug': pokemon.type[0] === 'bug',
                  'border-electric': pokemon.type[0] === 'electric',
                  'border-dragon': pokemon.type[0] === 'dragon',
                  'border-ghost': pokemon.type[0] === 'ghost',
                  'border-flying': pokemon.type[0] === 'flying',
                  'border-poison': pokemon.type[0] === 'poison',
                  'border-water': pokemon.type[0] === 'water',
                })}
              >
                <div
                  className={classNames('p-3 rounded-br-2xl bg-gradient-to-br bg-opacity-20', {
                    'from-fire bg-fire': pokemon.type[0] === 'fire',
                    'from-bug bg-bug': pokemon.type[0] === 'bug',
                    'from-electric bg-electric': pokemon.type[0] === 'electric',
                    'from-dragon bg-dragon': pokemon.type[0] === 'dragon',
                    'from-ghost bg-ghost': pokemon.type[0] === 'ghost',
                    'from-flying bg-flying': pokemon.type[0] === 'flying',
                    'from-poison bg-poison': pokemon.type[0] === 'poison',
                    'from-water bg-water': pokemon.type[0] === 'water',
                  })}
                >
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold text-subtitle leading">
                      #{String(pokemon.id).padStart(Math.max(3, String(pokemon.id).length), '0')}
                    </h2>
                    <div className="flex items-center space-x-3">
                      <button>
                        <img src="imgs/plus.svg"></img>
                      </button>
                      <button>
                        <img src="imgs/heart.svg"></img>
                      </button>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="">
                      <img src={pokemon.picture} />
                    </div>
                  </div>
                  <div className="font-bold text-center capitalize text-body-01 leading-title">
                    {pokemon.name}
                  </div>
                </div>
                <ul className="flex p-2 space-x-1">
                  {pokemon.type.map((type) => (
                    <li
                      style={{ paddingTop: 1, paddingBottom: 1 }}
                      className={classNames(
                        'block leading-3 px-1 font-bold capitalize text-subtitle border rounded-type',
                        {
                          'border-fire': type === 'fire',
                          'border-bug': type === 'bug',
                          'border-electric': type === 'electric',
                          'border-dragon': type === 'dragon',
                          'border-ghost': type === 'ghost',
                          'border-flying': type === 'flying',
                          'border-poison': type === 'poison',
                          'border-water': type === 'water',
                        }
                      )}
                      key={type}
                    >
                      {type}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
})

export default Todos
