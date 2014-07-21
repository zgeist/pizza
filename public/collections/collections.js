define(
    ['underscore', 'backbone', 'models', 'views', 'app'],

    function(_, Backbone, Models, Views, App){

        var Collections = {};

        // Pizzas collections
        // Use the PizzasTodo model

        Collections.PizzasList = Backbone.Collection.extend({

            model: Models.PizzasTodo,

            url: '/pizzas', // Path to JSON file

            initialize: function(){ 
                var $this = this;
                // Fetch pizzas for Pizzas Collection
                this.fetch({
                    success: function(data){
                        new Views.PizzasView( { collection: $this } ); // Create View for each pizza [PizzasView]
                    }
                });
            }
        });

        // Create collection for cart items
        // Use [CartItem] model
        // When you click on button 'Add to Cart' then on event 'add' to collection
        Collections.CartCollection = Backbone.Collection.extend({

            model: Models.CartItem,

            initialize: function(){
                // Create cart view with this collection
                var cartView = new Views.CartView({
                    collection: this
                });    

                // When this collections change state then recalculate summary price
                this.on('add remove change', function(){ 
                    
                    cartView.render(); // Call render for new one

                    var summary = 0; // inittialize summary cost in cart 

                    this.each(function(model, index){ 
                        // Get for each pizza item it price or new price 
                        summary += (model.get('newPrice') || model.get('price')) * model.get('count');

                    });

                    App.summaryPrice.set('price', summary); // set new value for summaryPrice model
                });
            }
        });

        // return all collections
        return Collections;
    }
);
