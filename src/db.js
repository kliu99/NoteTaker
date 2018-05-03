import Dexie from 'dexie';

const db = new Dexie('NoteTaker');
db.version(1).stores({ meta: 'videoId' });
db.version(1).stores({ notes: '[videoId+time]' });

export default db;