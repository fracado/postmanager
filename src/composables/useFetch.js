export default function useFetch() {
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

	return {
		getPosts,
		createPost,
	}
}
