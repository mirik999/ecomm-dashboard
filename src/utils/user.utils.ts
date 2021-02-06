export function getUserRole(roles: string[], expect: 'guest' | 'admin' | 'sudo') {
  const isGuest = !roles.includes('admin') && !roles.includes('sudo');
  const isAdmin = roles.includes('admin') && !roles.includes('sudo');
  const isSudo = roles.includes('sudo');
  if (isGuest) {
    return expect === 'guest';
  } else if (isAdmin) {
    return expect === 'admin';
  } else if (isSudo) {
    return expect === 'sudo';
  }
  return false;
}
