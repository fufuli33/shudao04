      require([
	  "esri/config",
	  "esri/Map", 
	  "esri/views/MapView",
	  "esri/layers/FeatureLayer",
	  "esri/smartMapping/renderers/size",
	   "esri/smartMapping/renderers/univariateColorSize",
	   "esri/widgets/Legend",
	   ], function ($esriConfig,$Map, $MapView,$FeatureLayer,$sizeRendererCreator,$univariateColorSize,$Legend) {
        $esriConfig.apiKey = "AAPK449340f85b664e6b802d2d0e65eb4849vlSII8YqKpEj5Fn0hCy2qr4QyOAZRZSB6XWDc2-X8pFlNoRYoQoetUvFs1Y_JVKL";	
//**********************************************初始底图*********************************************

//*****************************************开始就有的图层**********************************************************
	
		
	const less35 = {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "#fffcd4",
          style: "solid",
          outline: {
            width: 0.2,
            color: [255, 255, 255, 0.5]
          }
        };

        const less50 = {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "#b1cdc2",
          style: "solid",
          outline: {
            width: 0.2,
            color: [255, 255, 255, 0.5]
          }
        };

        const more50 = {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "#38627a",
          style: "solid",
          outline: {
            width: 0.2,
            color: [255, 255, 255, 0.5]
          }
        };

        const more75 = {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "#0d2644",
          style: "solid",
          outline: {
            width: 0.2,
            color: [255, 255, 255, 0.5]
          }
        };
	
	const renderer = {
	          type: "class-breaks", // autocasts as new ClassBreaksRenderer()
	          field: "popn",
	          normalizationFielsd: "EDUCBASECY",
	          legendOptions: {
	            title: "2020年常住人口"
	          },
	          defaultSymbol: {
	            type: "simple-fill", // autocasts as new SimpleFillSymbol()
	            color: "black",
	            style: "backward-diagonal",
	            outline: {
	              width: 0.5,
	              color: [50, 50, 50, 0.6]
	            }
	          },
	          defaultLabel: "no data",
	          classBreakInfos: [
	            {
	              minValue: 0,
	              maxValue: 100,
	              symbol: less35,
	              label: "< 100万"
	            },
	            {
	              minValue: 100,
	              maxValue: 500,
	              symbol: less50,
	              label: "100 - 500万"
	            },
	            {
	              minValue: 500,
	              maxValue: 1000,
	              symbol: more50,
	              label: "500 - 1000万"
	            },
	            {
	              minValue: 1000,
	              maxValue: 3000,
	              symbol: more75,
	              label: "> 1000万"
	           }
          ]
        };

        const seattleLayer = new $FeatureLayer({
          url: "https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/popn/FeatureServer",
          title: "第七次全国人口普查数据（2020）",
          renderer: renderer,
          popupTemplate: {
            // autocast as esri/PopupTemplate
            title: "{name}",
            content:
              "{name}：{popn}万人 " 
          // show only block groups in Seattle
         }
        });

        const map = new $Map({
          basemap: "gray-vector",
          layers: [seattleLayer]
        });

        const view = new $MapView({
          container: "viewDiv",
          map: map,
          center: [104.44,30.31],
          zoom: 4
        });
	 const legend = new $Legend({
	          view: view
	        });
	
	        view.ui.add(legend, "bottom-left");


//**********************************************三个底图选择**********************************************
	document.getElementById("basemap01").addEventListener("click",function(){
		map.basemap= "gray";
	});
	
	document.getElementById("basemap02").addEventListener("click",function(){
		map.basemap= "hybrid";
	});
	
	document.getElementById("basemap03").addEventListener("click",function(){
		map.basemap= "streets";
	});
//**********************************************功能：显示地图的比例尺，鼠标等坐标点等**********************************************************
      
      //*** 添加DIV用于显示坐标等信息 ***//
      var coordsWidget = document.createElement("div");
      coordsWidget.id = "coordsWidget";
      coordsWidget.className = "esri-widget esri-component";
      coordsWidget.style.padding = "7px 15px 5px";
      view.ui.add(coordsWidget, "bottom-left");

      //***显示经纬度、比例尺大小和尺度***//
      function showCoordinates(pt) {
        var coords = "Lat/Lon " + pt.latitude.toFixed(3) + " " + pt.longitude.toFixed(3) + 
            " | Scale 1:" + Math.round(view.scale * 1) / 1 ;
        coordsWidget.innerHTML = coords;
      }
      
      //*** 添加事件显示中心的坐标（在视图停止移动之后） ***//
      view.watch(["stationary"], function() {
        showCoordinates(view.center);
      });

      //*** 添加显示鼠标的坐标点***//
      view.on(["pointer-down","pointer-move"], function(evt) {
        showCoordinates(view.toMap({ x: evt.x, y: evt.y }));
      });

	document.getElementById("basemap01").addEventListener("click",function(){
		map.basemap= "gray";
	});
	
	document.getElementById("basemap02").addEventListener("click",function(){
		map.basemap= "hybrid";
	});
	
	document.getElementById("basemap03").addEventListener("click",function(){
		map.basemap= "streets";
	});
	
	 });