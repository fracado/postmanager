export default function useFetch() {
	const getUsers = async () => {
		return await fetch('https://jsonplaceholder.typicode.com/users')
			.then((response) => {
				if (!response.ok) {
					throw response.status;
				} else {
					return response.json();
				}
			})
	}

	const getPosts = async () => {
		return await fetch('https://jsonplaceholder.typicode.com/posts')
			.then((response) => {
				if (!response.ok) {
					throw response.status;
				} else {
					return response.json();
				}
			})
	}

	const createPost = async (data) => {
		return await fetch('https://jsonplaceholder.typicode.com/posts', {
			method: 'POST',
			body: JSON.stringify({ data }),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		}).then((response) => {
			if (!response.ok) {
				throw response.status;
			} else {
				return response.json();
			}
		})
	}

	const getPost = async (id) => {
		return await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
			.then((response) => {
				if (!response.ok) {
					throw response.status;
				} else {
					return response.json();
				}
			})
	}

	const updatePost = async (id, data) => {
		return await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
			method: 'PUT',
			body: JSON.stringify(data),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		}).then((response) => {
			if (!response.ok) {
				throw response.status;
			} else {
				return response.json();
			}
		})
	}

	const deletePost = async (id) => {
		return await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
			method: 'DELETE',
		}).then((response) => {
			if (!response.ok) {
				throw response.status;
			} else {
				return response.json();
			}
		})
	}

	return {
		getUsers,
		getPosts,
		getPost,
		createPost,
		updatePost,
		deletePost,
	}
}
