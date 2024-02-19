//type we use intersection and union
type Data = {
  name: string;
  address: string;
};

type UserData = Data & {
  email: string;
};

//type we can use object structure  as well primitive data
type Username = string | number;
const firstname: Username = "dheerendra";

// interface we can use extends
interface Hello extends UserData {
  lastname: string;
}
interface User {
  name: string;
  age: number;
}
//interface are and type alias are closed
type Userinfo = {
  name: string;
  age: number;
};

interface User {
  role: string;
}
const user: User = {
  name: "dheerendra",
  age: 29,
};
