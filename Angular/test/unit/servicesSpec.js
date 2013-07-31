'use strict';

/* jasmine specs for services go here */

describe('service', function() {
    var $httpBackend,
    productsData = function() {
        return [{
            "id": 40,
            "product_type": 7,
            "name": "1/2\" Special",
            "vendor": 2,
            "price_tiers": [
            59],
            "options": [
            269,
            197]
        }, {
            "id": 38,
            "product_type": 7,
            "name": "1/2\" Super",
            "vendor": 2,
            "price_tiers": [
            57],
            "options": [
            269,
            197]
        }, {
            "id": 41,
            "product_type": 7,
            "name": "1/2\" w/ StainMaster",
            "vendor": 2,
            "price_tiers": [
            60],
            "options": [
            269,
            197]
        }, {
            "id": 39,
            "product_type": 7,
            "name": "3/8\" 8#",
            "vendor": 2,
            "price_tiers": [
            58],
            "options": [
            269,
            197]
        }];
    },
    productTypesData = function() {
        return [{
            "id": 0,
            "product_type": "Adhesives"
        }, {
            "id": 1,
            "product_type": "Area Rugs"
        }, {
            "id": 2,
            "product_type": "Carpet"
        }, {
            "id": 3,
            "product_type": "Carpet Tile"
        }, {
            "id": 4,
            "product_type": "Cove Base"
        }, {
            "id": 5,
            "product_type": "Grout"
        }, {
            "id": 6,
            "product_type": "Laminate & Trim"
        }, {
            "id": 7,
            "product_type": "Pad"
        }, {
            "id": 8,
            "product_type": "Rubber Trim"
        }, {
            "id": 9,
            "product_type": "Samples"
        }, {
            "id": 10,
            "product_type": "Tile"
        }, {
            "id": 11,
            "product_type": "VCT/LVT"
        }, {
            "id": 12,
            "product_type": "Vinyl"
        }, {
            "id": 13,
            "product_type": "Wood & Trim"
        }]
    },
    optionTypesData = function() {
        return [{
            "id": 0,
            "option_type": "Color"
        }, {
            "id": 1,
            "option_type": "Width"
        }]
    }

    beforeEach(function() {
        module('carpetDirectDataEntry.services');
        this.addMatchers({
            toEqualData: function(expected) {
                return angular.equals(this.actual, expected);
            }
        });

        inject(function($injector) {
            $httpBackend = $injector.get('$httpBackend');
        });
    });

    it("should get a list of products", inject(function(Product) {
        $httpBackend.expectGET(constants.testServerAddress + constants.resources["Product"].endpoint).respond(productsData());
        var products = Product.query();
        expect(products.length).toEqual(0);
        $httpBackend.flush();
        expect(products.length).toEqual(4);
        expect(products[0]).toEqualData(productsData()[0]);
    }));

    it("should get a list of product types", inject(function(ProductType) {
        $httpBackend.expectGET(constants.testServerAddress + constants.resources["ProductType"].endpoint).respond(productTypesData());
        var productTypes = ProductType.query();
        expect(productTypes.length).toEqual(0);
        $httpBackend.flush();
        expect(productTypes.length).toEqual(14);
        expect(productTypes[0]).toEqualData(productTypesData()[0]);
    }));

    it("should get a list of option types", inject(function(OptionType) {
        $httpBackend.expectGET(constants.testServerAddress + constants.resources["OptionType"].endpoint).respond(optionTypesData());
        var optionTypes = OptionType.query();
        expect(optionTypes.length).toEqual(0);
        $httpBackend.flush();
        expect(optionTypes.length).toEqual(2);
        expect(optionTypes[0]).toEqualData(optionTypesData()[0]);
    }));

});