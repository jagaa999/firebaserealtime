import { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker'
import { initializeApp } from 'firebase/app'
import _ from 'lodash'
import {
  getDatabase,
  ref,
  set,
  onValue,
  query,
  orderByChild,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
} from 'firebase/database'

// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDoc57P_ggKwJCiJgGHWeZi-oIXshpcDs4',
  authDomain: 'moto-86243.firebaseapp.com',
  databaseURL: 'https://moto-86243.firebaseio.com',
  projectId: 'moto-86243',
  storageBucket: 'moto-86243.appspot.com',
  messagingSenderId: '938578949385',
  appId: '1:938578949385:web:74db5383c153cdf2ebcfd8',
  measurementId: 'G-MEASUREMENT_ID',
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

const writeUserData = (
  userId: number,
  name: string,
  city: string,
  avatar: string
) => {
  set(ref(database, `members/${userId}`), {
    userId,
    name,
    city,
    avatar,
  })
}

// const renderItem = () => {
//   const ddd = fetch(`https://source.unsplash.com/500x400/`).then((response) => {
//     console.log('XXXXXXX', response.url)
//     return response.url
//   })

//   console.log('ddd', ddd)
//   return ddd
// }

const Home = () => {
  const name = faker.name.firstName()
  const city = faker.address.city()
  const avatar = faker.image.avatar()
  // const ssss = renderItem()
  // console.log('RRRR', ssss)
  console.log('XXXXXXDDDDDDDDDD', avatar)
  const userId = faker.datatype.number()

  const [memberList, setMemberList]: Array<any> = useState([])
  console.log('🚀 ~ Home ~ memberList', memberList)

  const memberListRef = ref(database, 'members/')

  // console.log('memberList', memberListRef)
  useEffect(() => {
    onValue(memberListRef, (snapshot) => {
      const data = snapshot.val()
      console.log('data', data)
      setMemberList(_.values(data || {}))
    })
  }, [])

  return (
    <div className="min-h-screen p-10">
      <div>Энд realtime гаргана даа.</div>
      <button
        className="rounded border border-yellow-400 bg-yellow-100 px-4 py-2 text-yellow-700 shadow"
        onClick={() => writeUserData(userId, name, city, avatar)}
      >
        Энд дарж бичнэ.
      </button>
      <button
        className="rounded border border-yellow-400 bg-yellow-100 px-4 py-2 text-yellow-700 shadow"
        // onClick={() => renderItem()}
      >
        Зураг үзье
      </button>
      <div className="mt-10 grid w-full grid-cols-2 bg-yellow-50">
        <div className="mt-10 flex flex-col gap-y-5 bg-pink-100">
          Шинэ хэрэглэгч
          <div className="flex flex-row">
            <div className="w-28 text-gray-400">Id:</div>
            <div>{userId}</div>
          </div>
          <div className="flex flex-row">
            <div className="w-28 text-gray-400">Зураг:</div>
            <div>
              <img src={avatar} /> {avatar}
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-28 text-gray-400">Name:</div>
            <div>{name}</div>
          </div>
          <div className="flex flex-row">
            <div className="w-28 text-gray-400">City:</div>
            <div>{city}</div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-y-5 bg-green-100">
          Өмнө нэмэгдсэн хүмүүс
          <div className="w-full">
            {memberList.map((item: any) => {
              return (
                <div className="flex w-full flex-row border-b py-2 ">
                  <img src={item.avatar} className="w-48" />
                  <div className="flex flex-col">
                    <div>{item.userId}</div>
                    <div>{item.name}</div>
                    <div>{item.city}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
