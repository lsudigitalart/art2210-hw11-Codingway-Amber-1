let minlat = 30.32379644486961
let maxlat = 30.559260561666104
let minlon = -91.22161341694176
let maxlon = -91.00110703360933
let table;
let churchData = [];
let wolf
let blk

function preload() {
  table = loadTable('churches.csv', 'csv', 'header');
  wolf = loadImage("go-to-church.jpg");
  blk = loadImage("church-bg.jpg")
}

function setup() {
  createCanvas(1080, 652);
  image(blk, 0, 0, 1080, 652)
  background(wolf, 90);
  noStroke();
  // Convert the CSV into an array of objects with lat/long
  for (let i = 0; i < table.getRowCount(); i++) {
    let churchName = table.getString(i, 'church_name');
    let geom = table.getString(i, 'the_geom');
    let latLng = parseGeom(geom);

    if (latLng) {
      // Create an object for each church
      let church = {
        name: churchName,
        latitude: latLng.latitude,
        longitude: latLng.longitude,
      };

      // Add the object to the array
      churchData.push(church);
    }
  }

  // Log the resulting object array to the console
  console.log(churchData);

  for (let i = 0; i < churchData.length; i++) {
    if(churchData[i].name.includes("BAPTIST")) {
    let x = map(churchData[i].longitude, minlon, maxlon, 0, width);
    let y = map(churchData[i].latitude, minlat, maxlat, 0, height);
    fill(0, 255, 0, 100);
    ellipse(x, y, 10, 10);
    }
    if(churchData[i].name.includes("METHODIST")) {
      let x = map(churchData[i].longitude, minlon, maxlon, 0, width);
      let y = map(churchData[i].latitude, minlat, maxlat, 0, height);
      fill(255, 0, 0, 100);
      ellipse(x, y, 10, 10);
      }
      if(churchData[i].name.includes("CENTER")) {
        let x = map(churchData[i].longitude, minlon, maxlon, 0, width);
        let y = map(churchData[i].latitude, minlat, maxlat, 0, height);
        fill(0, 0, 255, 100);
        ellipse(x, y, 10, 10);
        }
  }
}

// Function to parse the 'geom' column
function parseGeom(geom) {
  if (!geom.startsWith("POINT")) {
    console.error("Invalid geom format:", geom);
    return null;
  }

  // Extract latitude and longitude using regex
  let match = geom.match(/POINT \((-?\d+\.\d+) (-?\d+\.\d+)\)/);
  if (!match) return null;

  return {
    longitude: parseFloat(match[1]),
    latitude: parseFloat(match[2]),
  };
}
