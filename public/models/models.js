define(
    ['underscore', 'backbone'],

    function(_, Backbone){

        var Models = {}; // Global models object, will be inject in other modules

        // Main model pizzas
        // Get [name, price, ingridients, discount]
        Models.PizzasTodo = Backbone.Model.extend({

            defaults: function(){
                // Default model values
                return {
                    count: 1
                }
            },
            initialize: function(){
                // Calculate discount price and set [newPrice]
                if(this.get( 'discount' )){
                    this.set( 'newPrice', this.get('price') * ( 1 - this.get('discount') ) );
                    this.set( 'discount', this.get('discount' ) * 100 );
                }
            }
        });

        // Cart item model
        // Get similar values like PizzasTodo
        Models.CartItem = Backbone.Model.extend({

            defaults: function(){
                // Default model values
                return {
                    price: '0'
                }
            }
        });

        // Model for summary price 
        Models.SummaryPrice = Backbone.Model.extend({

            defaults: function(){
                //default model values
                return {
                    price: '0'
                }
            }
        });        

        // Return models for the module
        return Models;
    }
);
