import { UserType } from "./UserType"


export const usersDating:UserType[] = [
  {
    id: 1,
    name: 'Alice',
    lastName:"Delgado",
    age: 23,
    type: 'citas',
    location: "Miraflores, Peru",
    image: require('../assets/images/user1.jpeg'),
  },
  {
    id: 4,
    name: 'David',
    lastName:"Delgado",
    age: 29,
    type: 'citas',
    location: "Miraflores, Peru",
    image: require('../assets/images/user4.webp'),
  },
]

export const usersFriends:UserType[] = [
  {
    id: 2,
    name: 'Bob',
    lastName:"Delgado",
    age: 28,
    type: 'amistad',
    location: "Miraflores, Peru",
    image: require('../assets/images/user2.jpg'),
  },
  {
    id: 5,
    name: 'Eva',
    lastName:"Delgado",
    age: 24,
    type: 'amistad',
    location: "Miraflores, Peru",
    image: require('../assets/images/user5.jpg'),
  },
]

export const usersRelationship:UserType[] = [
  {
    id: 3,
    name: 'Carol',
    lastName:"Delgado",
    age: 26,
    type: 'relacion',
    location: "Miraflores, Peru",
    image: require('../assets/images/user3.webp'),
  },
  {
    id: 6,
    name: 'Frank',
    lastName:"Delgado",
    age: 31,
    type: 'relacion',
    location: "Miraflores, Peru",
    image: require('../assets/images/user6.jpg'),
  },
]

