const ctx = document.getElementById("myChart");
let myChart = null;
//------------------------------------------
function toColor(num) {
  num >>>= 0;
  var b = num & 0xff,
    g = (num & 0xff00) >>> 8,
    r = (num & 0xff0000) >>> 16,
    a = ((num & 0xff000000) >>> 24) / 255;

  return "rgba(" + [r, g, b, a].join(",") + ")";
}
//--------------------------------------
const drawTable = () => {
  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [],
      datasets: [
        {
          label: "",
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: [],
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

//----------------------
const updateData = (items) => {
  myChart.data.datasets[0].data = items.map((item) => item.value);
  myChart.data.labels = items.map((item) => item.label);
  myChart.data.datasets[0].backgroundColor = items.map((item) =>
    toColor(item.BackgroundColor)
  );
  myChart.data.datasets[0].borderColor = items.map((item) =>
    toColor(item.BorderColor)
  );
  myChart.data.datasets[0].borderWidth = items.map((item) => item.BorderWidth);
  myChart.update();
};
//------------------------------------

function setProperty(data) {
  switch (data.key) {
    case "ChartData":
      updateData(data.value);
      break;
    case "ChartTitle":
      myChart.data.datasets[0].label = data.value;
      myChart.update();
      break;
  }
}
////////////////////////////////////////////
WebCC.start(
  function (result) {
    if (result) {
      drawTable();

      setProperty({
        key: "ChartData",
        value: WebCC.Properties.ChartData,
      });
      setProperty({
        key: "ChartTitle",
        value: WebCC.Properties.ChartTitle,
      });

      // Set current values
      WebCC.onPropertyChanged.subscribe(setProperty);
    } else {
      console.log("connection failed");
    }
  },
  // contract (see also manifest.json)
  {
    // Methods
    methods: {},
    // Events
    events: [],
    // Properties
    properties: {
      ChartData: [],
      ChartTitle: "",
    },
  },
  // placeholder to include additional Unified dependencies (not used in this example)
  [],
  // connection timeout
  10000
);
