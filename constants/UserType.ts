export type TypeOfUser = 'amistad' | 'citas' | 'relacion';

export type UserType = {
  id: number;
  name: string;
  lastName: string;
  age: number;
  type: TypeOfUser;  
  location: string;
  image: any;
};