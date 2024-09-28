'use client'

import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast'; 
import { useUploadThing } from '@/lib/uploadthing';
import { cn } from '@/lib/utils';
import { Image, Loader2, MousePointerSquareDashed } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import Dropzone, { FileRejection } from 'react-dropzone';

const Page = () => {
  const { toast } = useToast();
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const router = useRouter();

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: ([data]) => {
      const configId = data.serverData.configId;
      startTransition(() => {
        router.push(`/configure/design?id=${configId}`);
      });
    },
    onUploadProgress(p) {
      setUploadProgress(p);
    },
  });

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;
    setIsDragOver(false);
    toast({
      title: `${file.file.type} type is not supported.`,
      description: "Please choose a PNG, JPG, or JPEG image instead.",
      variant: "destructive"
    });
  };

  const onDropAccepted = (acceptedFiles: File[]) => {
    startUpload(acceptedFiles, { configId: undefined });
    setIsDragOver(false);
  };

  const [isPending, startTransition] = useTransition();

  return (
    <div
      className={cn(
        'relative h-full flex-1 my-16 w-full rounded-xl bg-[#F0F4F1] p-2 ring-1 ring-inset ring-[#E3E8E5] lg:rounded-2xl flex justify-center flex-col items-center',
        {
          'ring-[#83A598]/25 bg-[#83A598]/10': isDragOver,  
        }
      )}>
      <div className='relative flex flex-1 flex-col items-center justify-center w-full'>
        <Dropzone
          onDropRejected={onDropRejected}
          onDropAccepted={onDropAccepted}
          accept={{
            'image/png': ['.png'],
            'image/jpeg': ['.jpeg'],
            'image/jpg': ['.jpg'],
          }}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}>
          {({ getRootProps, getInputProps }) => (
            <div
              className='h-full w-full flex-1 flex flex-col items-center justify-center cursor-pointer'
              {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragOver ? (
                <MousePointerSquareDashed className='h-6 w-6 text-[#83A598] mb-2' />
              ) : isUploading || isPending ? (
                <Loader2 className='animate-spin h-6 w-6 text-[#4D6B58] mb-2' />
              ) : (
                <Image className='h-6 w-6 text-[#4D6B58] mb-2' />
              )}
              <div className='flex flex-col justify-center mb-2 text-sm text-[#4D6B58]'>
                {isUploading ? (
                  <div className='flex flex-col items-center'>
                    <p>Uploading...</p>
                    <Progress
                      value={uploadProgress}
                      className='mt-2 w-40 h-2 bg-[#E3E8E5]'
                    />
                  </div>
                ) : isPending ? (
                  <div className='flex flex-col items-center'>
                    <p>Redirecting, please wait...</p>
                  </div>
                ) : isDragOver ? (
                  <p>
                    <span className='font-semibold'>Drop file</span> to upload
                  </p>
                ) : (
                  <p>
                    <span className='font-semibold'>Click to upload</span> or
                    drag and drop
                  </p>
                )}
              </div>

              {isPending ? null : (
                <p className='text-xs text-[#6B8F76]'>PNG, JPG, JPEG</p>
              )}
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  );
};

export default Page;
