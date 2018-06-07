import { Injectable } from '@angular/core';
import { Settings } from '../models/Settings';

@Injectable()
export class SettingsService {
  private settings: Settings = {
    allowRegistration: true,
    disableBalenceOnAdd: true,
    disableBalenceOnEdit: true
  }

  constructor() { }

  getSettings() {
    return this.settings;
  }
}
