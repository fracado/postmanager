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

	return {
		getPosts,
	}
}
