sap.ui.define([
    "lego/store/legostore/controller/BaseController",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/model/Sorter',
	'sap/m/MessageBox'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Filter,FilterOperator,Sorter,MessageBox) {
        "use strict";

        return Controller.extend("lego.store.legostore.controller.Home", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                this._bDescendingSort = false;
            },
            onListItemPress: function (oEvent) {
                var productPath = oEvent.getSource().getSelectedItem().getBindingContext().getPath(),
                    product = productPath.split("/").slice(-1).pop();
    
                this.oRouter.navTo("detail", { product: product});
            },
            onSearch: function (oEvent) {
                var oTableSearchState = [],
                    sQuery = oEvent.getParameter("query");
    
                if (sQuery && sQuery.length > 0) {
                    oTableSearchState = [new Filter("DESCRIPTION", FilterOperator.Contains, sQuery)];
                }
    
                this.getView().byId("productsTable").getBinding("items").filter(oTableSearchState, "Application");
            },
        
           
        
        });
    })