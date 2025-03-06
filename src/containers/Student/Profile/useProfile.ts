import { useGetStudentProfileByUserId } from '@/queries/Auth/useGetStudentProfileByUserId';
import { useAuthStore } from '@/zustand/auth/useAuthStore';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const useProfile = () => {
  const { user } = useAuthStore();
  const { studentId } = useParams();
  const navigate = useNavigate();
  const { student } = useGetStudentProfileByUserId({ id: String(studentId) });

  const isShowingMessageButton = useMemo(() => {
    if (!user?.id || !student?.id) return false;
    return String(user?.id) !== String(student?.id);
  }, [user?.id, student?.id]);

  const handleViewChat = () => {
    navigate(`/chat/${user?.id}/${student?.id}`);
  };

  return {
    states: { student, isShowingMessageButton },
    handlers: { handleViewChat },
  };
};
