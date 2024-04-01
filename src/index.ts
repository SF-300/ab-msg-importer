import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from "node:child_process";
import { promisify } from "node:util";

import api from '@actual-app/api';
import _ from "lodash";

import {SmsNotification, Transaction} from '../src/core.mjs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


(async function(
    readNotifications: (limit: Number, offset: Number) => Promise<SmsNotification[]>,
) {
    // create directory for data
    const data_path = path.join(__dirname, 'data');
    await promisify(fs.mkdir)(data_path, { recursive: true });
    await api.init({
        // Budget data will be cached locally here, in subdirectories for each file.
        dataDir: data_path,
        // This is the URL of your running server
        serverURL: '',
        // This is the password you use to log into the server
        password: '',
    });
    console.log(__dirname);
    await api.downloadBudget('');
    const accounts_to_ids = new Map(_.map(await api.getAccounts(), (a) => [a.name, a.id]));
    // await api.addTransactions({
    await api.shutdown();
})(
    async function(limit: Number, offset: Number): Promise<SmsNotification[]> {
        return [{
            threadid: "1",
            type: "type",
            read: false,
            number: "1234567890",
            received: "2021-01-01",
            body: "body",
            _id: "1",
        }];
    },
)