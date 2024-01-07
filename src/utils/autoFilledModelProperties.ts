import { getUnixCurrentTime } from './time';

const getAutoFilledModelFields = (create = false): any => {
  const currentTime = getUnixCurrentTime();
  if (create) {
    return {
      createdAt: currentTime,
      updatedAt: currentTime,
    };
  }

  return {
    updatedAt: currentTime,
  };
};

export { getAutoFilledModelFields };
