export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  role: string;
  access: Access;
}


export interface Access {
  impersonate: boolean;
  manage: boolean;
  manageGroupMembership: boolean;
  mapRoles: boolean;
  view: boolean;
}