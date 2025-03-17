import { useAuthStore } from '@/zustand/auth/useAuthStore';
import { AdminResponse } from '@queries/Admins/types';
import { useGetProfileByUserId } from '@queries/Auth/useGetProfileByUserId';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const useProfile = () => {
  const { user } = useAuthStore();
  const { userId } = useParams();
  const navigate = useNavigate();
  const profileQuery = useGetProfileByUserId<AdminResponse>({ id: String(userId) });

  const isShowingMessageButton = useMemo(() => {
    if (!user?.id || !profileQuery.profile?.id) return false;
    return String(user?.id) !== String(profileQuery.profile?.id);
  }, [user?.id, profileQuery.profile?.id]);

  const handleViewChat = () => {
    navigate(`/chat/${user?.id}/${profileQuery.profile?.id}`);
  };

  return {
    states: { ...profileQuery, isShowingMessageButton },
    handlers: { handleViewChat },
  };
};
