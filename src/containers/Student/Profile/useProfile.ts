import { useGetStudentById } from '@/queries/Students/useGetStudentById';
import { useGetStudentProfileByUserId } from '@/queries/Auth/useGetStudentProfileByUserId';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '@/zustand/auth/useAuthStore';

export const useProfile = () => {
  const { user } = useAuthStore();
  const { studentId } = useParams();
  const navigate = useNavigate();
  const { student } = useGetStudentProfileByUserId({ id: String(studentId) });

  const handleViewChat = () => {
    navigate(`/chat/${user?.id}/${student?.id}`);
  };
  return {
    states: { student },
    handlers: { handleViewChat },
  };
};
