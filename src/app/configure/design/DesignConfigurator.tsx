'use client';

import HandleComponent from '@/components/HandleComponent';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn, formatPrice } from '@/lib/utils';
import NextImage from 'next/image';
import { Rnd } from 'react-rnd';
import { RadioGroup } from '@headlessui/react';
import { useRef, useState } from 'react';
import { COLORS, FINISHES, MATERIALS, MODELS } from '@/validators/option-validator';
import { Label } from '@/components/ui/label';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, ChevronsUpDown } from 'lucide-react';
import { BASE_PRICE, PRODUCT_PRICES } from '@/config/products';
import { useUploadThing } from '@/lib/uploadthing';
import { useToast } from '@/components/ui/use-toast';
import { useMutation } from '@tanstack/react-query';
import { saveConfig as _saveConfig, SaveConfigArgs } from './actions';
import { useRouter } from 'next/navigation';

interface DesignConfiguratorProps {
  configId: string;
  imageUrl: string;
  imageDimensions: { width: number; height: number };
}

const DesignConfigurator = ({
  configId,
  imageUrl,
  imageDimensions,
}: DesignConfiguratorProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: saveConfig, isPending } = useMutation({
    mutationKey: ['save-config'],
    mutationFn: async (args: SaveConfigArgs) => {
      await Promise.all([saveConfiguration(), _saveConfig(args)]);
    },
    onError: () => {
      toast({
        title: 'Something went wrong',
        description: 'There was an error on our end. Please try again.',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      router.push(`/configure/preview?id=${configId}`);
    },
  });

  const [options, setOptions] = useState<{
    color: (typeof COLORS)[number];
    model: (typeof MODELS.options)[number];
    material: (typeof MATERIALS.options)[number];
    finish: (typeof FINISHES.options)[number];
  }>({
    color: COLORS[0],
    model: MODELS.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  });

  const [renderedDimension, setRenderedDimension] = useState({
    width: imageDimensions.width / 3,
    height: imageDimensions.height / 3,
  });

  const [renderedPosition, setRenderedPosition] = useState({
    x: 50,
    y: 100,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const imageAreaRef = useRef<HTMLDivElement>(null);

  const { startUpload } = useUploadThing('imageUploader');

  async function saveConfiguration() {
    try {
      // Set constant values for dimensions and positioning
      const width = 320;
      const height = 320;
      const boxTop = 140;
      const boxLeft = 190;
  
      // Assign constants to 'case' values
      const caseWidth = width;
      const caseHeight = height;
      const caseTop = boxTop;
      const caseLeft = boxLeft;
  
      // Get the bounding rectangle of the container
      const { left: containerLeft, top: containerTop } = containerRef.current!.getBoundingClientRect();
  
      // Calculate offsets for the canvas drawing position
      const leftOffset = caseLeft - containerLeft;
      const topOffset = caseTop - containerTop;
  
      const actualX = renderedPosition.x - leftOffset;
      const actualY = renderedPosition.y - topOffset;
  
      // Create a canvas and set its size
      const canvas = document.createElement('canvas');
      canvas.width = caseWidth;
      canvas.height = caseHeight;
      const ctx = canvas.getContext('2d');
  
      // Load the user image
      const userImage = new Image();
      userImage.crossOrigin = 'anonymous';
      userImage.src = imageUrl;
  
      // Wait for the image to load before proceeding
      await new Promise((resolve) => (userImage.onload = resolve));
  
      // Draw the user image on the canvas at the calculated position
      ctx?.drawImage(
        userImage,
        actualX,
        actualY,
        renderedDimension.width,
        renderedDimension.height
      );
  
      // Convert the canvas to a Base64 string
      const base64 = canvas.toDataURL();
      const base64Data = base64.split(',')[1];
  
      // Convert the Base64 string to a Blob
      const blob = base64ToBlob(base64Data, 'image/png');
      const file = new File([blob], 'filename.png', { type: 'image/png' });
  
      // Upload the file
      await startUpload([file], { configId });
    } catch (err) {
      // Handle any errors that occur during the process
      toast({
        title: 'Something went wrong',
        description: 'There was a problem saving your config, please try again.',
        variant: 'destructive',
      });
    }
  }

  

  function base64ToBlob(base64: string, mimeType: string) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  }

  return (
    <div className='relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20'>
      <div
        ref={containerRef}
        className='relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed bg-gray-100 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'>
        
        {/* Tote Bag Background */}
        <NextImage src='/tote.png' alt='tote image' width={400} height={600} className='absolute' />

        {/* Defined Image Area Box */}
        <div
          ref={imageAreaRef}
          className={cn(
            'relative z-40 border border-gray-300 rounded-md',
            options.color.value !== 'natural' ? options.color.tw.bg : ''
          )}
          style={{
            width: '230px',  // Define the box width
            height: '230px', // Define the box height
            top: '85px',    // Adjust to fit on the tote bag
            left: '0px',    // Adjust to fit on the tote bag
          }}>
          {/* User Image within the defined area */}
          <Rnd
  default={{
    x: 150,
    y: 205,
    height: imageDimensions.height / 4,
    width: imageDimensions.width / 4,
  }}
  onResizeStop={(_, __, ref, ___, { x, y }) => {
    setRenderedDimension({
      height: parseInt(ref.style.height.slice(0, -2)),
      width: parseInt(ref.style.width.slice(0, -2)),
    });

    setRenderedPosition({ x, y });
  }}
  onDragStop={(_, data) => {
    const { x, y } = data;
    setRenderedPosition({ x, y });
  }}
  className="absolute z-20 border-[3px] border-primary"
  lockAspectRatio
  bounds={false} // Allow the image to move freely outside the box
  resizeHandleComponent={{
    bottomRight: <HandleComponent />,
    bottomLeft: <HandleComponent />,
    topRight: <HandleComponent />,
    topLeft: <HandleComponent />,
  }}
>
  <div className="relative w-full h-full">
    <NextImage
      src={imageUrl}
      fill
      alt="your image"
      className="pointer-events-none"
    />
  </div>
</Rnd>


        </div>
      </div>

    {/* UI Controls */}
      <div className='h-[37.5rem] w-full col-span-full lg:col-span-1 flex flex-col bg-white'>
        <ScrollArea className='relative flex-1 overflow-auto'>
          <div
            aria-hidden='true'
            className='absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none'
          />

          <div className='px-8 pb-12 pt-8'>
            <h2 className='tracking-tight font-bold text-3xl'>
              Customize your tote
            </h2>

            <div className='w-full h-px bg-zinc-200 my-6' />

            <div className='relative mt-4 h-full flex flex-col justify-between'>
              <div className='flex flex-col gap-6'>
                <RadioGroup
                  value={options.color}
                  onChange={(val) => {
                    setOptions((prev) => ({
                      ...prev,
                      color: val,
                    }))
                  }}>
                  <Label>Color: {options.color.label}</Label>
                  <div className='mt-3 flex items-center space-x-3'>
                    {COLORS.map((color) => (
                      <RadioGroup.Option
                        key={color.label}
                        value={color}
                        className={({ active, checked }) =>
                          cn(
                            'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent',
                            {
                              [color.tw.border]: active || checked,
                            }
                          )
                        }>
                        <span
                          className={cn(
                            color.tw.bg,
                            'h-8 w-8 rounded-full border border-black border-opacity-10'
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>

                <div className='relative flex flex-col gap-3 w-full'>
                  <Label>Size</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant='outline'
                        role='combobox'
                        className='w-full justify-between'>
                        {options.model.label}
                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {MODELS.options.map((model) => (
                        <DropdownMenuItem
                          key={model.label}
                          className={cn(
                            'flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100',
                            {
                              'bg-zinc-100':
                                model.label === options.model.label,
                            }
                          )}
                          onClick={() => {
                            setOptions((prev) => ({ ...prev, model }))
                          }}>
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              model.label === options.model.label
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          {model.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {[MATERIALS, FINISHES].map(
                  ({ name, options: selectableOptions }) => (
                    <RadioGroup
                      key={name}
                      value={options[name]}
                      onChange={(val) => {
                        setOptions((prev) => ({
                          ...prev,
                          [name]: val,
                        }))
                      }}>
                      <Label>
                        {name.slice(0, 1).toUpperCase() + name.slice(1)}
                      </Label>
                      <div className='mt-3 space-y-4'>
                        {selectableOptions.map((option) => (
                          <RadioGroup.Option
                            key={option.value}
                            value={option}
                            className={({ active, checked }) =>
                              cn(
                                'relative block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm border-2 border-zinc-200 focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between',
                                {
                                  'border-primary': active || checked,
                                }
                              )
                            }>
                            <span className='flex items-center'>
                              <span className='flex flex-col text-sm'>
                                <RadioGroup.Label
                                  className='font-medium text-gray-900'
                                  as='span'>
                                  {option.label}
                                </RadioGroup.Label>

                                {option.description ? (
                                  <RadioGroup.Description
                                    as='span'
                                    className='text-gray-500'>
                                    <span className='block sm:inline'>
                                      {option.description}
                                    </span>
                                  </RadioGroup.Description>
                                ) : null}
                              </span>
                            </span>

                            <RadioGroup.Description
                              as='span'
                              className='mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right'>
                              <span className='font-medium text-gray-900'>
                                {formatPrice(option.price / 100)}
                              </span>
                            </RadioGroup.Description>
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  )
                )}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className='w-full px-8 h-16 bg-white'>
          <div className='h-px w-full bg-zinc-200' />
          <div className='w-full h-full flex justify-end items-center'>
            <div className='w-full flex gap-6 items-center'>
              <p className='font-medium whitespace-nowrap'>
              {formatPrice(
          (
            PRODUCT_PRICES.model[options.model.value] + // Use model price based on the selected size
            options.finish.price +
            options.material.price
        ) / 100
      )}
              </p>
              <Button
    isLoading={isPending}
    disabled={isPending}
    loadingText="Saving"
    onClick={() =>
      saveConfig({
        configId,
        color: options.color.value,
        finish: options.finish.value,
        material: options.material.value,
        model: options.model.value,
      })
    }
    size='sm'
    className='w-full'>
    Continue
    <ArrowRight className='h-4 w-4 ml-1.5 inline' />
  </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesignConfigurator;
