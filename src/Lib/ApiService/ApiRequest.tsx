import axios from 'axios';
import AsyncStorageHelper from '../HelperFiles/AsyncStorageHelper';
import Config from './Config';
import NetworkUtils from '../HelperFiles/NetworkUtils';


const fullUrl = (Path: string) => `${Config.baseurl}${Path}`;

const getToken = () => AsyncStorageHelper.getData(Config.TOKEN);

const headersFormBearer = (token: string) => ({
  'Content-Type': 'application/x-www-form-urlencoded',
  Authorization: `Bearer ${token}`,
});
const headersWithoutBearer = () => ({
  'Content-Type': 'application/json',
});

const headersJsonBearer = (token: string) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

/** Same shape as existing catch branches: response error → status; else request/message */
const axiosCatchLegacy = (error: any) => {
  if (error?.response) return error.response.status;
  if (error?.request) return error.request;
  return error?.message ?? null;
};




export const Post_ApiWithToken = (Url: string, SendData: any) => async () => {
  console.log('Post_ApiWithToken url', fullUrl(Url));
  console.log('Post_ApiWithToken payload', SendData);
  const data = await ApiRequestRow(Url, SendData);
  console.log('ApiRequestRow response', data);
  return { data };
};

export const Update_Api = (Url: string, SendData: any) => async () => {
  const data = await ApiRequestPut(Url, SendData);
  return { data };
};

export const Update_Image = (Url: string, SendData: any) => async () => {
  const data = await ImageRequestPut(Url, SendData);
  return { data };
};

export async function Auth_ApiRequest(Url: string, SendData: any) {
  const isConnected = await NetworkUtils.isNetworkAvailable();
  if (!isConnected) return { error: true, offline: true };
  console.log('isConnected', isConnected);
  try {
    console.log('Auth_ApiRequest payload', { url: fullUrl(Url), data: SendData });
    console.log('Auth_ApiRequest headers', headersWithoutBearer());
    const response = await axios.post(fullUrl(Url), SendData, {
      headers: headersWithoutBearer(),
    });
    return response.data;
  } catch (error) {
    return error ? { error: true } : null;
  }
}

export async function Get_Send_Api(Url: string, SendData: any) {
  try {
    const response = await axios.get(fullUrl(Url));
    console.log('Get_Send_Api response', response);
    return response.data;
  } catch (error) {
    return axiosCatchLegacy(error);
  }
}

export async function ApiRequestRow(Url: string, SendData: any) {
  const token = await getToken();
  try {
    const response = await axios.post(fullUrl(Url), SendData, { headers: headersJsonBearer(token) });
    console.log('ApiRequestRow response', response.data);
    return response.data;
  } catch (error) {
    if (error) return error ? { error: true } : null;
    if (error) return error ? { error: true } : null;
    return error ?? null;
  }
}

export async function ApiRequestPut(Url: string, SendData: any) {
  const token = await getToken();
  try {
    return await axios.put(fullUrl(Url), SendData, { headers: headersJsonBearer(token) });
  } catch (error) {
    return axiosCatchLegacy(error);
  }
}

export async function ImageRequestPut(Url: string, SendData: any) {
  const token = await getToken();
  try {
    return await axios.post(fullUrl(Url), SendData, {
      headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
      timeout: 60000,
    });
  } catch (error) {
    return axiosCatchLegacy(error);
  }
}
