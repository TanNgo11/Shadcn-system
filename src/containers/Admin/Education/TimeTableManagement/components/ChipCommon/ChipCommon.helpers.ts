export const timeTableStatus: Record<string, { color: string; text: string }> = {
  READY_TO_START: { color: 'blue', text: 'Ready to start ' },
  IN_PROGRESS: { color: 'green', text: 'In progress' },
  DELETED: { color: 'red', text: 'Deleted' },
  PENDING: { color: 'orange', text: 'Pending' },
  // DROPPED_OUT: { color: 'purple', text: 'Dropped out' },
  // GRADUATED: { color: 'cyan', text: 'Graduated' },
  // STUDYING: { color: 'green', text: 'Studying' },
  // SUSPENDED: { color: 'magenta', text: 'Suspended' },
};

export const timeSlotStatus: Record<string, { color: string; text: string }> = {
  MONDAY: { color: 'blue', text: 'Monday' },
  TUESDAY: { color: 'green', text: 'Tuesday' },
  WEDNESDAY: { color: 'red', text: 'Wednesday' },
  THURSDAY: { color: 'orange', text: 'Thursday' },
  FRIDAY: { color: 'purple', text: 'Friday' },
  SATURDAY: { color: 'cyan', text: 'Saturday' },
  SUNDAY: { color: 'magenta', text: 'Sunday' },
};
