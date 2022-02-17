import { ipcMain } from 'electron';
import { MyDatabase } from 'main/types/database.type';
import makeData from '../../utils/makeDBData';
import getDB from '../databases/local.database';

// IPC handler for getting all of the entried in the database
ipcMain.handle('getAllDocs', async () => {
  if (getDB() !== null) {
    // TODO: Remove. This is for testing purposes.
    await getDB()
      .then((res: MyDatabase) => {
        makeData(10).forEach((ele: any) => {
          res.audiodata.insert(ele);
        });

        return res;
      })
      .catch((e) => e);

    // Get collections from database
    const coll = await getDB().then((res) => res);

    // Get all documents from collection, and convert to json
    const results = await coll
      .exportJSON()
      .then((json: any) => {
        return json.collections[0].docs;
      })
      .catch((e: any) => e);

    return results;
  }
  return null;
});
