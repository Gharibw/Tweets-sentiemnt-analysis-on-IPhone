// Create the view model obect
var Dash = function(){
    this.rate = ko.observable(0);
    this.oil = ko.observable(50);
    this.temp = ko.observable(150);
    this.brake = ko.observable(50);
    this.tire = ko.observable(34);
    this.fuel = ko.observable(50);
    this.statusLetter = ko.observable('N');
    this.shouldShowNormal = ko.observable(true);
    this.shouldShowMaintenance = ko.observable(false);
    this.shouldShowEmergency = ko.observable(false);
    this.showStatus1 = ko.observable('All vehicle operations normal');
    this.showStatus2 = ko.observable('');
    this.showStatus3 = ko.observable('');
    this.showStatus4 = ko.observable('');
    this.addSubscriptions();
};

// Use jQuery to extend the methods of my view model object
$.extend(Dash.prototype, {
    addSubscriptions: function(){
        this.rate.subscribe(this.onRateChange, this);
        this.oil.subscribe(this.onOilChange, this);
        this.temp.subscribe(this.onTempChange, this);
        this.brake.subscribe(this.onBrakeChange, this);
        this.tire.subscribe(this.onTireChange, this);
        this.fuel.subscribe(this.onFuelChange, this);
    },
    onRateChange: function(newValue){
        this.statusLetter('N');
        if(newValue > 90) {
            this.statusLetter('M');
        }
        if (newValue > 110) {
            this.statusLetter('E');
        }
        this.updateStatusRate();
    },
    onOilChange: function(newValue){
        this.statusLetter('N');
        if(newValue < 25) {
            this.statusLetter('M');
        }
        if (newValue < 10) {
            this.statusLetter('E');
        }
        this.updateStatusOil();
    },
    onTempChange: function(newValue){
        this.statusLetter('N');
        if(newValue > 250) {
            this.statusLetter('M');
        }
        if (newValue > 350) {
            this.statusLetter('E');
        }
        this.updateStatusTemp();
    },
    onBrakeChange: function(newValue){
        this.statusLetter('N');
        if(newValue < 25) {
            this.statusLetter('M');
        }
        if (newValue < 10) {
            this.statusLetter('E');
        }
        this.updateStatusBrake();
    },
    onTireChange: function(newValue){
        this.statusLetter('N');
        if(newValue < 28) {
            this.statusLetter('M');
        }
        if (newValue < 23) {
            this.statusLetter('E');
        }
        this.updateStatusTire();
    },
    onFuelChange: function(newValue){
        this.statusLetter('N');
        if(newValue < 25) {
            this.statusLetter('M');
        }
        if (newValue < 10) {
            this.statusLetter('E');
        }
        this.updateStatusFuel();
    },
    updateStatusRate: function(){
        if(this.statusLetter() == 'E'){
            this.shouldShowNormal(false);
            this.shouldShowMaintenance(false);
            this.shouldShowEmergency(true);
            this.showStatus1('You have exceeded a very unsafe speed of over 110 mph.');
            this.showStatus2('If this is not corrected, the local police will be dispatched.');
            this.showStatus3('Please reduce your speed to below 90 mph to avoid this action.');
            this.showStatus4('Local authorities have been dispatched to this GPS location!');
        } else if (this.statusLetter() == 'M'){
            this.shouldShowNormal(false);
            this.shouldShowMaintenance(true);
            this.shouldShowEmergency(false);
            this.showStatus1('This vehicle has exceeded an unsafe speed of over 90 mph.');
            this.showStatus2('Please reduce your driving velocity!');
            this.showStatus3('');
            this.showStatus4('');
        } else {
            this.shouldShowNormal(true);
            this.shouldShowMaintenance (false);
            this.shouldShowEmergency(false);
            this.showStatus1('All vehicle operations normal');
            this.showStatus2('Outside temperature 79 degrees Fahrenheit.');
            this.showStatus3('Would you like to have your sunroof opened? (Say YES or NO)');
            this.showStatus4('Sun roof opened.');
        }
    },
    updateStatusOil: function(){
        if(this.statusLetter() == 'E'){
            this.shouldShowNormal(false);
            this.shouldShowMaintenance(false);
            this.shouldShowEmergency(true);
            this.showStatus1('This is an Emergency Situation! Your engine oil is critically low.');
            this.showStatus2('Contacting the nearest service station.');
            this.showStatus3('Service station has been located and appointment made.');
            this.showStatus4('Please drive to 1150 Elm St. ... Continue forward 3 miles.');
        } else if (this.statusLetter() == 'M'){
            this.shouldShowNormal(false);
            this.shouldShowMaintenance(true);
            this.shouldShowEmergency(false);
            this.showStatus1('Your vehicle needs engine oil maintenance soon.');
            this.showStatus2('Contacting your dealer / mechanic scheduline system.');
            this.showStatus3('An appointment has been tentatively scheduled for this Thursday at 11am.');
            this.showStatus4('Would you like to confirm? (Say YES or NO)');
        } else {
            this.shouldShowNormal(true);
            this.shouldShowMaintenance (false);
            this.shouldShowEmergency(false);
            this.showStatus1('All vehicle operations normal');
            this.showStatus2('Outside temperature 76 degrees Fahrenheit.');
            this.showStatus3('There is an accident on your usual route to work. Would you like to redirect? (Say YES or NO) ');
            this.showStatus4('Proceeding with caution usual route');
        }
    },
    updateStatusTemp: function(){
        if(this.statusLetter() == 'E'){
            this.shouldShowNormal(false);
            this.shouldShowMaintenance(false);
            this.shouldShowEmergency(true);
            this.showStatus1('The engine temperature is approaching melting levels!');
            this.showStatus2('Please slow down and pull the car over immediately.');
            this.showStatus3('Notifying AAA car service.');
            this.showStatus4('A tow vehicle has been dispatched to this GPS location.');
        } else if (this.statusLetter() == 'M'){
            this.shouldShowNormal(false);
            this.shouldShowMaintenance(true);
            this.shouldShowEmergency(false);
            this.showStatus1('Engine temperature has gone above normal levels. Your engine coolant level is low.');
            this.showStatus2('Contacting your dealer / mechanic scheduline system.');
            this.showStatus3('An appointment has been tentatively scheduled for next Friday at 12pm.');
            this.showStatus4('Would you like to confirm? (Say YES or NO)');
        } else {
            this.shouldShowNormal(true);
            this.shouldShowMaintenance (false);
            this.shouldShowEmergency(false);
            this.showStatus1('All vehicle operations normal');
            this.showStatus2('Outside temperature 89 degrees Fahrenheit.');
            this.showStatus3('Would you like your A/C turned on to optimal? (Say YES or NO)');
            this.showStatus4('Cooling down to 75 degrees Fahrenheit...');
        }
    },
    updateStatusBrake: function(){
        if(this.statusLetter() == 'E'){
            this.shouldShowNormal(false);
            this.shouldShowMaintenance(false);
            this.shouldShowEmergency(true);
            this.showStatus1('The braking system appears to be experiencing an ABS malfunction!');
            this.showStatus2('Please slow down and pull over immediately.');
            this.showStatus3('Notifying AAA car service.');
            this.showStatus4('A tow vehicle has been dispatched to this GPS location.');
        } else if (this.statusLetter() == 'M'){
            this.shouldShowNormal(false);
            this.shouldShowMaintenance(true);
            this.shouldShowEmergency(false);
            this.showStatus1('The front driver side brake pad has fallen below an acceptable level.');
            this.showStatus2('Contacting your dealer / mechanic scheduline system.');
            this.showStatus3('An appointment has been tentatively scheduled for next Tuesday at 2pm.');
            this.showStatus4('Would you like to confirm? (Say YES or NO)');
        } else {
            this.shouldShowNormal(true);
            this.shouldShowMaintenance (false);
            this.shouldShowEmergency(false);
            this.showStatus1('All vehicle operations normal');
            this.showStatus2('Outside temperature 81 degrees Fahrenheit.');
            this.showStatus3('Would you like to have your sunroof opened? (Say YES or NO)');
            this.showStatus4('Sun roof opened.');
        }
    },
    updateStatusTire: function(){
        if(this.statusLetter() == 'E'){
            this.shouldShowNormal(false);
            this.shouldShowMaintenance(false);
            this.shouldShowEmergency(true);
            this.showStatus1('The front passenger side tire is leaking air quickly!');
            this.showStatus2('Please slow down and pull over immediately.');
            this.showStatus3('Would you like to notify AAA car service? (Say YES or NO)');
            this.showStatus4('A tow vehicle has been dispatched to this GPS location.');
        } else if (this.statusLetter() == 'M'){
            this.shouldShowNormal(false);
            this.shouldShowMaintenance(true);
            this.shouldShowEmergency(false);
            this.showStatus1('The front left brake pad has fallen below an acceptable level.');
            this.showStatus2('Contacting your dealer / mechanic scheduline system.');
            this.showStatus3('An appointment has been tentatively scheduled for tomorrow at 2pm.');
            this.showStatus4('Would you like to confirm? (Say YES or NO)');
        } else {
            this.shouldShowNormal(true);
            this.shouldShowMaintenance (false);
            this.shouldShowEmergency(false);
            this.showStatus1('All vehicle operations normal');
            this.showStatus2('Outside temperature 35 degrees Fahrenheit.');
            this.showStatus3('Would you like to have your heater turned on to optimal? (Say YES or NO)');
            this.showStatus4('Heating up to 80 degrees Fahrenheit...');
        }
    },
    updateStatusFuel: function(){
        if(this.statusLetter() == 'E'){
            this.shouldShowNormal(false);
            this.shouldShowMaintenance(false);
            this.shouldShowEmergency(true);
            this.showStatus1('Your fuel level has fallen below an acceptable amount for this trip to Denver!');
            this.showStatus2('The next gas station is 35 miles, however, there is not enough fuel for this distance.');
            this.showStatus3('Locating the nearest gas station. Located.');
            this.showStatus4('Take the next exit and drive back 2 exits. Shell gass station is on the left.');
        } else if (this.statusLetter() == 'M'){
            this.shouldShowNormal(false);
            this.shouldShowMaintenance(true);
            this.shouldShowEmergency(false);
            this.showStatus1('Your fuel level is low for your trip to Denver.');
            this.showStatus2('Please proceed to the nearest gas station. Located.');
            this.showStatus3('Please drive to 1150 Elm St.');
            this.showStatus4('Continue forward 3 miles.');
        } else {
            this.shouldShowNormal(true);
            this.shouldShowMaintenance (false);
            this.shouldShowEmergency(false);
            this.showStatus1('All vehicle operations normal');
            this.showStatus2('Outside temperature 52 degrees Fahrenheit.');
            this.showStatus3('Local Denver temperature is 42 degrees Fahrenheit..');
            this.showStatus4('Have you made hotel reservations? (Say YES or NO)');
        }
    }
});



