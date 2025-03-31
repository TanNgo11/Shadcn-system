import { Button, Flex, Table, Typography } from 'antd';
import './styles.scss';
import { useParams } from 'react-router-dom';
import { useGetCourseDetail } from '@queries/Courses/useGetCourseDetail';
import { useEffect, useMemo, useState } from 'react';
import { useUpdateCourseInformation } from '@queries/Courses/useUpdateCourseInformation';
import { toast } from 'react-toastify';
import { UpdateCourseInformationPayload } from '@queries/Courses/types';
import { useForm } from 'react-hook-form';
import JoditEditor from 'jodit-react';
import { EditTwoTone } from '@ant-design/icons';

const LearningMaterialsTab = () => {
  const { courseId } = useParams();
  const { courseDetail, handleInvalidateTeachersList } = useGetCourseDetail({ courseId });
  const [isEdit, setIsEdit] = useState(false);
  const [learningMaterialsAndOutcomes, setLearningMaterialsAndOutcomes] = useState('');
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
    const data = { ...payload, learningMaterialsAndOutcomes }
    onUpdateCourseInformation(data);
  }

  useEffect(() => {
    setLearningMaterialsAndOutcomes(courseDetail?.learningMaterialsAndOutcomes);
  }, [courseDetail?.learningMaterialsAndOutcomes])

  useEffect(() => {
    reset(initData);
  }, [initData])

  return (
    <div className="learning-materials-tab-container">
      <div className="learning-materials-tab-container__learning">
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
            dangerouslySetInnerHTML={{ __html: courseDetail?.learningMaterialsAndOutcomes || '' }}
            style={{ lineHeight: '1.6', fontSize: '16px', overflowX: 'scroll' }}
          />
        ) : (
          <JoditEditor
            value={learningMaterialsAndOutcomes}
            config={editorConfig}
            onBlur={(newContent) => setLearningMaterialsAndOutcomes(newContent)}
          />
        )}
      </div>
    </div>
  );
};

export default LearningMaterialsTab;
