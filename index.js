var instance_skel = require('../../instance_skel');
var debug;
var log;

function instance(system, id, config) {
	var self = this;

	// super-constructor
	instance_skel.apply(this, arguments);

	self.actions(); // export actions

	self.addUpgradeScript(function () {
		if (self.config.host !== undefined) {
			self.config.old_host = self.config.host;
		}
	});

	return self;
}

instance.prototype.updateConfig = function(config) {
	var self = this;

	self.config = config;
};
instance.prototype.init = function() {
	var self = this;

	self.status(self.STATE_OK);

	debug = self.debug;
	log = self.log;
};

// Return config fields for web config
instance.prototype.config_fields = function () {
	var self = this;
	return [
		{
			type: 'textinput',
			id: 'host',
			label: 'Target IP',
			width: 8,
			regex: self.REGEX_IP
		},
		{
			type: 'textinput',
			id: 'port',
			label: 'Target Port',
			width: 4,
			default: 9009,
			regex: self.REGEX_PORT
		}
	]
};

// When module gets deleted
instance.prototype.destroy = function() {
	var self = this;
	debug('destroy');
};

instance.prototype.actions = function(system) {
	var self = this;
	self.system.emit('instance_actions', self.id, {
		'addMarker': {
			label: 'Add Marker',
			options: []
		},
		'accessAction': {
			label: 'Access Action',
			options: [
				{
					 type: 'textinput',
					 label: 'Action',
					 id: 'string',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'loopToggle': {
			label: 'Loop Toggle',
			options: []
		},
		'loopLocation': {
			label: 'Loop Location',
			options: [
				{
					 type: 'textinput',
					 label: 'Location',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'goToStart': {
			label: 'Go To Start',
			options: []
		},
		'goToEnd': {
			label: 'goToEnd',
			options: []
		},
		'Scrub': {
			label: 'Scrub',
			options: [
				{
					 type: 'textinput',
					 label: 'Scrub',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'jog': {
			label: 'Jog',
			options: [
				{
					 type: 'textinput',
					 label: 'Jog',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'jogMode': {
			label: 'Jog Mode',
			options: [
				{
					 type: 'textinput',
					 label: 'Mode',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'rewind': {
			label: 'Rewind',
			options: []
		},
		'fastForward': {
			label: 'Fast Forward',
			options: []
		},
		'transportStop': {
			label: 'Transport Stop',
			options: []
		},
		'transport_play': {
			label: 'transport_play',
			options: []
		},
		'transportFrame': {
			label: 'Transport Frame',
			options: []
		},
		'transportSpeed': {
			label: 'transportSpeed',
			options: []
		},
		'enableRecord': {
			label: 'Enable Record',
			options: []
		},
		'setTransportSpeed': {
			label: 'Set Transport Speed',
			options: [
				{
					 type: 'textinput',
					 label: 'Speed',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'locate': {
			label: 'locate',
			options: [
				{
					 type: 'textinput',
					 label: 'Location',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'saveState': {
			label: 'Save State',
			options: []
		},
		'prevMarker': {
			label: 'Previous Marker',
			options: []
		},
		'nextMarker': {
			label: 'Next Marker',
			options: []
		},
		'undo': {
			label: 'Undo',
			options: []
		},
		'redo': {
			label: 'redo',
			options: []
		},
		'togglePunchIn': {
			label: 'Toggle Punch In',
			options: []
		},
		'togglePunchOut': {
			label: 'Toggle Punch Out',
			options: []
		},
		'recEnableToggle': {
			label: 'Toggle Record Enable',
			options: []
		},
		'toggleAllRecEnable': {
			label: 'Toggle All Record Enables',
			options: []
		},
		'allTracksRecIn': {
			label: 'All Tracks Record In',
			options: []
		},
		'allTracksRecOut': {
			label: 'All Tracks Record Out',
			options: []
		},
		'cancelAllSolos': {
			label: 'Cancel All Solos',
			options: [
				{
					 type: 'textinput',
					 label: 'Solos',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'removeMarker': {
			label: 'Remove Marker',
			options: []
		},
		'jumpBars': {
			label: 'Jump Bars',
			options: [
				{
					 type: 'textinput',
					 label: 'bars',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'jumpSeconds': {
			label: 'Jump Seconds',
			options: [
				{
					 type: 'textinput',
					 label: 'Seconds',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'markIn': {
			label: 'Mark In',
			options: []
		},
		'markOut': {
			label: 'Mark Out',
			options: []
		},
		'toggleClick': {
			label: 'Toggle Click',
			options: []
		},
		'midiPanic': {
			label: 'MIDI Panic',
			options: []
		},
		'toggleRoll': {
			label: 'Toggle Roll',
			options: []
		},
		'stopForget': {
			label: 'Stop Forget',
			options: []
		},
		'setPunchRange': {
			label: 'Set Punch Range',
			options: [
				{
					 type: 'textinput',
					 label: 'Range',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'setLoopRange': {
			label: 'Set Loop Range',
			options: [
				{
					 type: 'textinput',
					 label: 'Range',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'setSessionRange': {
			label: 'Set Session Range',
			options: [
				{
					 type: 'textinput',
					 label: 'Range',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'toggleMonitorMute': {
			label: 'Toggle Monitor Mute',
			options: []
		},
		'toggleMonitorDim': {
			label: 'Toggle Monitor Dim',
			options: []
		},
		'toggleMonitorMono': {
			label: 'Toggle Monitor Mono',
			options: []
		},
		'quickSnapshotSwitch': {
			label: 'Quick Snapshot Switch',
			options: []
		},
		'quickSnapshotStay': {
			label: 'Quick Snap Stay',
			options: []
		},
		'fit1Track': {
			label: 'Fit One Track',
			options: []
		},
		'fit2Tracks': {
			label: 'Fit Two Tracks',
			options: []
		},
		'fit8Tracks': {
			label: 'Fit Eight Tracks',
			options: []
		},
		'fit16Tracks': {
			label: 'Fit 16 Tracks',
			options: []
		},
		'fit32Tracks': {
			label: 'Fit 32 Tracks',
			options: []
		},
		'fit4Tracks': {
			label: 'Fit Four Tracks',
			options: []
		},
		'fitAllTracks': {
			label: 'Fit All Tracks',
			options: []
		},
		'zoom100ms': {
			label: 'Zoom 100ms',
			options: []
		},
		'zoom1sec': {
			label: 'Zoom 1 Second',
			options: []
		},
		'zoom10sec': {
			label: 'Zoom 10 Seconds',
			options: []
		},
		'zoom1min': {
			label: 'Zoom 1 Min',
			options: []
		},
		'zoom5min': {
			label: 'Zoom 5 Min',
			options: []
		},
		'zoom10min': {
			label: 'Zoom 10 Min',
			options: []
		},
		'zoomToSession': {
			label: 'Zoom To Session',
			options: []
		},
		'temporalZoomIn': {
			label: 'Temporal Zoom In',
			options: []
		},
		'temporalZoomOut': {
			label: 'Temporal Zoom Out',
			options: []
		},
		'scrollUp1Track': {
			label: 'Scroll Up One Track',
			options: []
		},
		'scrollDown1Track': {
			label: 'Scroll Doen One Track',
			options: []
		},
		'scrollUp1Page': {
			label: 'Scroll Up One Page',
			options: []
		},
		'scrollDown1Page': {
			label: 'ScrollDown1Page',
			options: []
		},
		'bankUp': {
			label: 'Bank Up',
			options: []
		},
		'bankDown': {
			label: 'Bank Down',
			options: []
		},
		'useGroup': {
			label: 'Use Group',
			options: [
				{
					 type: 'textinput',
					 label: 'group',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'masterGain': {
			label: 'Master Gain',
			options: [
				{
					 type: 'textinput',
					 label: 'Gain',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'masterFader': {
			label: 'Master Fader',
			options: [
				{
					 type: 'textinput',
					 label: 'Level',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'masterDBDelta': {
			label: 'Master DB Delta',
			options: [
				{
					 type: 'textinput',
					 label: 'Delta',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'masterMute': {
			label: 'Master Mute',
			options: [
				{
					 type: 'textinput',
					 label: 'Delta',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'masterPan': {
			label: 'Master Pan',
			options: [
				{
					 type: 'textinput',
					 label: 'Pan',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'masterSelect': {
			label: 'Master Select',
			options: [
				{
					 type: 'textinput',
					 label: 'Select',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'monitorGain': {
			label: 'Monitor Gain',
			options: [
				{
					 type: 'textinput',
					 label: 'Gain',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'monitorFader': {
			label: 'Monitor Fader',
			options: [
				{
					 type: 'textinput',
					 label: 'Level',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'monitorDBDelta': {
			label: 'Monitor DB Delta',
			options: [
				{
					 type: 'textinput',
					 label: 'Delta',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'Monitor Mute': {
			label: 'Monitor Mute',
			options: [
				{
					 type: 'textinput',
					 label: 'Mute',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'monitorDim': {
			label: 'Monitor Dim',
			options: [
				{
					 type: 'textinput',
					 label: 'Dim',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'monitorMono': {
			label: 'Monitor Mono',
			options: [
				{
					 type: 'textinput',
					 label: 'Mono',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'selectedRecordSafe': {
			label: 'Selected Record Safe',
			options: [
				{
					 type: 'textinput',
					 label: 'Safe',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'selectedMute': {
			label: 'Selected Mute',
			options: [
				{
					 type: 'textinput',
					 label: 'Mute',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'selectedSolo': {
			label: 'Selected Solo',
			options: [
				{
					 type: 'textinput',
					 label: 'Solo',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'selectedMonitorInput': {
			label: 'Selected Monitor Input',
			options: [
				{
					 type: 'textinput',
					 label: 'Monitor Input',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'selectedMonitorDisk': {
			label: 'Selected Monitor Disk',
			options: [
				{
					 type: 'textinput',
					 label: 'Monitor Disk',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'selectedPolarity': {
			label: 'Selected Polarity',
			options: [
				{
					 type: 'textinput',
					 label: 'Polarity',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'selectedGain': {
			label: 'Selected Gain',
			options: [
				{
					 type: 'textinput',
					 label: 'Gain',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'selectedFader': {
			label: 'Selected Fader',
			options: [
				{
					 type: 'textinput',
					 label: 'Level',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'selectedDBDelta': {
			label: 'Selected DB Delta',
			options: [
				{
					 type: 'textinput',
					 label: 'DB Delta',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'selectedTrimDB': {
			label: 'Selected Trim DB',
			options: [
				{
					 type: 'textinput',
					 label: 'Level',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'selectedPan': {
			label: 'Selected Pan',
			options: [
				{
					 type: 'textinput',
					 label: 'Pan',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'selectedSterioWidth': {
			label: 'Selected Sterio Width',
			options: [
				{
					 type: 'textinput',
					 label: 'Width',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'selectedMasterSendEnable': {
			label: 'Selected Master Send Enable',
			options: [
				{
					 type: 'textinput',
					 label: 'Enable',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'selectedSendPage': {
			label: 'Selected Send Page',
			options: [
				{
					 type: 'textinput',
					 label: 'Page',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'selectedPlugPage': {
			label: 'Selected Plug Page',
			options: [
				{
					 type: 'textinput',
					 label: 'Page',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'selectedCompEnable': {
			label: 'Selected Compressor Enable',
			options: [
				{
					 type: 'textinput',
					 label: 'Enable',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'selectedCompThrshhold': {
			label: 'Selected Compressor Threshold',
			options: [
				{
					 type: 'textinput',
					 label: 'Threshold',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'selectedCompSpeed': {
			label: 'Selected Compressor Speed',
			options: [
				{
					 type: 'textinput',
					 label: 'Speed',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'selectedCompMode': {
			label: 'Selected Compressor Mode',
			options: [
				{
					 type: 'textinput',
					 label: 'Mode',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'selectedCompMakeup': {
			label: 'Selected Compressor Makeup',
			options: [
				{
					 type: 'textinput',
					 label: 'Makeup',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'selectedEQEnable': {
			label: 'Selected EQ Enable',
			options: [
				{
					 type: 'textinput',
					 label: 'Level',
					 id: 'float',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
		'': {
			label: '',
			options: []
		},
		'': {
			label: '',
			options: [
				{
					 type: 'textinput',
					 label: '',
					 id: '',
					 default: 1,
					 regex: self.REGEX_SIGNED_FLOAT
				}
			]
		},
	});
}

instance.prototype.action = function(action) {
	var self = this;

	var args = null;

	debug('action: ', action);

	switch(action.action) {
		case 'addMarker':
    		oscPath = '';
    		args = [];
    		break;

		case 'accessAction':
    		oscPath = '';
    		args = [];
    		break;

		case 'loopToggle':
    		oscPath = '';
    		args = [];
    		break;

		case 'loopLocation':
    		oscPath = '';
    		args = [];
    		break;

		case 'goToStart':
    		oscPath = '';
    		args = [];
    		break;

		case 'goToEnd':
    		oscPath = '';
    		args = [];
    		break;

		case 'Scrub':
    		oscPath = '';
    		args = [];
    		break;

		case 'jog':
    		oscPath = '';
    		args = [];
    		break;

		case 'jogMode':
    		oscPath = '';
    		args = [];
    		break;

		case 'rewind':
    		oscPath = '';
    		args = [];
    		break;

		case 'fastForward':
    		oscPath = '';
    		args = [];
    		break;

		case 'transportStop':
    		oscPath = '';
    		args = [];
    		break;

		case 'transport_play':
    		oscPath = '';
    		args = [];
    		break;

		case 'transportFrame':
    		oscPath = '';
    		args = [];
    		break;

		case 'transportSpeed':
    		oscPath = '';
    		args = [];
    		break;

		case 'enableRecord':
    		oscPath = '';
    		args = [];
    		break;

		case 'setTransportSpeed':
    		oscPath = '';
    		args = [];
    		break;

		case 'locate':
    		oscPath = '';
    		args = [];
    		break;

		case 'saveState':
    		oscPath = '';
    		args = [];
    		break;

		case 'prevMarker':
    		oscPath = '';
    		args = [];
    		break;

		case 'nextMarker':
    		oscPath = '';
    		args = [];
    		break;

		case 'undo':
    		oscPath = '';
    		args = [];
    		break;

		case 'redo':
    		oscPath = '';
    		args = [];
    		break;

		case 'togglePunchIn':
    		oscPath = '';
    		args = [];
    		break;

		case 'togglePunchOut':
    		oscPath = '';
    		args = [];
    		break;

		case 'recEnableToggle':
    		oscPath = '';
    		args = [];
    		break;

		case 'toggleAllRecEnable':
    		oscPath = '';
    		args = [];
    		break;

		case 'allTracksRecIn':
    		oscPath = '';
    		args = [];
    		break;

		case 'allTracksRecOut':
    		oscPath = '';
    		args = [];
    		break;

		case 'cancelAllSolos':
    		oscPath = '';
    		args = [];
    		break;

		case 'removeMarker':
    		oscPath = '';
    		args = [];
    		break;

		case 'jumpBars':
    		oscPath = '';
    		args = [];
    		break;

		case 'jumpSeconds':
    		oscPath = '';
    		args = [];
    		break;

		case 'markIn':
    		oscPath = '';
    		args = [];
    		break;

		case 'markOut':
    		oscPath = '';
    		args = [];
    		break;

		case 'toggleClick':
    		oscPath = '';
    		args = [];
    		break;

		case 'midiPanic':
    		oscPath = '';
    		args = [];
    		break;

		case 'toggleRoll':
    		oscPath = '';
    		args = [];
    		break;

		case 'stopForget':
    		oscPath = '';
    		args = [];
    		break;

		case 'setPunchRange':
    		oscPath = '';
    		args = [];
    		break;

		case 'setLoopRange':
    		oscPath = '';
    		args = [];
    		break;

		case 'setSessionRange':
    		oscPath = '';
    		args = [];
    		break;

		case 'toggleMonitorMute':
    		oscPath = '';
    		args = [];
    		break;

		case 'toggleMonitorDim':
    		oscPath = '';
    		args = [];
    		break;

		case 'toggleMonitorMono':
    		oscPath = '';
    		args = [];
    		break;

		case 'quickSnapshotSwitch':
    		oscPath = '';
    		args = [];
    		break;

		case 'quickSnapshotStay':
    		oscPath = '';
    		args = [];
    		break;

		case 'fit1Track':
    		oscPath = '';
    		args = [];
    		break;

		case 'fit2Tracks':
    		oscPath = '';
    		args = [];
    		break;

		case 'fit8Tracks':
    		oscPath = '';
    		args = [];
    		break;

		case 'fit16Tracks':
    		oscPath = '';
    		args = [];
    		break;

		case 'fit32Tracks':
    		oscPath = '';
    		args = [];
    		break;

		case 'fit4Tracks':
    		oscPath = '';
    		args = [];
    		break;

		case 'fitAllTracks':
    		oscPath = '';
    		args = [];
    		break;

		case 'zoom100ms':
    		oscPath = '';
    		args = [];
    		break;

		case 'zoom1sec':
    		oscPath = '';
    		args = [];
    		break;

		case 'zoom10sec':
    		oscPath = '';
    		args = [];
    		break;

		case 'zoom1min':
    		oscPath = '';
    		args = [];
    		break;

		case 'zoom5min':
    		oscPath = '';
    		args = [];
    		break;

		case 'zoom10min':
    		oscPath = '';
    		args = [];
    		break;

		case 'zoomToSession':
    		oscPath = '';
    		args = [];
    		break;

		case 'temporalZoomIn':
    		oscPath = '';
    		args = [];
    		break;

		case 'temporalZoomOut':
    		oscPath = '';
    		args = [];
    		break;

		case 'scrollUp1Track':
    		oscPath = '';
    		args = [];
    		break;

		case 'scrollDown1Track':
    		oscPath = '';
    		args = [];
    		break;

		case 'scrollUp1Page':
    		oscPath = '';
    		args = [];
    		break;

		case 'scrollDown1Page':
    		oscPath = '';
    		args = [];
    		break;

		case 'bankUp':
    		oscPath = '';
    		args = [];
    		break;

		case 'bankDown':
    		oscPath = '';
    		args = [];
    		break;

		case 'useGroup':
    		oscPath = '';
    		args = [];
    		break;

		case 'masterGain':
    		oscPath = '';
    		args = [];
    		break;

		case 'masterFader':
    		oscPath = '';
    		args = [];
    		break;

		case 'masterDBDelta':
    		oscPath = '';
    		args = [];
    		break;

		case 'masterMute':
    		oscPath = '';
    		args = [];
    		break;

		case 'masterPan':
    		oscPath = '';
    		args = [];
    		break;

		case 'masterSelect':
    		oscPath = '';
    		args = [];
    		break;

		case 'monitorGain':
    		oscPath = '';
    		args = [];
    		break;

		case 'monitorFader':
    		oscPath = '';
    		args = [];
    		break;

		case 'monitorDBDelta':
    		oscPath = '';
    		args = [];
    		break;

		case 'Monitor':
    		oscPath = '';
    		args = [];
    		break;
		case 'Mute':
    		oscPath = '';
    		args = [];
    		break;

		case 'monitorDim':
    		oscPath = '';
    		args = [];
    		break;

		case 'monitorMono':
    		oscPath = '';
    		args = [];
    		break;

		case 'selectedRecordSafe':
    		oscPath = '';
    		args = [];
    		break;

		case 'selectedMute':
    		oscPath = '';
    		args = [];
    		break;

		case 'selectedSolo':
    		oscPath = '';
    		args = [];
    		break;

		case 'selectedMonitorInput':
    		oscPath = '';
    		args = [];
    		break;

		case 'selectedMonitorDisk':
    		oscPath = '';
    		args = [];
    		break;

		case 'selectedPolarity':
    		oscPath = '';
    		args = [];
    		break;

		case 'selectedGain':
    		oscPath = '';
    		args = [];
    		break;

		case 'selectedFader':
    		oscPath = '';
    		args = [];
    		break;

		case 'selectedDBDelta':
    		oscPath = '';
    		args = [];
    		break;

		case 'selectedTrimDB':
    		oscPath = '';
    		args = [];
    		break;

		case 'selectedPan':
    		oscPath = '';
    		args = [];
    		break;

		case 'selectedSterioWidth':
    		oscPath = '';
    		args = [];
    		break;

		case 'selectedMasterSendEnable':
    		oscPath = '';
    		args = [];
    		break;

		case 'selectedSendPage':
    		oscPath = '';
    		args = [];
    		break;

		case 'selectedPlugPage':
    		oscPath = '';
    		args = [];
    		break;

		case 'selectedCompEnable':
    		oscPath = '';
    		args = [];
    		break;

		case 'selectedCompThrshhold':
    		oscPath = '';
    		args = [];
    		break;

		case 'selectedCompSpeed':
    		oscPath = '';
    		args = [];
    		break;

		case 'selectedCompMode':
    		oscPath = '';
    		args = [];
    		break;

		case 'selectedCompMakeup':
    		oscPath = '';
    		args = [];
    		break;

		case 'selectedEQEnable':
    		oscPath = '';
    		args = [];
    		break;

		default:
			break;
	}

	if (args !== null) {
		debug('Sending OSC',self.config.host, self.config.port, oscPath);
		console.log('sending osc');
		console.log(args);
		self.system.emit('osc_send', self.config.host, self.config.port, oscPath, args);
	}


};

instance_skel.extendedBy(instance);
exports = module.exports = instance;
