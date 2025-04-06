sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/model/Sorter',
    "sap/m/TablePersoController"
 ], function (Controller, History,Filter, FilterOperator, Sorter,TablePersoController) {
 "use strict";
 
 return Controller.extend("lego.store.legostore.controller.BaseController", {
    onInit: function() {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        
        if( this.__targetName !== undefined ) 
            oRouter.getRoute(this.__targetName).attachPatternMatched(this._onRouteMatched, this);
 
        // init LocalStorage
        jQuery.sap.require("jquery.sap.storage");
        this.__storage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
 
    },
 
    onSort: function (oEvent) {
        this._bDescendingSort = !this._bDescendingSort;
        var oView = this.getView(),
            oTable = oView.byId("productsTable"),
            oBinding = oTable.getBinding("items"),
            oSorter = new Sorter("DESCRIPTION", this._bDescendingSort);

        oBinding.sort(oSorter);
    },
    getRouter: function() {
        return sap.ui.core.UIComponent.getRouterFor(this);
    },
    
    _onRouteMatched: function(oEvent) {
        var args = oEvent.getParameters().arguments,
            argsValues = [oEvent];
 
        for ( var key in args) {
            if (args.hasOwnProperty(key)) {
                var obj = args[key];
                argsValues.push(obj);
            }
        }
 
        this.onRouteMatched.apply(this, argsValues);
    },
    
    onNavBackNotWorking: function () {
        var oHistory = History.getInstance();
        var sPreviousHash = oHistory.getPreviousHash();
 
        if (sPreviousHash !== undefined) {
            window.history.go(-1);
        } else {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("TargetHome", {}, true);
        }
        
    },	
        
    /**
     * DIALOG MANAGEMENT
     */
    
    openDialog: function (dialogPath) {
        if (!this.__dialog) {
            this.__dialog = sap.ui.xmlfragment(dialogPath, this);
            this.getView().addDependent(this.__dialog);
        }
        return this.__dialog;
    },
    
    closeDialog: function() {
        if (this.__dialog) {
        if( this.__dialog.close ) {
            this.__dialog.close();
        }
            this.__dialog.destroy();
            this.__dialog = null;
        }
        
    },
    
    ////////////////////////////////////////////////////////////
    //  BUSY DIALOG
    ////////////////////////////////////////////////////////////
    
    createBusyDialog: function () {
        if ( !this.__busyDialog ) {
            this.__busyDialog = sap.ui.xmlfragment(this.getView().getId(), "lego.store.legostore.view.dialog.BusyDialog", this);
            this.getView().addDependent(this.__busyDialog);
        }
 
        jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this.__busyDialog);
        this.__busyDialog.open();
    },
    
    destroyBusyDialog: function () {
        if( this.__busyDialog !== undefined ) {
            this.__busyDialog.close();
            this.__busyDialog.destroy();
            this.__busyDialog = undefined;
        }
    },
 })
})