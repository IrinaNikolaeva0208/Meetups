enum Sex {
  male = "MALE",
  female = "FEMALE",
}

export interface UpdateProfileBody {
  name?: string;
  age?: number;
  sex?: Sex;
}
