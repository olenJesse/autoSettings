// ==UserScript==
// @name         autoSettings
// @version      1.02
// @description  automatically select desired leagues
// @author       JeStEr
// @match        https://poedb.tw/us/League*
// ==/UserScript==
(async function() {
	'use strict';
	try {
		var _tryCount = 60, _smallPause = 500, _bigPause = 1000;
		var _isReady = false;
		for (let i = 1; i <= _tryCount; i++) {
			await sleep(_smallPause);
			if (document.readyState === "complete") {
				_isReady = true;
				break;
			}
		}
		if (_isReady) {
		await sleep(_bigPause);
		var theCharts = ['leaguePlayers', 'leaguePlayerRetention'];
		var showLeagues = ['Sanctum', 'Kalandra', 'Expedition', 'Ritual', 'Blight'];
		for (let theChart of theCharts) {
			var thisID = document.getElementById(theChart).getAttribute('_echarts_instance_');
			var thisChart = echarts.getInstanceById(thisID); //ext
			var thisData = Object.values(thisChart.getOption().legend[0].data);
			var thisSelected = {};
			for (let tempLeague of thisData) {
				thisSelected[tempLeague] = showLeagues.includes(tempLeague);
			}
			thisChart.setOption({
			  legend: {
					selected: thisSelected
				}
			});
		}
	}
	} catch(err) {
		alert(err);
	}
})();
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
