var rangeHeight = document.getElementById('range-height');
var rangeWeight = document.getElementById('range-weight');
var rangeWeightPlan = document.getElementById('range-weight-plan');


noUiSlider.create(rangeHeight, {
	start: 170,
	tooltips: true,
	connect: 'lower',
	range: {
		min: 120,
		max: 220,
	},
});


noUiSlider.create(rangeWeight, {
	start: 75,
	tooltips: true,
	connect: 'lower',
	range: {
		min: 40,
		max: 180,
	},
});

noUiSlider.create(rangeWeightPlan, {
	start: 75,
	tooltips: true,
	connect: 'lower',
	range: {
		min: 40,
		max: 180,
	},
});
