//#region node_modules/.nitro/vite/services/ssr/assets/toast-msgtu51x.js
var listeners = /* @__PURE__ */ new Set();
var counter = 0;
function onToast(fn) {
	listeners.add(fn);
	return () => listeners.delete(fn);
}
function emitToast(message, opts = {}) {
	counter += 1;
	const payload = {
		id: counter,
		message,
		kicker: opts.kicker,
		icon: opts.icon
	};
	listeners.forEach((fn) => fn(payload));
}
//#endregion
export { onToast as n, emitToast as t };
