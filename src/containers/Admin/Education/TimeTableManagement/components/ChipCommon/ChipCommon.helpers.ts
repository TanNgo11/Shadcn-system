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
