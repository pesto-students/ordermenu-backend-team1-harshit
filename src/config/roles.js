const allRoles = {
  USER: [],
  OWNER: ['OWNER'],
  ADMIN: ['OWNER', 'ADMIN'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
