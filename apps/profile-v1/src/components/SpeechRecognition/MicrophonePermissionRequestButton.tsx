import { Button } from "flowbite-react";
import React, { useState } from 'react';

export const MicrophonePermissionRequestButton: React.FC = () => {
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);

  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setPermissionGranted(true);
      // Use the stream if needed
    } catch (error) {
      setPermissionGranted(false);
    }
  };

  return (
    <div className="w-full bg-black-800">
      {!permissionGranted && (
        <Button className="w-full bg-black-800" onClick={() => requestMicrophonePermission()}>Cấp quyền Mic của bạn</Button>
      )}
    </div>
  );
};