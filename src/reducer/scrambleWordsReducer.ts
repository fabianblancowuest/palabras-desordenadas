export interface ScrambleWordsState {
	currentWord: string;
	errorCounter: number;
	guess: string;
	isGameOver: boolean;
	maxAllowErrors: number;
	maxSkips: number;
	points: number;
	scrambledWord: string;
	skipCounter: number;
	words: string[];
	totalWords: number;
}

// const GAME_WORDS = [
// 	"REACT",
// 	"JAVASCRIPT",
// 	"TYPESCRIPT",
// 	"HTML",
// 	"ANGULAR",
// 	"SOLID",
// 	"NODE",
// 	"VUEJS",
// 	"SVELTE",
// 	"EXPRESS",
// 	"MONGODB",
// 	"POSTGRES",
// 	"DOCKER",
// 	"KUBERNETES",
// 	"WEBPACK",
// 	"VITE",
// 	"TAILWIND",
// ];

const GAME_WORDS = [
	"ATILIOSTAMPA",
	"MERCEDESSOSA",
	"ATTAHUALPAYUPANQUI",
	"JORGEROCAFARIASGOMEZ",
	"HORACIOGUARANY",
	"LOSCHALCHALEROS",
	"LOSFRONTERIZOS",
	"RAMONAYALA",
	"EDUARDOFALU",
	"OSVALDOPUGLIESE",
	"JUANFALU",
	"TERESAPARODI",
	"PETECORNEJO",
	"SOLEDADPASTORUTTI",
	"ABELPINTOS",
	"ELCHANGONIETO",
	"BRUNOARIAS",
	"FACUNDOCABRAL",
	"CUNAPEREZ",
	"RAULBARBOZA",
];

// Esta función mezcla el arreglo para que siempre sea aleatorio
const shuffleArray = (array: string[]) => {
	return array.sort(() => Math.random() - 0.5);
};

// Esta función mezcla las letras de la palabra
const scrambleWordFn = (word: string = "") => {
	return word
		.split("")
		.sort(() => Math.random() - 0.5)
		.join("");
};

export type ScrambleWordsActions =
	| { type: "SET_GUESS"; payload: string }
	| { type: "CHECK_ANSWER" }
	| { type: "SKIP_WORD" }
	| { type: "PLAY_AGAIN"; payload: ScrambleWordsState };

export const getInitialState = (): ScrambleWordsState => {
	const shuffledWords = shuffleArray([...GAME_WORDS]);
	return {
		currentWord: shuffledWords[0],
		errorCounter: 0,
		guess: "",
		isGameOver: false,
		maxAllowErrors: 10,
		maxSkips: 10,
		points: 0,
		scrambledWord: scrambleWordFn(shuffledWords[0]),
		skipCounter: 0,
		words: shuffledWords,
		totalWords: shuffledWords.length,
	};
};

export const ScrambleWordsReducer = (
	state: ScrambleWordsState,
	action: ScrambleWordsActions,
): ScrambleWordsState => {
	switch (action.type) {
		case "SET_GUESS":
			return {
				...state,
				guess: action.payload.trim().toUpperCase(),
			};

		case "CHECK_ANSWER": {
			if (state.currentWord === state.guess) {
				const newWords = state.words.slice(1);
				return {
					...state,
					words: newWords,
					points: state.points + 1,
					guess: "",
					currentWord: newWords[0],
					scrambledWord: scrambleWordFn(newWords[0]),
				};
			}

			return {
				...state,
				guess: "",
				errorCounter: state.errorCounter + 1,
				isGameOver: state.errorCounter + 1 >= state.maxAllowErrors,
			};
		}

		case "SKIP_WORD": {
			if (state.skipCounter >= state.maxSkips) {
				return state;
			}

			const updatedWords = state.words.slice(1);
			return {
				...state,
				skipCounter: state.skipCounter + 1,
				words: updatedWords,
				currentWord: updatedWords[0],
				scrambledWord: scrambleWordFn(updatedWords[0]),
				guess: "",
			};
		}

		case "PLAY_AGAIN": {
			return action.payload;
		}

		default:
			return state;
	}
};
