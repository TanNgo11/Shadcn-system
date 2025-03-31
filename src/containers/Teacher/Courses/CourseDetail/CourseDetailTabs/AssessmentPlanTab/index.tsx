import { EditTwoTone } from '@ant-design/icons';
import { UpdateCourseInformationPayload } from '@queries/Courses/types';
import { useGetCourseDetail } from '@queries/Courses/useGetCourseDetail';
import { useUpdateCourseInformation } from '@queries/Courses/useUpdateCourseInformation';
import { Button, Flex, Table, Typography } from 'antd';
import JoditEditor from 'jodit-react';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const AssessmentPlanTab = () => {
  const { courseId } = useParams();
  const { courseDetail, handleInvalidateTeachersList } = useGetCourseDetail({ courseId });
  const [isEdit, setIsEdit] = useState(false);
  const [assessmentPlan, setAssessmentPlan] = useState('');
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
    const data = { ...payload, assessmentPlan }
    onUpdateCourseInformation(data);
  }

  useEffect(() => {
    setAssessmentPlan(courseDetail?.assessmentPlan);
  }, [courseDetail?.assessmentPlan])

  useEffect(() => {
    reset(initData);
  }, [initData])
  return (
    <>
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
          dangerouslySetInnerHTML={{ __html: courseDetail?.assessmentPlan || '' }}
          style={{ lineHeight: '1.6', fontSize: '16px', overflowX: 'scroll'}}
        />
      ) : (
        <JoditEditor
          value={assessmentPlan}
          config={editorConfig}
          onBlur={(newContent) => setAssessmentPlan(newContent)}
        />
      )}
    </>
  );
};

export default AssessmentPlanTab;
