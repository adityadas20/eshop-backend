# eshop-backend

Building a simple REST API for an e-commerce marketplace.

Set of REST API endpoints that enable the following functionality:
- [x] Buyers and sellers can register and login to the system
- [x] Sellers can build a catalog of items, with each item having a name and price
- [x] Buyers can GET a list of sellers
- [x] Buyers can GET a specific seller's catalog (list of items)
- [x] Buyers can create an Order that contains a list of items from the seller's catalog
- [x] Sellers can GET a list of all orders they've received


Entities:-

The following are the different entities in the system:
1. Users
   
> Two types: buyers and sellers
>
> A user can sign up as a buyer or as a seller

2. Catalogs
   
> A catalog belongs to a seller
> 
> One seller can have one catalog
>
> A catalog consists of Products

3. Products
> A product has a name and a price

4. Orders
> An order can be created by a buyer to purchase items from a seller's catalog
> 
> An order consists of a list of products


APIs:-

The following are a few examples of the API endpoints:
1. Auth APIs
   
> POST /api/auth/register - Register a user (accept username, password, type of user - buyer/seller)
> 
> POST /api/auth/login - Let a previously registered user login (e.g. retrieve authentication token)


2. APIs for buyers
   
> GET /api/buyer/list-of-sellers - Get a list of all sellers
> 
> GET /api/buyer/seller-catalog/:seller_id - Get the catalog of a seller by seller_id
> 
> POST /api/buyer/create-order/:seller_id - Send a list of items to create an order for the seller with id = seller_id

3. APIs for sellers
> POST /api/seller/create-catalog - Send a list of items to create a catalog for a seller
> 
> GET /api/seller/orders - Retrieve the list of orders received by a seller


Instructions:-
> Users need to npm install the required dependencies
> 
> Users need to provide their own MongoDB cluster connect URL
> 
> Users can then enter npm start to run the application

Future Improvements:-

- [ ] DB Schema optimizations. Separate out the products from the Catalogs and Orders table to a separate Products table.
- [ ] Use JWT tokens to authenticate the different endpoints
