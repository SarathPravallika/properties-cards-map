import axios, { AxiosError, AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { REACT_APP_API_ENDPOINT } from "../../../../constants";
import {
  getData,
  resetData,
  fillData,
} from "../../features/properties/properties.slice";
import postPayload from "./postPayload";

//Worker saga
export function* fetchPosts(action: ReturnType<typeof getData>) {
  try {
    const axiosResponse: AxiosResponse = yield call(
      axios.post,
      `${REACT_APP_API_ENDPOINT}`,
      postPayload
    );
    const { data } = axiosResponse;
    yield put(resetData());
    yield put(fillData({ results: data.data.results }));
  } catch (error) {
    const err = error as AxiosError;
    throw new Error("Error fetching data");
  }
}

function* propertiesSaga() {
  yield takeLatest(getData.type, fetchPosts);
}

export default propertiesSaga;
