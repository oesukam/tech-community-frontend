import PersonPlaceholder from '../assets/images/person.png';
import organizationPlaceholder from '../assets/images/organization.png';

export default (picture, userType) => {
  if (picture) return picture;
  return userType === 'organization'
    ? organizationPlaceholder
    : PersonPlaceholder;
};
