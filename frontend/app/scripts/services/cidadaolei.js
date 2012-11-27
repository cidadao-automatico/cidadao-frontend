'use strict';

cidadoAutomaticoApp.factory('cidadolei', function() {

	var testLei = {
		"000000": {
			title: "titulo da lei",
			id: "000000",
			summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut consectetur adipisicing elit, sedlabore et dolore magna aliqua...",
			status: 0,
			yourvote: 0,
			votes: {
				representantes: {
					contra: 12,
					halfContra: 24,
					abstention: 36,
					halfFavorable: 8,
					favorable: 20
				},
				amigos: {
					contra: 36,
					halfContra: 12,
					abstention: 20,
					halfFavorable: 8,
					favorable: 24
				},
				partidos: {
					contra: 20,
					halfContra: 12,
					abstention: 24,
					halfFavorable: 8,
					favorable: 36
				},
			}
		},
		"000001": {
			title: "titulo da lei",
			id: "000001",
			summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut consectetur adipisicing elit, sedlabore et dolore magna aliqua...",
			status: 0,
			yourvote: -4,
			votes: {
				representantes: {
					contra: 12,
					halfContra: 24,
					abstention: 36,
					halfFavorable: 8,
					favorable: 20
				},
				amigos: {
					contra: 36,
					halfContra: 12,
					abstention: 20,
					halfFavorable: 8,
					favorable: 24
				},
				partidos: {
					contra: 20,
					halfContra: 12,
					abstention: 24,
					halfFavorable: 8,
					favorable: 36
				},
			}
		},
		"000002": {
			title: "titulo da lei",
			id: "000002",
			summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut consectetur adipisicing elit, sedlabore et dolore magna aliqua...",
			status: 0,
			yourvote: 1,
			votes: {
				representantes: {
					contra: 12,
					halfContra: 24,
					abstention: 36,
					halfFavorable: 8,
					favorable: 20
				},
				amigos: {
					contra: 36,
					halfContra: 12,
					abstention: 20,
					halfFavorable: 8,
					favorable: 24
				},
				partidos: {
					contra: 20,
					halfContra: 12,
					abstention: 24,
					halfFavorable: 8,
					favorable: 36
				},
			}
		}
	};

	// Public API here
	return {
		getLaws: function() {
			return testLei;
		},
		getLaw: function(lawId) {
			return testLei[lawId];
		}
	};
});
