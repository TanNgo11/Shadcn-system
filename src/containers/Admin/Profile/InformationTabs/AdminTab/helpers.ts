import { AdminResponse } from "@queries/Admins/types";
import { capitalize } from "lodash";

export const getProcessedAdminInfo = (admin: AdminResponse) => [
  { label: 'UserName', value: admin?.username ?? 'N/A' },
  { label: 'Telephone', value: admin?.phoneNumber ?? 'N/A' },
  { label: 'Live', value: admin?.address ?? 'N/A' },
  { label: 'Address', value: admin?.address ?? 'N/A' },
  { label: 'Admin ID', value: admin?.id ?? 'N/A' },
  { label: 'Phone Number', value: admin?.phoneNumber ?? 'N/A' },
  { label: 'ID Number', value: admin?.adminId ?? 'N/A' },
  { label: 'Gender', value: capitalize(admin?.gender) ?? 'N/A' },
  { label: 'Date of Birth', value: admin?.dateOfBirth ?? 'N/A' },
  { label: 'Email', value: admin?.email ?? 'N/A' },
  { label: 'Nationality', value: 'Vietnam' },
  { label: 'Department', value: admin?.departmentId ?? 'N/A' },
  { label: 'Hired Date', value: admin?.hireDate ?? 'N/A' },
];