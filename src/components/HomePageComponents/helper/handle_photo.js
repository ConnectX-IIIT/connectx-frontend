import DefaultCoverPhoto from "../../../assets/profile/user_profile_default_cover.svg";
import DefaultProfilePhoto from "../../../assets/profile/user_profile_default_icon.svg";

export const handlePhoto = (photo, index) => {
    if (photo) {
        return photo;
    }
    if (index) {
        return DefaultProfilePhoto;
    } else {
        return DefaultCoverPhoto;
    }
}