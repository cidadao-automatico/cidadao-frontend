'use strict';

cidadoAutomaticoApp.directive('d3link', function() {
	var controller = function($scope, $attrs, $element) {
		$scope.$watch('votes', function() {
			if($scope.votes != undefined &&  $scope.votes.representantes) {
				var groups = $scope.votes.representantes.group;
				if(groups!= undefined) {
					var abstention = _.without(_.union(groups["Abstenção"], groups["Não votou"]), undefined);
					var contra = _.without(groups["Não"], undefined);
					var favor = _.without(groups["Sim"], undefined);

					var w = 600,
						h = 600,
						rx = w / 2,
						ry = h / 2,
						m0,
						rotate = 0;

					var color = d3.scale.category20();

					var deputy_index = {};
					var idx = 0;
					var links_hash = {};
					var nodes = [];
					var parties_hash = {};
					var total = 0;
					var maxLink = 0;
					var rootIndex = deputy_index["root"] = nodes.push({name: "root", count: 1, children: []})-1;
					var index = {};
					index["nao"] =  deputy_index["nao"] = nodes.push({name: "Não", count: 1,
																	  children: [], parent: nodes[rootIndex]})-1;
					index["sim"] =  deputy_index["sim"] = nodes.push({name: "Sim", count: 1,
																	  children: [], parent: nodes[rootIndex]})-1;
					index["abstention"] =  deputy_index["abstention"] = nodes.push({name: "Abstenção", count: 1,
																					children: [], parent: nodes[rootIndex]})-1;
					nodes[rootIndex].children.push(nodes[index["nao"]]);
					nodes[rootIndex].children.push(nodes[index["sim"]]);
					nodes[rootIndex].children.push(nodes[index["abstention"]]);

					var makeDeputyNode = function(row, vote) {
						var i = deputy_index[row.nome];

						var parent_i = deputy_index[row.partido+'='+vote];
						if(parent_i == undefined) {
							parent_i = deputy_index[row.partido+'='+vote] = nodes.push({
								name: row.partido,
								count: 1,
								parent: nodes[index[vote]],
								children: [],
								vote: vote})-1;
							nodes[parent_i].key=parent_i;
							nodes[index[vote]].children.push(nodes[parent_i]);
						}

						if((i == undefined) || (nodes[i] == undefined)) {
							deputy_index[row.nome] = i = nodes.push({
								name: row.nome,
								id: row.nome,
								party: row.partido,
								count: 1,
								parent: nodes[parent_i],
								children: [],
								vote: vote})-1;
							nodes[i].key = i;
							nodes[parent_i].children.push(nodes[i]);
						}
						return i;
					};

					var cluster = d3.layout.cluster()
							.size([360, ry - 120])
							.sort(function(a, b) { return d3.ascending(a.name, b.name); });

					var bundle = d3.layout.bundle();

					var line = d3.svg.line.radial()
							.interpolate("bundle")
							.tension(1)
							.radius(function(d) { return d.y; })
							.angle(function(d) { return d.x / 180 * Math.PI; });

					// Chrome 15 bug: <http://code.google.com/p/chromium/issues/detail?id=98951>
					var div = d3.select(jQuery($element).find(".wheel")[0]).insert("div", "h2")
							.style("width", w + "px")
							.style("height", w + "px");

					var svg = div.append("svg:svg")
							.attr("width", w)
							.attr("height", w)
							.append("svg:g")
							.attr("transform", "translate(" + rx + "," + ry + ")");

					svg.append("svg:path")
						.attr("class", "arc")
						.attr("d", d3.svg.arc().outerRadius(ry - 120).innerRadius(0).startAngle(0).endAngle(2 * Math.PI));

					var linkTotals = 0;
					var shouldTotal = 0;


					var maxName = function(namea, nameb) {
						if(namea > nameb) return namea;
						return nameb;
					};
					var minName = function(namea, nameb) {
						if(namea <= nameb) return namea;
						return nameb;
					};

					var makeGroup = function(grouped, vote) {
						_.forEach(grouped, function(deputado) {
							parties_hash[deputado.partido] = true;
							var i = makeDeputyNode(deputado, vote);
							_.forEach(grouped, function(other) {
								if(other.nome != deputado.nome) {
									var j = makeDeputyNode(other, vote);
									var label = maxName(deputado.nome, other.nome)+'='+minName(deputado.nome, other.nome);
									if(links_hash[label] == undefined)
										links_hash[label] = {source: nodes[Math.min(i, j)],
															 target: nodes[Math.max(i, j)],
															 value: 0,
															 vote:vote};
									links_hash[label].value++;
									maxLink = Math.max(maxLink, links_hash[label].value);
									linkTotals++;
								}
							});
						});
					};
					makeGroup(favor, "sim");
					makeGroup(contra, "nao");
					makeGroup(abstention, "abstention");

					var alllinks =d3.values(links_hash);
					var links = alllinks;
					var parties = d3.keys(parties_hash).sort(function(pa, pb) {return d3.ascending(pa, pb);});
					var x = d3.scale.ordinal().rangeBands([0, 500]).domain(parties);
					var legend = jQuery($element).find('.legend')[0];
					legend = d3.select(legend).append("svg")
						.attr('width', "100%")
						.attr('height', (2*x.rangeBand())+30);

					legend.append("g")
						.selectAll(".cell")
						.data(parties)
						.enter()
						.append('rect')
						.attr("transform", function(d, i) { return "translate(" + x(d) + ",0)"; })
						.attr("class", "cell")
						.attr("width", x.rangeBand())
						.attr("height", x.rangeBand()/5)
						.style('fill', function(d) {return color(d);});

					legend.append("g")
						.attr('transform', 'translate(0,'+(x.rangeBand()/5)+')')
						.selectAll(".cellText")
						.data(parties)
						.enter()
						.append('text')
						.text(function(d) {return d;})
						.attr('transform', function(d) {return "translate("+(x(d)+10+x.rangeBand()/2)+",0) rotate(70)";})
						.style('fill', "black")
						.attr("dy", "1em");

					var nodes_cluster = cluster.nodes(nodes[rootIndex]),
						splines = bundle(links);

/*					var path = svg.selectAll("path.link")
							.data(links)
							.enter().append("svg:path")
							.attr("class", function(d) { return d.vote+" link source-" + d.source.key + " target-" + d.target.key; })
							.attr("d", function(d, i) { return line(splines[i]); });*/


					var nameNode = svg.selectAll("g.node")
							.data(nodes_cluster.filter(function(n) { return n.children.length == 0 && n.party!=undefined; }))
							.enter().append("svg:g")
							.attr("class", "node")
							.attr("id", function(d) { return "node-" + d.key; })
							.attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; });
					nameNode.append('rect')
						.attr("width", "5px")
						.attr("height", "15px")
						.attr("class", function(d) {return d.vote;});
					nameNode.append("svg:text")
						.attr("dx", function(d) { return d.x < 180 ? 8 : -8; })
						.attr("dy", ".31em")
						.attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
						.attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
						.text(function(d) {return d.name + " ("+d.party+")"; })
						.style("fill", function(d) { return color(d.party); });

				}
			}
		});
	};



	controller.$inject = ["$scope", "$attrs", "$element"];

	return {
		template: '<div class="legend"></div><div class="wheel"></div>',
		restrict: 'E',
		scope: {votes: '='},
		controller: controller
	};
});
