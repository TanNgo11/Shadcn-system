import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { useGetAllCoursesBySemesterId } from '@queries/Courses/useGetAllCoursesBySemesterId';
import { useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { CourseResponse } from '../CourseManagement/helpers';
import { allColumns } from './allColumns';

const TimeTableManagement = () => {
  const { semesterId } = useParams();
  const actionRef = useRef<ActionType | null>(null);
  const { courses, setParams, totalElements } = useGetAllCoursesBySemesterId();

  const columns: ProColumns<CourseResponse>[] = useMemo(() => allColumns({}), []);
  return (
    <ProTable<CourseResponse>
      actionRef={actionRef}
      dataSource={courses}
      columns={columns}
      cardBordered
      request={async (_params, _sort, _filter) => {
        const { current, pageSize, ...restParams } = _params;
        setParams({
          current: current ?? 1,
          pageSize: pageSize ?? 10,
          semesterId: semesterId,
          ...restParams,
        });
        actionRef.current?.reload();

        return {
          data: courses,
          success: true,
          total: totalElements,
        };
      }}
      rowKey="id"
      search={false}
      form={{
        syncToUrl: (values: Record<string, any>, type: 'get' | 'set') => {
          if (type === 'get') {
            return {
              ...values,
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSizeOptions: [10, 20, 50, 100],
        showSizeChanger: true,
        showPrevNextJumpers: true,
        showTotal: (total: number) => `Total ${total} items`,
        onChange: (page: any) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="Courses List"
    />
  );
};

export default TimeTableManagement;
