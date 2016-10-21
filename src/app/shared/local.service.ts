import { Injectable } from '@angular/core';
import { LocalStorageBase } from './local.base';
@Injectable()
export class LocalStorageService extends LocalStorageBase {
    constructor() {
        super(window.localStorage, 'LocalStorage');
    }
}