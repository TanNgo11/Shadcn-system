import { useGetProfileByUserId } from '@/queries/Auth/useGetProfileByUserId';
import { TeacherResponse } from '@/queries/Teachers/types';
import { useAuthStore } from '@/zustand/auth/useAuthStore';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const useProfile = () => {
  const { user } = useAuthStore();
  const { userId } = useParams();
  const navigate = useNavigate();
  const { profile: teacher } = useGetProfileByUserId<TeacherResponse>({ id: String(userId) });

  const isShowingMessageButton = useMemo(() => {
    if (!user?.id || !teacher?.id) return false;
    return String(user?.id) !== String(teacher?.id);
  }, [user?.id, teacher?.id]);

  const handleViewChat = () => {
    navigate(`/chat/${user?.id}/${teacher?.id}`);
  };

  return {
    states: { teacher, isShowingMessageButton },
    handlers: { handleViewChat },
  };
};
