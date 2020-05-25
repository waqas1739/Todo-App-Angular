import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    storage: Storage;
    constructor() {
        this.storage = window.localStorage;
    }

    set(key: string, value: string): void {
        this.storage[key] = value;
    }

    get(key: string): string {
        return this.storage[key] || false;
    }

    setObject(key: string, value: any): void {
        if (!value) {
            return;
        }
        this.storage.setItem(key, JSON.stringify(value));
    }

    getObject(key: string): any {
        return JSON.parse(this.storage[key] || '{}');
    }

    getValue<T>(key: string): T {
        const obj = JSON.parse(this.storage[key] || null);
        return <T>obj || null;
    }
}
