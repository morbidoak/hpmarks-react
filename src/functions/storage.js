export function getLocalStoredState(key, defaultValue) {
	let val = localStorage.getItem(key);
	if (val === null) {
		localStorage.setItem(key, JSON.stringify(defaultValue));
		return defaultValue;
	}
	return JSON.parse(val);
}

export function setLocalStoredState(setter, key, val) {
	setter(val);
	localStorage.setItem(key, JSON.stringify(val));
}

export function dropAllData() {
	localStorage.clear();
	window.location.reload();
}