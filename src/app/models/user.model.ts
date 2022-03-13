export interface User {
  Id: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  username: string;
  password: string;
  imgUrl: string;
  joinedAt: string;
  isActive: boolean;
};

export interface UsersGroupByGender {
  males: User[];
  females: User[];
};

export interface UserAgeGroup {
  group: string;
  range: string;
  users: User[];
};

export interface UsersGroupByAge {
  children: UserAgeGroup;
  teenager: UserAgeGroup;
  adult: UserAgeGroup;
  elderly: UserAgeGroup;
  aboveElderly: UserAgeGroup;
};

export interface UsersGrowthByYear {
  monthName: string;
  monthNumber: number;
  users: [];
};
