import dayjs, { getCurrentTime } from './time';

const getAutoFilledModelFields = (create = false): any => {
  const currentTime = getCurrentTime().toString();
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
