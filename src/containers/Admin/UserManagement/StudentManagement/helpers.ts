export enum Action {
  ADD = 'add',
  EDIT = 'edit',
  DELETE = 'delete',
  VIEW = 'view',
}
export const splitFullName = (fullName: string) => {
  const name = fullName?.trim();
  return {
    firstName: name,
    middleName: name,
    lastName: name,
  };
};
export const transformSortParams = (sort: Record<string, string>) => {
  const sortBy = Object.keys(sort)[0];
  const sortDirection = sort[sortBy] === 'ascend' ? 'asc' : 'desc';

  return {
    sortBy,
    sortDirection,
  };
};
