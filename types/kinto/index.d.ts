// Type definitions for kinto.js v12.2.0, 2018-10-24
// Project: https://github.com/Kinto/kinto.js
// Definitions by: Sachin Shah <https://github.com/zakaluka>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace Kinto {
    export namespace adapters {
        export class BaseAdapter {
            // Public Methods
            clear(): Promise<any>;
            execute(callback?: Function, options?: { preload: any[] }): Promise<any>;
            get(id?: string): Promise<any>;
            getLastModified(): Promise<any>;
            list(params?: { filters?: Object; order?: string; }): Promise<any>;
            loadDump(records?: any[]): Promise<any>;
            saveLastModified(lastModified?: Number): Promise<any>;
        }

        export class IDB extends BaseAdapter {
            // Public Constructor
            constructor(storeName?: String, options?: Object);

            // Public Members
            dbname: any;
            storeName: string;

            // Public Methods
            clear(): Promise<any>;
            close(): Promise<any>;
            execute(callback?: Function, options?: { preload?: any[] }): Promise<any>;
            get(id?: string): Promise<any>;
            getLastModified(): Promise<any>;
            list(params?: { filters?: {}; }): Promise<any>;
            loadDump(records?: any[]): Promise<any>;
            open(): Promise<any>;
            prepare(mode?: string, name?: string | null): { transaction: any; store: any; };
            saveLastModified(lastModified?: Number): Promise<any>;
        }

        // Public Members
        export function createListRequest(store?: any /* IDBStore */, indexField?: String | undefined, value?: any, filters?: Object, done?: Function): any /* IDBRequest */;
        export function findIndexedField(filters?: Object): string | undefined;
        export function transactionProxy(store?: any /* IDBStore */, preloaded?: any[]): Object;
        export const INDEXED_FIELDS: string[];
        export const cursorHandlers: Object;
    }

    export class SyncResultObject {
        // Public Constructor
        constructor();

        // Static Public Members
        static readonly defaults: {
            ok: boolean;
            lastModified: Number;
            errors: any[];
            created: any[];
            updated: any[];
            deleted: any[];
            published: any[];
            conflicts: any[];
            skipped: any[];
            resolved: any[];
        };

        // Public Members
        ok: boolean;

        // Public Methods
        add(type?: string, entries?: any[]): SyncResultObject;
        reset(type?: string): SyncResultObject;
    }

    export class Collection {
        // Public Constructor
        constructor(bucket?: string, name?: string, api?: any, options?: { adapter?: adapters.BaseAdapter, dbPrefix?: string, events?: any, idSchema?: Object, remoteTransformers?: any[], hooks?: Object, localFields?: any[], adapterOptions?: any });

        // Static Public Members
        static readonly strategy: { CLIENT_WINS: string; SERVER_WINS: string; MANUAL: string; };

        // Public Members
        api: any /* KintoClient */;
        readonly bucket: string;
        db: typeof adapters.BaseAdapter;
        events: any /* EventEmitter */;
        hooks: Object;
        idSchema: Object;
        readonly lastModified: Number;
        localFields: any[];
        readonly name: string;
        remoteTransformers: any[];

        // Public Methods
        applyHook(hookName?: any, payload?: any): any;
        cleanLocalFields(record?: Object): Object;
        clear(): Promise<{ data?: any[]; permissions?: {}; }>;
        create(record?: Object, options?: { useRecordId?: boolean; synced?: boolean; }): Promise<any>;
        delete(id?: string, options?: { virtual?: boolean; }): Promise<any>;
        deleteAll(): Promise<any>;
        deleteAny(id?: string): Promise<any>;
        execute(doOperations?: (operation: CollectionTransaction) => any, objectPattern1?: { preloadIds?: any[]; }): Promise<any>;
        gatherLocalChanges(): Promise<any>;
        get(id?: string, options?: { includeDeleted?: boolean; }): Promise<any>;
        getAny(id?: string): Promise<any>;
        importChanges(syncResultObject?: SyncResultObject, decodedChanges?: any[], strategy?: string): Promise<any>;
        list(params?: { filters?: {}, order?: string }, options?: { includeDeleted?: boolean; }): Promise<{ data?: any; permissions?: {}; }>;
        loadDump(records?: any[]): Promise<any>;
        pullChanges(client?: Collection, syncResultObject?: SyncResultObject, options?: { strategy?: string, lastModified?: Number, headers?: {}, exclude?: boolean, retry?: number }): Promise<any>;
        pushChanges(client?: Collection, syncResultObject?: SyncResultObject, changes?: { toDelete?: any[], toSync?: any[] }, options?: { strategy?: string, headers?: {}, retry?: number }): Promise<any>;
        resetSyncStatus(): Promise<any>;
        resolve(conflict?: Object, resolution?: Object): Promise<any>;
        sync(options?: { strategy?: string; headers?: {}; retry?: number; ignoreBackoff?: boolean; bucket?: string; collection?: string; remote?: string; }): Promise<any>;
        update(record?: Object, options?: { synced?: boolean; patch?: boolean; }): Promise<any>;
        upsert(record?: Object): Promise<any>;
    }

    export class CollectionTransaction {
        // Public Constructor
        constructor();

        // Public Members
        adapterTransaction: any;
        collection: any;

        // Public Methods
        create(record?: Object): { data?: Object; permissions?: {}; };
        delete(id?: string, options?: { virtual?: boolean; }): { data?: any; permissions?: {}; };
        deleteAll(ids?: string[]): { data?: any, permissions?: {} };
        deleteAny(id?: string): { data?: any; deleted?: boolean; permissions?: {}; };
        emitEvents(): void;
        get(id?: string, options?: { includeDeleted?: boolean; }): Object;
        getAny(id?: string): { data?: any; permissions?: {}; };
        update(record?: Object, options?: { synced?: boolean; patch?: boolean; }): { data: any; oldRecord: any; permissions: {}; };
        upsert(record?: Object): { data?: any; oldRecord?: any; permissions?: {}; };
    }

    export class Kinto extends KintoBase {
        // Static Public Members
        static readonly adapters: { BaseAdapter: adapters.BaseAdapter; IDB: adapters.IDB; };

        // Public Constructor
        constructor(options: { remote: string, bucket: string, events: any, adapter: adapters.BaseAdapter, adapterOptions: Object, dbPrefix: string, headers: Object, retry: number, requestMode: string, timeout: Number });
    }

    export class KintoBase {
        // Static Public Members
        static readonly adapters: { BaseAdapter: adapters.BaseAdapter; };
        static readonly syncStrategy: { CLIENT_WINS: string; SERVER_WINS: string; MANUAL: string; };

        // Public Constructor
        constructor(options: { remote: string, bucket: string, events: any, adapter: adapters.BaseAdapter, adapterOptions: Object, dbPrefix: string, headers: Object, retry: number, requestMode: string, timeout: Number });

        // Public Methods
        collection(collName: string, options: { idSchema: Object, remoteTransformers: any[], hooks: any[], localFields: any[] }): Collection;

        // Public Members
        api: any;
        events: any;
    }

    // Static Public Summary
    export const AVAILABLE_HOOKS: string[];
    export const DEFAULT_BUCKET_NAME: string;
    export const DEFAULT_REMOTE: string;
    export const DEFAULT_RETRY: number;
    export const RECORD_FIELDS_TO_CLEAN: string[];

    // Static Public Summary
    export function createUUIDSchema(): any;
    export function importChange(transaction?: any, remote?: Object, localFields?: string[]): { type: string, data: any };
    export function markDeleted(record?: Object): any;
    export function markStatus(record?: Object, status?: string): { record: Object, _status: string };
    export function markSynced(record?: Object): any;
    export function recordsEqual(a?: Object, b?: Object, localFields?: any[]): boolean;
    export function deepEqual(a?: Object, b?: Object): boolean;
    export function filterObject(filters?: Object, entry?: Object): Boolean;
    export function filterObjects(filters?: Object, list?: any[]): Boolean[];
    export function omitKeys(obj?: Object, keys?: any[]): Object;
    export function sortObjects(order?: string, list?: any[]): any[];
    export function waterfall(fns: any[], init: any): Promise<any>;
}
