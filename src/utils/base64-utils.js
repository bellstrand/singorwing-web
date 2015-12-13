export class Base64Utils {
	constructor() {
		File.prototype.convertToBase64 = function() {
			return new Promise((resolve, reject) => {
				let reader = new FileReader();
				reader.onload = event => {
					resolve(event.target.result);
				};
				reader.readAsDataURL(this);
			});
		};
	}
}
