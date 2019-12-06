# Food Tracker - Let us stop food wastage
A Web service aimed at reducing food wastage. The web app checks for items in nearby supermarkets(if they are registered with the service) that have a large discount and/or close to expiring, and suggests recpies alongwith images and description using these.

 Used Vue.js for frontend, and Node.js for server machine(backend). Axios library helped in handling requests.
Also created typical supermarket databases in MongoDB for the prototype demonstration.
Spoonacular was used as the Recipe recommendation API.

# The Service
The Front consists of 3 tabs, Recipies, Leftover Foods and Discount Foods. Click "Track Foodstuffs!" to get output/refresh.
The Leftover foods tab shows your purchase history of upto 10 products, as well as the place of purchase. The products are sorted by Expiry date.

![alt text](https://raw.githubusercontent.com/parthnan/FoodTracker/master/leftover.png)


The Discount foods tab displays upto 10 low price foods close to expiry in registered stores, as well as the location.

![alt text](https://raw.githubusercontent.com/parthnan/FoodTracker/master/discount.png)


The Recipies tab showcases 5 of the most relevant recipies that use two of the leftover foods and discount foods

![alt text](https://raw.githubusercontent.com/parthnan/FoodTracker/master/recipies.png)

