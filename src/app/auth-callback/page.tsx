'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const Page = () => {
  const [configId, setConfigId] = useState<string | null>(null);
  const router = useRouter();

  // Retrieve the configuration ID from local storage on component mount
  useEffect(() => {
    const configurationId = localStorage.getItem('configurationId');
    if (configurationId) setConfigId(configurationId);
  }, []);

  // Use React Query to get the authentication status from the API route
  const { data, isError, isLoading } = useQuery({
    queryKey: ['auth-callback'],
    queryFn: async () => {
      const response = await fetch('/api/auth/status');
      if (!response.ok) {
        throw new Error('Failed to fetch authentication status');
      }
      return response.json();
    },
    retry: true,
    retryDelay: 500,
    enabled: !!configId, // Ensure the query runs only when there is a configId
  });

  // Handle successful authentication
  useEffect(() => {
    if (data?.success) {
      if (configId) {
        localStorage.removeItem('configurationId');
        router.push(`/configure/preview?id=${configId}`);
      } else {
        router.push('/');
      }
    } else if (isError) {
      // Handle errors (e.g., display an error message or redirect to an error page)
      console.error('Authentication failed');
      router.push('/error'); // Redirect to an error page or display an error message
    }
  }, [data, configId, router, isError]);

  return (
    <div className='w-full mt-24 flex justify-center'>
      <div className='flex flex-col items-center gap-2' aria-live='polite'>
        {isLoading ? (
          <>
            <Loader2 className='h-8 w-8 animate-spin text-zinc-500' />
            <h3 className='font-semibold text-xl'>Logging you in...</h3>
            <p>You will be redirected automatically.</p>
          </>
        ) : (
          isError && (
            <p className='text-red-500'>There was an error logging you in. Please try again.</p>
          )
        )}
      </div>
    </div>
  );
};

export default Page;
