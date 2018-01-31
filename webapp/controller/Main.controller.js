sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/vk/ContentResource",
	"sap/ui/model/json/JSONModel"
], function(Controller, ContentResource, JSONModel) {
	"use strict";

	var loadModelIntoViewer = function(viewer, remoteUrl, sourceType, localFile) {
		//what is currently loaded in the view is destroyed
		viewer.destroyContentResources();

		var source = remoteUrl || localFile;

		if (source) {
			//content of viewer is replaced with new data
			var contentResource = new ContentResource({
				source: source,
				sourceType: sourceType,
				sourceId: "abc"
			});

			//content: chosen path. content added to the view
			viewer.addContentResource(contentResource);
		}
	};

	var count = 1;

	return Controller.extend("DPROP.controller.Main", {

		loadFromURL: function() {
			var view = this.getView();
			//var vdsURL = "http://localhost:58810/VisaulAsset/vdsfiles/transmission.vds";
			var vdsURL = "/webapp/assets/transmission.vds";
			var viewer = view.byId("viewer");
			if (vdsURL) {
				loadModelIntoViewer(viewer, vdsURL, "vds");
			} else {
				// handleEmptyUrl(view);
				console.log("Blank");

			}

		},

		onAfterRendering: function() {
			this.loadMap();

		},

		loadMap: function() {
			var mapOptions = {
				center: new google.maps.LatLng(-33.868512, 151.231793),
				zoom: 15,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				disableDefaultUI: true,
				featureType: "poi.business",
				elementType: "labels",
				stylers: [{
					visibility: "off"
				}]
			};
			var map = new google.maps.Map(this.getView().byId("map_canvas").getDomRef(),
				mapOptions);

			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(-33.861275, 151.229107),
				icon: 'images/icon.png',
				map: map
			});

			var marker2 = new google.maps.Marker({
				position: new google.maps.LatLng(-33.862004, 151.242035),
				icon: 'images/icon.png',
				map: map
			});

			var marker3 = new google.maps.Marker({
				position: new google.maps.LatLng(-33.869089, 151.231890),
				icon: 'images/icon.png',
				map: map
			});
		},

		onInit: function() {
			this.loadFromURL();

			var modelChart = this.getView().byId("modelChart");

			var labels = ["Jan '17", "Feb '17", "Mar '17", "Apr '17", "May '17", "Jun '17", "Jul '17", "Aug '17", "Sep '17", "Oct '17",
				"Nov '17", "Dec '17"
			];

			var labelsBlank = ["", "", "", "", "", "", "", "", "", "", "", ""];

			var chartColors = {
				red: 'rgb(255, 0, 0)',
				orange: 'rgb(255, 159, 64)',
				yellow: 'rgb(255, 205, 86)',
				green: 'rgb(75, 192, 192)',
				blue: 'rgb(54, 162, 235)',
				purple: 'rgb(153, 102, 255)',
				grey: 'rgb(231,233,237)'
			};

			var chartData = {
				"data": {
					labels: labelsBlank,
					datasets: [{
						label: "Baseline",
						backgroundColor: chartColors.grey,
						borderColor: chartColors.grey,
						pointRadius: 4,
						data: [
							84,
							68,
							53,
							59,
							27,
							25,
							37,
							42,
							48,
							56,
							82,
							78
						],
						fill: false
					}, {
						label: "Actual",
						fill: false,
						backgroundColor: chartColors.purple,
						borderColor: chartColors.purple,
						pointRadius: 4,
						data: [
							78,
							57,
							30,
							55,
							15,
							25,
							80,
							60,
							50,
							40,
							80,
							70
						]
					}]
				}

			};

			this.getOwnerComponent().setModel(new JSONModel(chartData), "componentModel");

			var oModel = new JSONModel();
			oModel.setData({
				startDate: new Date("2018", "0", "1", "0", "0"),
				people: [{
					pic: "sap-icon://image-viewer",
					name: "Fleet Base West",
					role: "WA",
					appointments: [{
						start: new Date("2018", "0", "1", "0", "0"),
						end: new Date("2018", "4", "30", "23", "59"),
						title: "Major Maintenance",
						info: "HMAS Perth",
						type: "Type02",
						pic: "sap-icon://wrench",
						tentative: false
					}, {
						start: new Date("2018", "1", "1", "0", "0"),
						end: new Date("2018", "2", "30", "23", "59"),
						title: "Routine Maintenance",
						info: "HMAS Sirius",
						type: "Type01",
						pic: "sap-icon://repost",
						tentative: false
					}, {
						start: new Date("2018", "5", "1", "0", "00"),
						end: new Date("2018", "7", "30", "23", "59"),
						title: "Joint Patrol",
						info: "HMAS Toowoomba",
						type: "Type05",
						pic: "sap-icon://decision",
						tentative: false
					}, {
						start: new Date("2018", "4", "1", "0", "0"),
						end: new Date("2018", "4", "30", "23", "59"),
						title: "Routine Maintenance",
						info: "HMAS Waller",
						type: "Type01",
						pic: "sap-icon://repost",
						tentative: false
					}, {
						start: new Date("2018", "4", "1", "0", "0"),
						end: new Date("2018", "6", "30", "23", "59"),
						title: "Mission A",
						type: "Type07",
						pic: "sap-icon://activities",
						tentative: true
					}, {
						start: new Date("2018", "6", "1", "0", "0"),
						end: new Date("2018", "10", "30", "23", "59"),
						title: "Mission B",
						type: "Type07",
						pic: "sap-icon://activities",
						tentative: true
					}, {
						start: new Date("2018", "8", "1", "0", "0"),
						end: new Date("2018", "8", "30", "23", "59"),
						title: "Inspection",
						icon: "HMAS Artunta",
						type: "Type04",
						pic: "sap-icon://person-placeholder",
						tentative: false
					}, {
						start: new Date("2018", "8", "1", "0", "0"),
						end: new Date("2018", "9", "30", "23", "59"),
						title: "Naval Exercise",
						info: "HMAS Ballarat",
						type: "Type05",
						pic: "sap-icon://workflow-tasks",
						tentative: false
					}]
				}, {
					pic: "sap-icon://image-viewer",
					name: "Fleet Base East",
					role: "NSW",
					appointments: [{
						start: new Date("2018", "2", "1", "0", "0"),
						end: new Date("2018", "3", "30", "23", "59"),
						title: "Joint Patrol",
						info: "HMAS Parramatta",
						type: "Type05",
						pic: "sap-icon://decision"
					}, {
						start: new Date("2018", "5", "1", "0", "0"),
						end: new Date("2018", "8", "30", "23", "59"),
						title: "Major Maintenance",
						info: "HMAS Melbourne",
						type: "Type02",
						pic: "sap-icon://wrench"
					}, {
						start: new Date("2018", "0", "1", "0", "0"),
						end: new Date("2018", "3", "30", "23", "59"),
						title: "Major Maintenance",
						info: "HMAS Canberra",
						type: "Type02",
						pic: "sap-icon://wrench"
					}, {
						start: new Date("2018", "9", "1", "0", "0"),
						end: new Date("2018", "11", "30", "23", "59"),
						title: "Major Maintenance",
						info: "HMAS Adelaide",
						type: "Type02",
						pic: "sap-icon://wrench"
					}, {
						start: new Date("2018", "3", "1", "0", "0"),
						end: new Date("2018", "4", "30", "23", "59"),
						title: "Routine Maintenance",
						info: "HMAS Success",
						type: "Type01",
						pic: "sap-icon://repost",
						tentative: true
					}, {
						start: new Date("2018", "6", "1", "0", "0"),
						end: new Date("2018", "7", "30", "23", "59"),
						title: "Routine Maintenance",
						info: "HMAS Yarra",
						type: "Type01",
						pic: "sap-icon://repost",
						tentative: false
					}, {
						start: new Date("2018", "1", "1", "0", "0"),
						end: new Date("2018", "4", "30", "23", "59"),
						title: "Mission C",
						type: "Type07",
						pic: "sap-icon://activities",
						tentative: false
					}, {
						start: new Date("2018", "7", "1", "0", "0"),
						end: new Date("2018", "11", "30", "23", "59"),
						title: "Mission D",
						type: "Type07",
						pic: "sap-icon://activities",
						tentative: true
					}]
				}],
				legendItems: [{
					text: "Public holiday",
					type: "Type07"
				}, {
					text: "Team building",
					type: "Type08"
				}],
				legendAppointmentItems: [{
					text: "Reminder",
					type: "Type06"
				}, {
					text: "Client meeting",
					type: "Type02"
				}, {
					text: "Team meeting",
					type: "Type01"
				}, {
					text: "Planning",
					type: "Type04"
				}, {
					text: "Out of office",
					type: "Type03"
				}, {
					text: "Customer Initiative",
					type: "Type07"
				}]
			});
			this.getView().setModel(oModel);

			var oStateModel = new JSONModel();
			oStateModel.setData({
				legendShown: false
			});
			this.getView().setModel(oStateModel, "stateModel");

			var socket = io('http://35.184.43.189:3000/');
			socket.on('connect', function() {
				//socket.emit('customer', "testing dual emit");
				console.log(socket.id);
				console.log('SUCCESS');
			});

			var that = this;

			socket.on('twin', function(msg) {
				//finalString = finalString + "\n" + "Agent: " + msg + "\n";

				console.log("MESSSGAE" + msg);
				//twinText.setText(msg);

				that.changeView(msg);
			});

		},

		changeView: function(msg) {
			var warningPanel = this.getView().byId("warning_panel");
			var missionPanel = this.getView().byId("mission_panel");
			var calendarPanel = this.getView().byId("calendar_panel");
			var shipPanel = this.getView().byId("ship_panel");
			var detailPanel = this.getView().byId("detail_panel");
			var optionsPanel = this.getView().byId("options_panel");
			var modelPanel = this.getView().byId("model_panel");
			var confirmPanel - this.getView().byId("confrim_panel");

			var twinText = this.getView().byId("twinText");

			count = msg.toString();

			if (count === '0') {
				//Show warning panel
				twinText.setText("A new task group is required for Mission Alpha.");
				warningPanel.setVisible(false);
				missionPanel.setVisible(false);
				calendarPanel.setVisible(true);
				shipPanel.setVisible(false);
				detailPanel.setVisible(false);
				optionsPanel.setVisible(false);
				modelPanel.setVisible(false);
				this.loadMap();

				//confirmPanel.setVisible(false);
			} else if (count === '1') {
				//Show mission panel
				twinText.setText("Sure. Will this be a Task Group Escort?");

				warningPanel.setVisible(false);
				missionPanel.setVisible(true);
				calendarPanel.setVisible(false);
				shipPanel.setVisible(false);
				detailPanel.setVisible(false);
				optionsPanel.setVisible(false);
				modelPanel.setVisible(false);
				//confirmPanel.setVisible(false);
				// } else if (count === 3) {
				// 	//Show calendar panel

				// 	warningPanel.setVisible(false);
				// 	missionPanel.setVisible(false);
				// 	calendarPanel.setVisible(true);
				// 	shipPanel.setVisible(false);
				// 	detailPanel.setVisible(false);
				// 	optionsPanel.setVisible(false);
				// 	modelPanel.setVisible(false);
				// 	//confirmPanel.setVisible(false);
			} else if (count === '2') {
				//Show ship panel

				twinText.setText("The mission is now scheduled, but some ships seem to have issues.");

				warningPanel.setVisible(false);
				missionPanel.setVisible(false);
				calendarPanel.setVisible(false);
				shipPanel.setVisible(true);
				detailPanel.setVisible(false);
				optionsPanel.setVisible(false);
				modelPanel.setVisible(false);
				//confirmPanel.setVisible(false);
			} else if (count === '3') {
				//Show detail panel

				twinText.setText("HMAS Hobart seems to have reliability issues and is therefore not fit for purpose.");
				warningPanel.setVisible(false);
				missionPanel.setVisible(false);
				calendarPanel.setVisible(false);
				shipPanel.setVisible(false);
				detailPanel.setVisible(true);
				optionsPanel.setVisible(false);
				modelPanel.setVisible(false);
				//confirmPanel.setVisible(false);
			} else if (count === '4') {
				//Show model panel
				twinText.setText("It seems to be undergoing repairs from a recent propeller failure.");
				warningPanel.setVisible(false);
				missionPanel.setVisible(false);
				calendarPanel.setVisible(false);
				shipPanel.setVisible(false);
				detailPanel.setVisible(false);
				optionsPanel.setVisible(false);
				modelPanel.setVisible(true);
				//confirmPanel.setVisible(false);

				var viewer = this.getView().byId("viewer");
				viewer._stepNavigation.playStep('i0000000500000004', false, false);

			} else if (count === '5') {
				//Show options panel
				twinText.setText("You can continue with current repairs, restrict operations, or replace the part with a new one.");
				warningPanel.setVisible(false);
				missionPanel.setVisible(false);
				calendarPanel.setVisible(false);
				shipPanel.setVisible(false);
				detailPanel.setVisible(false);
				optionsPanel.setVisible(true);
				modelPanel.setVisible(false);
				//confirmPanel.setVisible(false);

				count = 0;

			} else if (count === '6') {
				//Show confirm panel
				twinText.setText("I will immediately execute the plan and alert the relevant operators. Thank you.");
				warningPanel.setVisible(false);
				missionPanel.setVisible(false);
				calendarPanel.setVisible(false);
				shipPanel.setVisible(false);
				detailPanel.setVisible(false);
				optionsPanel.setVisible(false);
				modelPanel.setVisible(false);
				confirmPanel.setVisible(true);

			}
		}

	});
});