import { getUserByJwt } from "./middleware/helpers";
import { UpdateProfileBody } from "./interfaces";
import { userRepository } from "./user.repository";

class ProfileService {
  async findRequiredProfile(authHeader: string) {
    const { id } = getUserByJwt(authHeader);
    const user = await userRepository.findById(id);
    delete user.password;
    return user;
  }

  async updateUserProfile(
    authHeader: string,
    updateUserData: UpdateProfileBody
  ) {
    const { id } = getUserByJwt(authHeader);

    if (updateUserData.age) updateUserData.age = +updateUserData.age;

    const updatedProfile = await userRepository.update(id, updateUserData);
    delete updatedProfile.password;
    return updatedProfile;
  }
}

export const profileService = new ProfileService();
