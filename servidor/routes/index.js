var express = require('express');
var router = express.Router();
var axios = require('axios');

const products = {
  category: [],
  items: []
};

//route to get all the products--------------------------------------------------

router.get('/api/items', function (req, res, next) {
  const query = req.query.search;
  products.items = [];
 let category 

  axios
    .get('https://api.mercadolibre.com/sites/MLA/search?q=' + query + '&limit=4')
    .then(function (result) {

      let data = result.data.results;
      for (let i = 0; i < data.length; i++) {

        let item =
        {
          id: data[i].id,
          title: data[i].title,
          price: {
            currency: data[i].currency_id,
            amount: String(data[i].price).split('.')[0],
            decimals: String(data[i].price).split('.')[1] || '0',
          },
          picture: data[i].thumbnail,
          condition: data[i].condition,
          address: data[i].address.state_name,
          free_shipping: data[i].shipping.free_shipping,
        }
        products.items.push(item)
        
      }
      let dataCategory = result.data
        let category = dataCategory.filters[0].values[0].path_from_root.map((c)=> c.name)
        products.category = category
    
      res.json(products)
    })
});

// route to get the detail of the product by id-------------------

router.get('/api/items/:id', function (req, res, next) {
  const id = req.params.id;
  axios
    .get('https://api.mercadolibre.com/items/' + id)
    .then(resultProduct => {
      let resultData = resultProduct.data;
      axios
        .get('https://api.mercadolibre.com/items/' + id + '/description/')
        .then(resultDescription => {
          let descripcion = resultDescription.data;
        //  console.log(descripcion)
          let category = resultData.category_id;
          axios
            .get('https://api.mercadolibre.com/categories/' + category)
            .then(resultCategory => {
              let categorias = resultCategory.data;

              //el producto

            var  Resultado = {
                item: {
                  id: resultData.id,
                  title: resultData.title,
                  price: {
                    currency: resultData.currency_id,
                    amount: String(resultData.price).split('.')[0],
                    decimals: String(resultData.price).split('.')[1] || '0',
                  },
                  picture: resultData.pictures[0].url,
                  condition: resultData.condition,
                  free_shipping: resultData.shipping.free_shipping,
                  description: descripcion.plain_text
                },
                categories: categorias.path_from_root.map(c=> c.name),
                
              }
              res.json(Resultado)

            })

        })


    })
 
})


module.exports = router;