var dash = null;

$(document).ready(function(){

    dash = new Dash();

    $('#rate-slider').slider({
        min: 0.0,
        step: 0.1,
        value: dash.rate(),
        max: 160
    });

    $('#oil-slider').slider({
        min: 0,
        step: 1,
        value: dash.oil(),
        max: 100
    });

    $('#temp-slider').slider({
        min: 0,
        step: 1,
        value: dash.temp(),
        max: 400
    });

    $('#brake-slider').slider({
        min: 0,
        step: 1,
        value: dash.brake(),
        max: 100
    });

    $('#tire-slider').slider({
        min: 0,
        step: 1,
        value: dash.tire(),
        max: 36
    });

    $('#fuel-slider').slider({
        min: 0,
        step: 1,
        value: dash.fuel(),
        max: 100
    });

    var svg = d3.select("#speedometer")
            .append("svg:svg")
            .attr("width", 400)
            .attr("height", 400);


    var gauge = iopctrl.arcslider()
            .radius(120)
            .events(false)
            .indicator(iopctrl.defaultGaugeIndicator);
    gauge.axis().orient("in")
            .normalize(true)
            .ticks(12)
            .tickSubdivide(3)
            .tickSize(10, 8, 10)
            .tickPadding(5)
            .scale(d3.scale.linear()
                    .domain([0, 160])
                    .range([-3*Math.PI/4, 3*Math.PI/4]));

    var segDisplay = iopctrl.segdisplay()
            .width(80)
            .digitCount(6)
            .negative(false)
            .decimals(0);

    svg.append("g")
            .attr("class", "segdisplay")
            .attr("transform", "translate(130, 200)")
            .call(segDisplay);

    svg.append("g")
            .attr("class", "gauge")
            .call(gauge);

    segDisplay.value(56749);
    gauge.value(0);

    $('.slider').bind('slidechange', function(event){
        var $slider = $(event.currentTarget);
        var $input = $slider.siblings('input');
        $input.val($slider.slider('value'));
        gauge.value($slider.slider('value'));
        $input.change();
    });

    // Activate KnockoutJS
    ko.applyBindings(dash);
    $('input').change();

    /*for (myspeed = 1; myspeed < 111; myspeed++) {
        gauge.value(myspeed);
        setTimeout(function() {
            myspeed = myspeed * 1;
        }, (2*1000));
    }*/



});

