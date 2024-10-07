const testResults = {
	age: '',
	height: '',
	weight: '',
	weightTarget: '',
};

const quiz = {
	questionIndex: 0,
	questions: [],
	progressBars: [],

	init: function () {
		const self = this;
		this.questions = document.querySelectorAll('.js-quiz-question');
		this.progressBars = document.querySelectorAll('.js-quiz-progress-bar');

		document.querySelectorAll('.js-quiz-btn-next').forEach(function (btn) {
			btn.addEventListener('click', function (e) {
				e.preventDefault();

				const question = btn.closest('.js-quiz-question');
				const inputs = question.querySelectorAll('.js-quiz-input');

				if (inputs.length > 0) {
					let allInputsValid = true;

					inputs.forEach(function (input) {
						if (input.checkValidity() === false) {
							allInputsValid = false;
							input.reportValidity();
						}
					});

					if (allInputsValid) self.nextQuestion();
				} else {
					self.nextQuestion();
				}
			});
		});

		document.querySelectorAll('.js-quiz-btn-prev').forEach(function (btn) {
			btn.addEventListener('click', function (e) {
				e.preventDefault();

				if (self.questionIndex > 0) {
					self.changeQuestion(self.questionIndex - 1);
				} else {
					history.back();
				}
			});
		});

		let radioTimeout = 0;
		document.querySelectorAll('.js-quiz-radio').forEach(function (input) {
			input.addEventListener('click', function (e) {
				let timeout = 500;

				if (input.classList.contains('js-quiz-radio-check-correct')) {
					timeout = 1500;

					const isCorrect = input.classList.contains(
						'js-quiz-radio-correct',
					);

					if (!isCorrect) {
						input.labels.forEach((label) =>
							label.classList.add('questions__item_error'),
						);

						input.parentNode
							.querySelector('.js-quiz-radio-correct')
							.labels.forEach((label) =>
								label.classList.add('questions__item_correct'),
							);
					} else {
						input.labels.forEach((label) =>
							label.classList.add('questions__item_correct'),
						);
					}
				}

				if (radioTimeout) clearTimeout(radioTimeout);

				if (input.checked)
					radioTimeout = setTimeout(() => self.nextQuestion(), timeout);
			});
		});

		document.querySelectorAll('.js-quiz-checkbox').forEach(function (input) {

			// if (!input.required) return;

			input.addEventListener('change', function (e) {
				const question = input.closest('.js-quiz-question');
				const checkboxes = question.querySelectorAll('.js-quiz-checkbox');
				const btn = question.querySelector('.js-quiz-btn-next');
				const checkboxesChecked = Array.from(checkboxes).filter(
					(checkbox) => checkbox.checked,
				);

				btn.disabled = checkboxesChecked.length === 0;
			});
		});

		document.querySelectorAll('.js-quiz-input').forEach(function (input) {
			if (!input.required) return;

			input.addEventListener('input', function () {
				const question = input.closest('.js-quiz-question');
				const inputs = question.querySelectorAll('.js-quiz-input');
				const btn = question.querySelector('.js-quiz-btn-next');

				switch (input.dataset.value) {
					case 'age':
						testResults.age = input.value;
						break;
					case 'height':
						testResults.height = input.value;
						break;
					case 'weight':
						testResults.weight = input.value;
						break;
					case 'weightTarget':
						testResults.weightTarget = input.value;
						break;
				}
				const allFull =
					Array.from(inputs).filter((input) => input.value).length ===
					inputs.length;

				btn.disabled = !allFull;
			});
		});
	},

	nextQuestion: function () {
		this.changeQuestion(this.questionIndex + 1);
	},

	changeQuestion: function (index) {
		if (index < 0) return;

		this.questionIndex = index;

		this.questions.forEach((question, i) => {
			question.style.display = index === i ? 'flex' : 'none';
		});

		this.changeProgressBar(index);

		// if (index + 1 === this.questions.length) this.finish();
	},

	// finish: function () {
	// 	const btnPrev = document.querySelector('.js-quiz-btn-prev');
	// 	document.querySelector('.loader-box').style.display = 'block';
	// 	btnPrev.style.display = 'none';

	// 	const time = 3500;
	// 	let finish = 1;
	// 	function writingList() {
	// 		var opacity = 1;
	// 		var writeList = setInterval(function () {
	// 			var resList = document.querySelectorAll('.loader-text'); // играем с прозрачностью
	// 			opacity = 1;

	// 			if (resList.length === 1) {
	// 				clearInterval(writeList);
	// 				clearInterval(valueLoading);
	// 			} else {
	// 				resList[0].remove();
	// 				resList[1].style.opacity = 1;
	// 			}
	// 			finish++;
	// 		}, 700);
	// 		var value = document.querySelector('.answers__select-number');
	// 		var valueLoading = setInterval(function () {
	// 			const newValue = +value.textContent.replace(/%/, '').trim() + 1;
	// 			if (newValue <= 100) {
	// 				value.textContent = newValue + '%';
	// 			}
	// 		}, 20);
	// 	}

	// 	writingList();
	// 	// let countdown = setInterval(function () {
	// 	// 	console.log(finish);
	// 	// 	if (finish > 5) {
	// 	// 		window.location = 'land.html';
	// 	// 		clearInterval(countdown);
	// 	// 	}
	// 	// }, time);
	// },

	changeProgressBar: function (index) {
		if (this.progressBars.length > 0) {
			const width =
				((100 / (this.questions.length - 1)) * (index + 1)).toFixed(2) + '%';

			this.progressBars.forEach(
				(progressBar) => (progressBar.style.width = width),
			);
		}
	},
};

quiz.init();
quiz.changeQuestion(0);

const time = 1000;
const step = 100;

function outNum(num, elem) {
  let e = document.querySelector("#num-user");
  n = 0;
  let t = Math.round(time / (num / step));
  let interval = setInterval(() => {
    n = n + step;
    if (n == num) {
      clearInterval(interval);
    }
    e.innerHTML = n;
  }, t);
}

outNum(90800, "#num-user");
