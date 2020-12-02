import { getDefaultLocation } from 'util/location';

export const getStakeholders = () => {
  const defaultLocation = getDefaultLocation()
  const url = `https://foodoasis.la/api/stakeholderbests?categoryIds[]=1&
    categoryIds[]=9&latitude=${defaultLocation.center.lat}&longitude=
    ${defaultLocation.center.lon}&distance=${defaultLocation.radius}
    &isInactive=either&verificationStatusId=0&tenantId=
    ${process.env.NEXT_PUBLIC_TENANT_ID}`
  return fetch(url).then(res => res.json());
}
