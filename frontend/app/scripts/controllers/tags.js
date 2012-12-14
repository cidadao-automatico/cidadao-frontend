'use strict';

cidadoAutomaticoApp.controller('TagsCtrl', ["$scope", "cidadolei",
											function($scope, cidadolei) {
												$scope.tags = cidadolei.getTags();
											}
										   ]);
