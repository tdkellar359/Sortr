import apiRequest from './sortrApiRequest';

const fetchDirectoryData = (directoryItemType, parentDirectoryHash) => {
  const apiEndpoint = `/api/v1/directory/${directoryItemType}/${parentDirectoryHash}`;
  return apiRequest(apiEndpoint);
};

const getFolders = (parentDirectoryHash) => fetchDirectoryData('folders', parentDirectoryHash);

const getFiles = (parentDirectoryHash) => fetchDirectoryData('files', parentDirectoryHash);

export { getFolders, getFiles };
