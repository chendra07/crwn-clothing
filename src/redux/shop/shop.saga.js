import { takeLatest, call, put } from "@redux-saga/core/effects";
import {
  firestore,
  convertCollectionSnapshotToMap,
} from "../../firebase/firebase.utils";
import { fetchCollectionSuccess, fetchCollectionFailure } from "./shop.actions";
import ShopActionTypes from "./shop.types";

export function* fetchCollectionAsync() {
  try {
    console.log("async fired");
    const collectionRef = firestore.collection("collections");
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(convertCollectionSnapshotToMap, snapshot);
    yield put(fetchCollectionSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionFailure(error.message));
  }
}

export function* fetchCollectionStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionAsync
  );
}
