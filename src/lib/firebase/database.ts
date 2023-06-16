import {
  getDatabase,
  get,
  set,
  push,
  update,
  remove,
  ref,
  Database,
  connectDatabaseEmulator,
  onValue,
  DataSnapshot,
} from "@firebase/database";
import { FirebaseApp } from "firebase/app";

const _get = (db: Database) => (key: string) => get(ref(db, key));

const _set = (db: Database) => (key: string, value: unknown) =>
  set(ref(db, key), value);

const _push = (db: Database) => (key: string, value: unknown) =>
  push(ref(db, key), value);

const _update = (db: Database) => (key: string, value: object) =>
  update(ref(db, key), value);

const _remove = (db: Database) => (key: string) => remove(ref(db, key));

const _onValue =
  (db: Database) =>
  (key: string, callback: (snapshot: DataSnapshot) => unknown) =>
    onValue(ref(db, key), callback);

const getProductionDB = (app: FirebaseApp) =>
  getDatabase(
    app,
    " https://ritho-ae2e3-default-rtdb.asia-southeast1.firebasedatabase.app"
  );

const getLocalDB = () => {
  const db = getDatabase();
  connectDatabaseEmulator(db, "localhost", 3003);

  return db;
};

export const getDatabaseInstance = (app: FirebaseApp) => {
  const db =
    import.meta.env.MODE === "production" ? getProductionDB(app) : getLocalDB();

  return {
    get: _get(db),
    set: _set(db),
    push: _push(db),
    update: _update(db),
    remove: _remove(db),
    onValue: _onValue(db),
  };
};

export type DatabaseInstance = ReturnType<typeof getDatabaseInstance>;
