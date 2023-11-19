export const createUrlFromFile = (file: Buffer) => {
  // Assume you have buffer data in the form of a Uint8Array
  const bufferData = new Uint8Array(file);

  // Create a Blob from the buffer data
  const blob = new Blob([bufferData]);

  // Create a temporary URL for the Blob
  return URL.createObjectURL(blob);
};
