import React, { FC, useState } from 'react'
import Image from 'next/image';

const FileUploadInput: React.FC<{
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string | null;
  }> = ({ name, onChange, value }) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                if (e.target?.result) {
                    setPreviewUrl(e.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };
  return (
    <div className="relative">
    <input
        type="file"
        accept="image/*"
        id="fileInput"
        className="hidden"
        onChange={handleFileChange}
    />
    <label
        htmlFor="fileInput"
        className="block w-[70px] h-[70px] bg-[#F6F7F8] rounded-full cursor-pointer relative overflow-hidden"
        style={{
            backgroundImage: `url('https://i.pinimg.com/736x/8f/e4/18/8fe41808e1d9199dc4283de93e8bb36b.jpg')`,  
            backgroundSize: 'contain',
           backgroundPosition: 'center',
           backgroundRepeat: 'no-repeat'
        }}
    >
        {previewUrl ? (
            <Image
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-contain bg-repeat "
                width={70}
                height={70}
            />

           
        ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              
            </div>
        )}
    </label>
</div>
  )
}

export default FileUploadInput