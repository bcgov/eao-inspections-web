export const SUPERADMIN = {
  isSuperAdmin: true,
  isAdmin: false,
  isViewOnly: false,
  mobileAccess: false
};

export const ADMIN = {
  isSuperAdmin: false,
  isAdmin: true,
  isViewOnly: false,
  mobileAccess: false
};

export const INSPECTOR = {
  isSuperAdmin: false,
  isAdmin: false,
  isViewOnly: false,
  mobileAccess: true
};

export const MANAGER = {
  isSuperAdmin: false,
  isAdmin: false,
  isViewOnly: false,
  mobileAccess: false
};

export const VIEW_INSPECTOR = {
  isSuperAdmin: false,
  isAdmin: false,
  isViewOnly: true,
  mobileAccess: false
};

