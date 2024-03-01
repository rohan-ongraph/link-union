// Interface representing a user
export interface User {
  id: string; // Unique identifier for the user
  fullname: string; // Full name of the user
  email: string; // Email address of the user
  password?: string; // Optional password field (used for sign-up or profile update)
  list: List; // List of data associated with the user
}

// Interface representing a list of data associated with a user
export interface List {
  data: Data[]; // Array of data items
}

// Interface representing individual data items
export interface Data {
  id: number; // Unique identifier for the data item
  name: string; // Name/title of the data item
  link: string; // URL/link associated with the data item
  desc: string; // Description of the data item
  tags: Array<string>; // Array of tags associated with the data item
}
