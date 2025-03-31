import { Flex, Image, List, Typography } from 'antd';
import './styles.scss';
import { useCourseStore } from '@/hooks/useCourseStore';
import JoditEditor from 'jodit-react';
import { useEffect, useMemo, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { EditTwoTone } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import { UpdateCourseInformationPayload } from '@queries/Courses/types';
import { useParams } from 'react-router-dom';
import { useGetCourseDetail } from '@queries/Courses/useGetCourseDetail';
import { useUpdateCourseInformation } from '@queries/Courses/useUpdateCourseInformation';
import { toast } from 'react-toastify';

const data = [
  'Understand the basic concepts of mobile programming, including application architecture, user interface handling, graphics, navigation methods, and data connectivity.',
  'Build complete mobile applications with the capability to access both local and remote databases through REST API.',
  'Apply development and deployment skills on mobile platforms.',
];

const CourseDescriptionTab = () => {
  const { courseId } = useParams();
  const { courseDetail, handleInvalidateTeachersList } = useGetCourseDetail({ courseId });
  console.log(courseDetail)
  const [isEdit, setIsEdit] = useState(false);
  const [courseInformation, setCourseInformation] = useState('');
  const { error, isLoading, isError, isSuccess, onUpdateCourseInformation } = useUpdateCourseInformation({
    onSuccess: () => {
      toast.success("Updated successfully!")
      setIsEdit(false);
      handleInvalidateTeachersList();
    },
    onError: () => {
      toast.error("Error!")
    }
  });

  const initData: UpdateCourseInformationPayload = useMemo(() => ({
    assessmentPlan: courseDetail?.assessmentPlan,
    courseId,
    courseInformation: courseDetail?.courseInformation,
    learningMaterialsAndOutcomes: courseDetail?.learningMaterialsAndOutcomes
  }), [courseDetail])

  const { control, handleSubmit, reset, } = useForm<UpdateCourseInformationPayload>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: initData,
  });

  const editorConfig = {
    readonly: false,
    placeholder: 'Start typings...',
    spellcheck: true,
    toolbarInlineForSelection: true,
    showPlaceholder: false,
    disablePlugins:
      'xpath,add-new-line,ai-assistant,class-span,video,table-keyboard-navigation,iframe,media,powered-by-jodit,file',
    uploader: {
      insertImageAsBase64URI: true,
    },
  };

  const onSubmit = (payload: UpdateCourseInformationPayload) => {
    const data = { ...payload, courseInformation }
    onUpdateCourseInformation(data);
  }

  useEffect(() => {
    setCourseInformation(courseDetail?.courseInformation);
  }, [courseDetail?.courseInformation])

  useEffect(() => {
    reset(initData);
  }, [initData])
  return (
    <div className="course-description-tab-container">
      <Flex
        justify="end"
        align="center"
        vertical={false}
        style={{ width: '100%', marginBottom: '20px' }}
        gap={'small'}
      >
        {isEdit ? (
          <>
            <Button type="default" onClick={() => setIsEdit(false)} >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" onClick={handleSubmit(onSubmit)}>
              Save
            </Button>
          </>
        ) : (
          <Button icon={<EditTwoTone />} type="text" onClick={() => setIsEdit(true)} />
        )}
      </Flex>
      {!isEdit ? (
        <div
          dangerouslySetInnerHTML={{ __html: courseDetail?.courseInformation || '' }}
          style={{ lineHeight: '1.6', fontSize: '16px' }}
        />
      ) : (
        <JoditEditor
          value={courseInformation}
          config={editorConfig}
          onBlur={(newContent) => setCourseInformation(newContent)}
        />
      )}
    </div>
  );
};

export default CourseDescriptionTab;
