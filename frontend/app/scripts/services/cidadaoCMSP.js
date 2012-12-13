'use strict';

cidadoAutomaticoApp.factory('cidadolei',
							["$http", "$q",function($http, $q) {
								var knownLei;
								function safeLen(vote) {
									if(vote != undefined) return vote.length;
									else return 0;
								}

								function aggregateVotes(votes) {
									if(votes && votes.length) {
										var perVote = _.groupBy(votes, function(vote) {return vote.voto;});
										var perParty = _.groupBy(
											_.map(
												_.pairs(_.groupBy(votes,
																  function(vote) {return vote.partido;})),
												function(pair) {
													var p_party = pair[0];
													var p_votes = pair[1];
													var p_perVote = _.groupBy(p_votes, function(vote) {return vote.voto;});
													var against = safeLen(p_perVote["Não"]);
													var abstention = safeLen(p_perVote["Não votou"])
															+ safeLen(p_perVote["Abstenção"]);
													var favorable = safeLen(p_perVote["Sim"]);
													if(against >= favorable && against >= abstention)
														return {party: p_party, vote: 'Não'};
													if(favorable >= against && favorable >= abstention)
														return {party: p_party, vote: 'Sim'};
													return {party: p_party, vote: 'Abstenção'};
												}
											),
											function(party) {return party.vote;}
										);
										var against = safeLen(perVote["Não"]);
										var abstention = safeLen(perVote["Não votou"]) + safeLen(perVote["Abstenção"]);
										var favorable = safeLen(perVote["Sim"]);
										var tot = against + abstention + favorable;

										var party_against = safeLen(perParty["Não"]);
										var party_abstention = safeLen(perParty["Não votou"]) + safeLen(perParty["Abstenção"]);
										var party_favorable = safeLen(perParty["Sim"]);
										var party_tot = party_against + party_abstention + party_favorable;

										return {
											partidos: {contra: party_against*100/party_tot, halfContra: 0, abstention: party_abstention*100/party_tot, halfFavorable: 0, favorable: party_favorable*100/party_tot, group: perParty},
											representantes: {contra: against*100/tot, halfContra: 0, abstention: abstention*100/tot, halfFavorable: 0, favorable: favorable*100/tot, group: perVote},
											amigos: {contra: 10, halfContra: 10, abstention: 20, halfFavorable: 30, favorable: 30}
										};
									} else {
										return {};

									}
								}

								function voteStatus(votes) {
									if(votes.length > 0) return 1;
									return 0;
								}

								function fetchLaws(page) {
									if(!page) page = 0;
									knownLei = $http.jsonp("http://localhost:9000/pl?page="+page+"&callback=JSON_CALLBACK")
										.then(function(laws) {
											var transform = _.map(laws.data.content,
																  function(law) {
																	  law.ano = moment(law.data).year();
																	  law.id = law.tipo+law.numero+"-"+law.ano;
																	  var votes = $http.jsonp("http://localhost:9000/pl/"+law.id+"/votes?callback=JSON_CALLBACK")
																			  .then(function(votes) { return votes.data;},
																					function() {return [];});
																	  return [law.id,
																			  {
																				  id: law.id,
																				  data: law.data,
																				  title: law.tipo+" "+law.numero+"/"+law.ano,
																				  summary: law.ementa.toLowerCase(),
																				  status: votes.then(voteStatus),
																				  yourvote: 0, //todo
																				  rawvotes: votes,
																				  votes: votes.then(aggregateVotes),
																				  comissoes: law.comissoes,
																				  tags: law.tags
																			  }];
																  }).sort(function(lawa, lawb) {
																	  return lawa[1].data-lawb[1].data;
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
													case 1: return groups["Não"];
													case 2: return [];
													case 3: return _.union(groups["Abstenção"], groups["Não votou"]);
													case 4: return [];
													case 5: return groups["Sim"];
													}
													return "";
												}, function() {return [];});
											});
									}
								};
							}]);
