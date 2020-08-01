window.onload = Main;
let bbs;
const baseURL = "http://localhost:3000/";
const fullURL = "http://localhost:3000/contents";

function Main() {
	bbs = new Vue({
		el: "#app",
		computed: {
			postDataRverse() {
				return this.postData.slice().reverse();
			}
		},
		data: {
			inputName: '',
			inputMail: '',
			inputContents: '',
			inputIdSearch: '',
			inputNameSearch: '',
			inputPostSearch: '',
			postData: [],
			loading: false
		},

		created: function (event) {
			this.loading = true;
			preloader(baseURL);

		},

		methods: {
			post: function () {
				post(fullURL, this.inputName, this.inputMail, this.inputContents);
			},
			searchPostByName: function (event) {
				let url = "?name_like=" + this.inputNameSearch;
				url = fullURL + encodeURI(url);
				updateData(url);
			},
			searchPostById: function (event) {
				let url = "?id_like=" + this.inputIdSearch;
				url = fullURL + encodeURI(url);
				updateData(url);
			},
			searchPostByPost: function (event) {
				let url = "?post_like=" + this.inputPostSearch;
				url = fullURL + encodeURI(url);
				updateData(url);
			},
		},
		mounted: function (event) {
			updateData(fullURL);
		}
	});
}

function preloader(baseURL) {
	console.log(bbs);
	let url = baseURL + 'contents';
	fetch(url, { method: 'GET' })
		.then(function (response) {
			return response.json();
		})
		.then(function (response) {
			if (Array.isArray(response)) {
				bbs.postData = response;
				console.log(bbs.postData);
				bbs.loading = false;
			} else {
				bbs.postData = [response];
				console.log(bbs.postData);
				bbs.loading = false;
			}
		})
		.catch(function (error) {
			console.log(error);
		});
}

function post(fullURL, name, mail, post) {
	let url = baseURL + 'contents';
	fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({

			'name': name,
			'mail': mail,
			'post': post
		})
	}).then(function (res) {
		console.log(res);
		preloader(baseURL);
	})
		.catch(function (error) {
			console.log(error);
		});

}

function updateData(url) {
	fetch(url, { method: 'GET' })
		.then(function (response) {
			return response.json();
		})
		.then(function (response) {
			if (Array.isArray(response)) {
				bbs.postData = response;
				console.log(bbs.postData);
				bbs.loading = false;
			} else {
				bbs.postData = [response];
				console.log(bbs.postData);
				bbs.loading = false;
			}
		})
		.catch(function (error) {
			console.log(error);
		});
}