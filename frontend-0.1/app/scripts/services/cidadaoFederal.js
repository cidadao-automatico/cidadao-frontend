'use strict';

cidadoAutomaticoApp.factory('cidadolei',
							["$http", "$q",function($http, $q) {
								var knownLei;
								function safeLen(vote) {
									if(vote != undefined) return vote.length;
									else return 0;
								}

								function aggregateVotes(votes) {
									var perVote = _.groupBy(votes, function(vote) {return vote.vote;});
									var perParty = _.groupBy(
										_.map(
											_.pairs(_.groupBy(votes,
															  function(vote) {return vote.party;})),
											function(pair) {
												var p_party = pair[0];
												var p_votes = pair[1];
												var p_perVote = _.groupBy(p_votes, function(vote) {return vote.vote;});
												var against = safeLen(p_perVote.O) + safeLen(p_perVote.N);
												var abstention = safeLen(p_perVote.A) + safeLen(p_perVote.null);
												var favorable = safeLen(p_perVote.S);
												if(against >= favorable && against >= abstention)
													return {party: p_party, vote: 'N'};
												if(favorable >= against && favorable >= abstention)
													return {party: p_party, vote: 'S'};
												return {party: p_party, vote: 'A'};
											}
										),
										function(party) {return party.vote;}
									);
									var against = safeLen(perVote.O) + safeLen(perVote.N);
									var abstention = safeLen(perVote.A) + safeLen(perVote.null);
									var favorable = safeLen(perVote.S);
									var tot = against + abstention + favorable;

									var party_against = safeLen(perParty.O) + safeLen(perParty.N);
									var party_abstention = safeLen(perParty.A) + safeLen(perParty.null);
									var party_favorable = safeLen(perParty.S);
									var party_tot = party_against + party_abstention + party_favorable;

									return {
										partidos: {contra: party_against*100/party_tot, halfContra: 0, abstention: party_abstention*100/party_tot, halfFavorable: 0, favorable: party_favorable*100/party_tot, group: perParty},
										representantes: {contra: against*100/tot, halfContra: 0, abstention: abstention*100/tot, halfFavorable: 0, favorable: favorable*100/tot, group: perVote},
										amigos: {contra: 10, halfContra: 10, abstention: 20, halfFavorable: 30, favorable: 30}
										};
								}

								function fetchLaws() {
									knownLei = $http.jsonp("https://api.scraperwiki.com/api/1.0/datastore/sqlite?format=jsondict&name=camara_proposicoes_br&query=select%20*%20from%20%60proposicoes%60%20limit%2010&callback=JSON_CALLBACK")
										.then(function(laws) {
											var transform = _.map(laws.data,
													  function(law) {
														  var votes = $http.jsonp("https://api.scraperwiki.com/api/1.0/datastore/sqlite?format=jsondict&name=votacao_deputado_br&query=select%20*%20from%20votacao%2C%20deputados%20where%20deputado_id%3Did%20and%20type%3D'"+law.tipo+"'%20and%20year%3D'"+law.ano+"'%20and%20number%3D%22"+law.numero+"%22%20&callback=JSON_CALLBACK")
															  .then(function(votes) { return votes.data;},
																	function() {return [];});
														  return [law.id,
																  {
																	  id: law.id,
																	  title: law.tipo+" "+law.numero+"/"+law.ano,
																	  summary: law.ementa,
																	  status: 0, //todo
																	  yourvote: 0, //todo
																	  rawvotes: votes,
																	  votes: votes.then(aggregateVotes)
																  }];
													  });
											var map = _.object(transform);
											return map;
										});
								}

								function getLaw(lawId) {
										if(knownLei == undefined) {
											fetchLaws();
										}
										return knownLei.then(function(law) {
											return law[lawId];
										});
								}

								// Public API here
								return {
									getLaws: function() {
										if(knownLei == undefined) {
											fetchLaws();
										}
										return knownLei;
									},
									getLaw: getLaw,
									getDetails: function(lawId, category, level) {
										return getLaw(lawId)
											.then(function(law) {
												return law.votes.then(function(votes) {
													var groups = votes[category].group;
													if(level == undefined) return groups;
													switch(level) {
													case 1: return _.union(groups.N, groups.O);
													case 2: return [];
													case 3: return _.union(groups.A, groups.null);
													case 4: return [];
													case 5: return groups.S;
													}
																		  return "";
												}, function() {return [];});
											});
									}
								};
							}]);
