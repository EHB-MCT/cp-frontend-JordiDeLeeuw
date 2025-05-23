import { useFairytaleList } from "./useFairytaleList";
//fisher-yates shuffle
function shuffle(array: any[]) {
	let i = array.length,
		j,
		temp;
	while (--i > 0) {
		j = Math.floor(Math.random() * (i + 1));
		temp = array[j];
		array[j] = array[i];
		array[i] = temp;
	}
	return array;
}

export const usePopularFairytales = () => {
	//this hook is used to get a list of popular fairytales.
	const { fairytales, isLoading } = useFairytaleList();
	//if the fairytales are still loading, return an empty array and loading state
	if (isLoading) return { fairytales: [], isLoading };
	//get the current date as a string
	//this is used to create a unique key for the local storage
	//this key is used to store the popular fairytales for the current date
	//this way, the popular fairytales will be different every day
	const today = new Date().toDateString();
	const key = `popularFairytales-${today}`;
	//this is used to store the popular fairytales for the current date
	let sorted = [];
	//check if the popular fairytales for the current date are already stored in local storage
	//if they are, use them
	//if not, shuffle the fairytales and store them in local storage
	const cached = localStorage.getItem(key);
	if (cached) {
		sorted = JSON.parse(cached);
	} else {
		//used ... to create a copy of the fairytales array
		sorted = shuffle([...fairytales]); //copy then shuffle
		localStorage.setItem(key, JSON.stringify(sorted));
	}

	return { fairytales: sorted, isLoading: false };
};
