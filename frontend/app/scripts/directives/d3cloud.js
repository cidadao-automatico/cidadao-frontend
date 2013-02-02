'use strict';

cidadoAutomaticoApp.directive('d3cloud', function() {

	var padding = 4;

	function collide(node) {
		var r = node.radius + 16,
			nx1 = node.x - r,
			nx2 = node.x + r,
			ny1 = node.y - r,
			ny2 = node.y + r;
		return function(quad, x1, y1, x2, y2) {
			if (quad.point && (quad.point !== node)) {
				var x = node.x - quad.point.x,
					y = node.y - quad.point.y,
					l = Math.sqrt(x * x + y * y),
					r = node.radius + quad.point.radius+padding;
				if (l < r) {
					l = (l - r) / l * .5;
					node.x -= x *= l;
					node.y -= y *= l;
					quad.point.x += x;
					quad.point.y += y;
				}
			}
			return x1 > nx2
				|| x2 < nx1
				|| y1 > ny2
				|| y2 < ny1;
		};
	}

	function shorten(tag) {
		var toRet = tag.tag;
		var idx= toRet.indexOf('(');
		if(idx > 0) toRet = toRet.substring(0,idx);
		toRet = toRet.replace("administracao", "adm.");
		toRet = toRet.replace("administração", "adm.");
		toRet = toRet.replace("publica", "pub.");
		toRet = toRet.replace("publico", "pub.");
		toRet = toRet.replace("regional", "reg.");
		toRet = toRet.replace("prestacao", "prest.");
		return toRet;
	}

	var controller = function($scope, $attrs, $element) {
		var remove = $scope.$watch('tags', function() {
			if($scope.tags != undefined &&  $scope.tags.length > 0) {
				remove();
				var w = 800,
					h = 800,
					max_tot = _.foldl($scope.tags,
								  function(memo, t) {return [memo[0]+parseInt(t.count), Math.max(t.count, memo[1])];},
								  [0,0]),
					total = max_tot[1],
					max = max_tot[0],
					nodes = _.filter(
						_.map($scope.tags, function(t) {
							t.radius=Math.min(w/10, 6*Math.log(Math.pow(t.count,2)));
							return t;
						}),
						function(t) {
							return t.radius > 5;
						});


				var force = d3.layout.force()
						.gravity(0.2)
						.charge(function(d, i) { return 0; })
						.nodes($scope.tags)
						.size([w, h]);

				force.start();

				var svg = d3.select(jQuery($element).find('.cloud')[0]).append("svg:svg")
						.attr("width", w)
						.attr("height", h);
				var labCont = d3.select(jQuery($element).find('.cloud')[0]);

				var node = svg.selectAll(".node")
					.data(nodes)
					.enter()
					.append("g").attr("class", "node");
				node.append("svg:circle")
					.attr("r", function(d) { return d.radius; })
					.style("fill", '#CCC');
				node.append("title")
					.text(function(d) { return d.tag; });

				var label = labCont.selectAll(".label-cloud")
						.data(_.filter(nodes, function(d) {return d.radius > 15;}))
						.enter()
						.append("div")
						.attr('class', 'label-cloud')
//						.style("overflow", "hidden")
						.style("width", function(t) {return 2*t.radius + "px";})
						.style("height", function(t) {return 2*t.radius + "px";})
						.style("position","absolute");

				label.append("span")
					.text(function(d) { return shorten(d); })
					.each(function(d) { d.dx = Math.max(2*d.radius, this.getBoundingClientRect().width);
										d.dy = this.getBoundingClientRect().height; })
					.remove();

				var as = label.append("a")
					.style("text-anchor", "middle")
					.style("font-size", function(d) { return Math.min(11,Math.max(8, 5*d.radius / d.dx)) + "px"; })
					.text(function(t) {return shorten(t);});


				force.on("tick", function(e) {
					var q = d3.geom.quadtree(nodes),
						i = 0,
						n = nodes.length,
						centerY = h/2;

					while (++i < n) {
						q.visit(collide(nodes[i]));
					}

					svg.selectAll(".node")
						.attr("transform", function(d) {return "translate("+d.x+","+d.y+")";});
					labCont.selectAll(".label-cloud")
						.style("top", function(d) {return (d.y-d.dy/2)+"px";})
						.style("left", function(d) {return (d.x-.5*d.dx/2)+"px";});

				});


			}
		});
	};

	controller.$inject = ["$scope", "$attrs", "$element"];

	return {
		template: '<div class="cloud" style="position: relative"></div>',
		restrict: 'E',
		scope: {tags: '='},
		controller: controller
	};
});
