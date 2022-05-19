import {useQuery, useQueryClient, useMutation} from 'react-query';
import {LocationService} from '../services/location-service';

import {cacheKey} from './cacheStateKey';
import {toast} from "react-toastify";

export const useGetLocations = (page = 1, pageSize = 6, status?:string) => {
  const result = useQuery({
    queryKey: [cacheKey.allLocations, page, pageSize, status],
    queryFn: () => LocationService.getAllLocations(page, pageSize, status),
    keepPreviousData: true,
  });
  return result;
};

export const useAcceptMapping = () => {
  const queryClient = useQueryClient();
  const result = useMutation(LocationService.acceptMapping, {
    onSuccess: () => {
      queryClient.invalidateQueries(cacheKey.allLocations);
    },
    onError: (error: any) => {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
    },
  });
  return result;
};

export const useDenyMapping = () => {
  const queryClient = useQueryClient();
  const result = useMutation(LocationService.declineMapping, {
    onSuccess: () => {
      queryClient.invalidateQueries(cacheKey.allLocations);
    },
    onError: (error: any) => {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
    },
  });
  return result;
};
