const allRoles = {
  USER: ['createOrder', 'upload', 'updateUser'],
  OWNER: ['categories', 'createOrder', 'orders', 'partners', 'products', 'tables', 'upload', 'updateUser', 'manageUser'],

};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
