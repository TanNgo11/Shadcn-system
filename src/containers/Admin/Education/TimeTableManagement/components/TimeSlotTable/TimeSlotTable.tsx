import ProTable, { ProColumns } from '@ant-design/pro-table';
import { useCallback, useMemo, useState } from 'react';
import useGetTimeSlotsByTeacherIdAndSemesterId from '@queries/Attendance/useGetTimeSlotsByTeacherIdAndSemesterId';
import { DeleteTimeSlotRequest, TimeSlotResponse } from '@queries/Attendance/types';
import { timeSlotsColumns } from './timeSlotColumns';
import { Space, Popconfirm, Button } from 'antd';
import { useParams } from 'react-router-dom';
import useDeleteTimeSlotByTeacherIdAndTimeSlotId from '@queries/Attendance/useDeleteTimeSlotByTeacherAndSemester';
import { useNotification } from '@/containers/StartupContainers';

const TimeSlotTableActions = () => {
  const toast = useNotification();
  const { teacherId, semesterId } = useParams();
  const {
    timeSlots,
    isPending,
    isError,
    error,
    handleInvalidateTimeSlotsByTeacherIdAndSemesterId,
  } = useGetTimeSlotsByTeacherIdAndSemesterId({
    teacherId: teacherId || '',
    semesterId: semesterId || '',
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<TimeSlotResponse[]>([]);

  const handleSuccess = () => {
    handleInvalidateTimeSlotsByTeacherIdAndSemesterId();
    setSelectedRowKeys([]);
    setSelectedRows([]);
    toast.success({
      message: 'Delete time slot successfully',
      description: 'You have successfully deleted a time slot.',
    });
  };

  const handleError = (error: Error) => {
    toast.error({
      message: 'Delete time slot failed',
      description: error.message,
    });
  };

  const { onRemoveTimeSlot } = useDeleteTimeSlotByTeacherIdAndTimeSlotId({
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const handleDelete = useCallback(
    (request: DeleteTimeSlotRequest) => {
      onRemoveTimeSlot(request);
    },
    [onRemoveTimeSlot],
  );

  const columns: ProColumns<TimeSlotResponse>[] = useMemo(
    () => timeSlotsColumns({ handleDelete, teacherId }),
    [handleDelete],
  );

  return (
    <ProTable<TimeSlotResponse>
      dataSource={timeSlots}
      columns={columns}
      cardBordered
      rowKey="id"
      search={false}
      pagination={{
        pageSizeOptions: [10, 20, 50],
        showSizeChanger: true,
        showTotal: (total) => `Total ${total} items`,
      }}
      dateFormatter="string"
      headerTitle="Teachers List"
      loading={isPending}
      // rowSelection={{
      //   selectedRowKeys,
      //   onChange: (keys, rows) => {
      //     setSelectedRowKeys(keys);
      //     setSelectedRows(rows);
      //   },
      // }}
      tableAlertRender={false}
      tableAlertOptionRender={false}
      toolbar={{
        title: 'Time Slots',
      }}
      toolBarRender={() => [
        <Button
          key="button"
          type="primary"
          onClick={() => {
            console.log('Add new time slot');
          }}
        >
          Add Time Slot
        </Button>,
      ]}
    />
  );
};

export default TimeSlotTableActions;
