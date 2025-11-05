// Simple start to the course dataset.
// Will be expanded later

const courses = [
	{
		course_id: 101,
		course_code: 'CSCI 101',
		title: 'Introduction to Web Development',
		instructor: 'Dr. Leia Organa',
		time: 'Mon 10:00–11:30',
		location: 'Room G101',
	},
	{
		course_id: 110,
		course_code: 'MATH 110',
		title: 'Calculus I',
		instructor: 'Prof. Darth Vader',
		time: 'Tue 09:00–10:30',
		location: 'Room A201',
	},
];

const user_schedule = [];

module.exports = {
	courses,
	user_schedule,
};
