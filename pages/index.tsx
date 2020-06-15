import { NextPage } from 'next'
import { useStore, GetStaticStoreState } from 'store'
import { observer } from 'mobx-react'
import Button from 'components/button'

const Index: NextPage = observer(() => {
  const { counter } = useStore()
  const { value, lower, raise } = counter

  return (
    <div className="container py-container">
      <div className="w-full flex justify-center items-center space-x-4">
        <Button variant="lg" onClick={lower}>
          -
        </Button>
        <p className="p-2 w-32 text-center bg-white text-gray-800 font-bold text-2xl">{value}</p>
        <Button variant="lg" onClick={raise}>
          +
        </Button>
      </div>
    </div>
  )
})

export const getStaticProps: GetStaticStoreState = async () => {
  return {
    props: {
      initialStoreState: {
        counter: { value: 5 },
      },
    },
  }
}

export default Index
