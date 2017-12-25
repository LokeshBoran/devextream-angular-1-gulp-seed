(function() {
  "use strict";

  angular.module("biweb").controller("MainController", MainController);

  /** @ngInject */
  function MainController($http, $q, API, $element) {
    var vm = this;
    vm.page = "Main Page";

    activate();

    function activate() {
      debugger;
      var orders = new DevExpress.data.CustomStore({
        load: function(loadOptions) {
          var parameters = {};

          if (loadOptions.sort) {
            parameters.orderby = loadOptions.sort[0].selector;
            if (loadOptions.sort[0].desc) parameters.orderby += " desc";
          }

          parameters.skip = loadOptions.skip || 0;
          parameters.take = loadOptions.take || 12;

          var config = {
            params: parameters
          };
          return $http
            .get(
              "https://js.devexpress.com/Demos/WidgetsGallery/data/orderItems",
              config
            )
            .then(
              function(response) {
                return {
                  data: response.data.items,
                  totalCount: response.data.totalCount
                };
              },
              function(response) {
                return $q.reject("Data Loading Error");
              }
            );
        }
      });

      vm.dataGridOptions = {
        dataSource: {
          store: orders
        },
        remoteOperations: {
          sorting: true,
          paging: true
        },
        paging: {
          pageSize: 12
        },
        pager: {
          showPageSizeSelector: true,
          allowedPageSizes: [8, 12, 20]
        },
        columns: [
          "OrderNumber",
          "OrderDate",
          "StoreCity",
          "StoreState",
          "Employee",
          {
            dataField: "SaleAmount",
            format: "currency"
          }
        ]
      };
    }
    // vm.dataSource = filterData("");
    // vm.isFirstLevel = true;
    // vm.colors = ["#6babac", "#e55253"];

    // vm.chartOptions = {
    //   bindingOptions: {
    //     dataSource: vm.dataSource
    //   },
    //   title: "The Most Populated Countries by Continents",
    //   series: {
    //     type: "bar"
    //   },
    //   legend: {
    //     visible: false
    //   },
    //   valueAxis: {
    //     showZero: false
    //   },
    //   onPointClick: function(e) {
    //     if (vm.isFirstLevel) {
    //       vm.isFirstLevel = false;
    //       removePointerCursor($element);
    //       vm.dataSource = filterData(e.target.originalArgument);
    //     }
    //   },
    //   customizePoint: function() {
    //     var pointSettings = {
    //       color: vm.colors[Number(vm.isFirstLevel)]
    //     };

    //     if (!vm.isFirstLevel) {
    //       pointSettings.hoverStyle = {
    //         hatching: "none"
    //       };
    //     }

    //     return pointSettings;
    //   }
    // };
    // vm.buttonOptions = {
    //   text: "Back",
    //   icon: "chevronleft",
    //   bindingOptions: {
    //     visible: "!isFirstLevel"
    //   },
    //   onClick: function() {
    //     if (!vm.isFirstLevel) {
    //       vm.isFirstLevel = true;
    //       addPointerCursor($element);
    //       vm.dataSource = filterData("");
    //     }
    //   }
    // };

    // addPointerCursor($element);

    vm.chartOptionsSimple = {
      dataSource: [{
        day: "Monday",
        oranges: 3
    }, {
        day: "Tuesday",
        oranges: 2
    }, {
        day: "Wednesday",
        oranges: 3
    }, {
        day: "Thursday",
        oranges: 4
    }, {
        day: "Friday",
        oranges: 6
    }, {
        day: "Saturday",
        oranges: 11
    }, {
        day: "Sunday",
        oranges: 4
    }],
      series: {
          argumentField: "day",
          valueField: "oranges",
          name: "My oranges",
          type: "bar",
          color: '#ffaa66'
      }
  };

    // function filterData(name) {
    //   var data = [
    //     { arg: "Asia", val: 3007613498, parentID: "" },
    //     { arg: "North America", val: 493603615, parentID: "" },
    //     { arg: "Europe", val: 438575293, parentID: "" },
    //     { arg: "Africa", val: 381331438, parentID: "" },
    //     { arg: "South America", val: 331126555, parentID: "" },
    //     { arg: "Nigeria", val: 181562056, parentID: "Africa" },
    //     { arg: "Egypt", val: 88487396, parentID: "Africa" },
    //     { arg: "Congo", val: 77433744, parentID: "Africa" },
    //     { arg: "Morocco", val: 33848242, parentID: "Africa" },
    //     { arg: "China", val: 1380083000, parentID: "Asia" },
    //     { arg: "India", val: 1306687000, parentID: "Asia" },
    //     { arg: "Pakistan", val: 193885498, parentID: "Asia" },
    //     { arg: "Japan", val: 126958000, parentID: "Asia" },
    //     { arg: "Russia", val: 146804372, parentID: "Europe" },
    //     { arg: "Germany", val: 82175684, parentID: "Europe" },
    //     { arg: "Turkey", val: 79463663, parentID: "Europe" },
    //     { arg: "France", val: 66736000, parentID: "Europe" },
    //     { arg: "United Kingdom", val: 63395574, parentID: "Europe" },
    //     { arg: "United States", val: 325310275, parentID: "North America" },
    //     { arg: "Mexico", val: 121005815, parentID: "North America" },
    //     { arg: "Canada", val: 36048521, parentID: "North America" },
    //     { arg: "Cuba", val: 11239004, parentID: "North America" },
    //     { arg: "Brazil", val: 205737996, parentID: "South America" },
    //     { arg: "Colombia", val: 48400388, parentID: "South America" },
    //     { arg: "Venezuela", val: 30761000, parentID: "South America" },
    //     { arg: "Peru", val: 28220764, parentID: "South America" },
    //     { arg: "Chile", val: 18006407, parentID: "South America" }
    //   ];
    //   return data.filter(function(item) {
    //     return item.parentID === name;
    //   });
    // }

    // function addPointerCursor(element) {
    //   element.find("#chart").addClass("pointer-on-bars");
    // }

    // function removePointerCursor(element) {
    //   element.find("#chart").removeClass("pointer-on-bars");
    // }
  }
})();
