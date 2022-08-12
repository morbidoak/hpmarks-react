export default function formatDateTime(ts) {
	const lz = (s) => ("0"+s).slice(-2);
	let dt = new Date(ts);
	return `${lz(dt.getHours())}:${lz(dt.getMinutes())}:${lz(dt.getSeconds())} ${lz(dt.getDate())}.${lz(dt.getMonth()+1)}.${dt.getFullYear()}`;
}