export default {
	mapQuality: (num) => {
		const map = {
			0: "usually 96kbps",
			1: "higher 128kbps",
			2: "super high 192kbps",
			3: "lossless 320kbps",
		};
		return map[num];
	},
};
