import { useState } from 'react';
import { CameraType, useCameraPermissions } from 'expo-camera';

const useCamera = () => {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  const handleToggleCamera = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  return {
    facing,
    permission,
    requestPermission,
    handleToggleCamera,
  };
};

export default useCamera;