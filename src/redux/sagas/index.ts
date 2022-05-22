import { fork, all } from "redux-saga/effects";
import propertiesSaga from "./properties/properties.saga";

export default function* rootSaga() {
  yield all([fork(propertiesSaga)]);
}
