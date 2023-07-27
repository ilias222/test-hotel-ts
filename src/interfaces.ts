// Лист интерфейсов

export interface Places {
    id:number, 
    image:string, 
    readonly name: string, 
    price: number, 
    remoteness: number
    description: string
    coordinates?: Array<number>,
    bookedDates?: Array<number>
  }

export interface SearchFormData {
  city :      string,
  firstDate:  string,
  lastDate:   string,
  price:      number,
  homy:       boolean,
  flatRent:   boolean,
  }

export interface Users {
  username: string,
  avatarUrl: string
}