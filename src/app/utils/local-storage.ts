export class LStorageService {
	private storage: any = {};

	public addStorageKey(storageKey: any): void {
		if (!this.storage.hasOwnProperty(storageKey)) {
			const storageData: string = window.localStorage.getItem(storageKey) || '';
      this.storage[storageKey] = storageData ? JSON.parse(storageData) : null;
		}
	}

	public getStorageValue(storageKey: string): any {
		return this.storage[storageKey];
	}

	public setStorageValue(storageKey: string, value: any): any {
		this.storage[storageKey] = value;
	}

	public saveAllStorages(): void {
		for (const prop in this.storage) {
			if (this.storage.hasOwnProperty(prop)) {
				window.localStorage.setItem(prop, JSON.stringify(this.storage[prop]));
			}
		}
	}

	public saveStorageByKey(storageKey: string): void {
		if (this.storage.hasOwnProperty(storageKey)) {
			window.localStorage.setItem(storageKey, JSON.stringify(this.storage[storageKey]));
		}
	}

	public clearStorage(): void {
		window.localStorage.clear();
		for (const prop in this.storage) {
			if (this.storage.hasOwnProperty(prop)) {
				this.storage[prop] = null;
			}
		}
	}

	public clearStorageByKey(storageKey: string): void {
		if (this.storage.hasOwnProperty(storageKey)) {
			window.localStorage.removeItem(storageKey);
			this.storage[storageKey] = null;
		}
	}
}

export const storageService = new LStorageService();

export function LocalStorage(autoSave: boolean = true, key?: string): (target: any, propName: string) => void {
	return (target: any, propName: string) => {
		const propNameId: string = key ? key : propName;
    storageService.addStorageKey(propNameId);

		function getValue(): any {
			return storageService.getStorageValue(propNameId);
		}

		function setValueAuto(val: any): void {
			storageService.setStorageValue(propNameId, val);
			storageService.saveStorageByKey(propNameId);
		}

		function setValue(val: any): void {
			storageService.setStorageValue(propNameId, val);
		}

		Object.defineProperty(target, propName, {
			configurable: true,
			enumerable: true,
			get: getValue,
			set: autoSave ? setValueAuto : setValue,
		});
	};
}
