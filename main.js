document.addEventListener('WebComponentsReady', function() {

  var batteryDevice = document.querySelector('platinum-bluetooth-device');
  var button = document.querySelector('paper-button');

  button.addEventListener('click', function() {
    console.log('Requesting a bluetooth device advertising battery service...');

    batteryDevice.request().then(function(device) {
      console.log('A bluetooth device has been found!');
      console.log('Device Name: ' + device.name);

      // Connect to the device and read battery level.
      var batteryLevel = batteryDevice.querySelector('platinum-bluetooth-characteristic');
      return batteryLevel.read().then(function() {
        document.querySelector('paper-toast').show();
      });

    })
    .catch(function(error) {
      console.error('Argh! ', error);
    });
  });
});

var template = document.querySelector('template');
template.computeCharacteristic = function(batteryLevel) {
  var data = new DataView(batteryLevel);
  return ('Battery Level is ' + data.getUint8(0) + '%');
};
