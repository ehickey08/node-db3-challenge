# Database Queries

### Display the ProductName and CategoryName for all products in the database. Shows 76 records.

SELECT p.productName, c.categoryName 
FROM [Products] as p
INNER JOIN [Categories] as c on p.categoryId = c.categoryId

### Display the OrderID and ShipperName for all orders placed before January 9, 1997. Shows 161 records.

SELECT o.OrderID, s.ShipperName
FROM [Orders] as o
INNER JOIN [Shippers] as s on o.ShipperID = s.ShipperID
WHERE o.OrderDate < '1997-01-09'

### Display all ProductNames and Quantities placed on order 10251. Sort by ProductName. Shows 3 records.

SELECT od.Quantity, p.ProductName 
FROM [OrderDetails] as od
INNER JOIN [Products] as p on od.ProductID = p.ProductID
WHERE od.OrderID = 10251
ORDER BY ProductName

### Display the OrderID, CustomerName and the employee's LastName for every order. All columns should be labeled clearly. Displays 196 records.

SELECT o.OrderId, c.CustomerName as "Customer's Full Name", e.LastName as "Employee's Last Name"
FROM [Orders] as o
INNER JOIN [Customers] as c on o.CustomerId = c.CustomerId
INNER JOIN [Employees] as e on o.EmployeeId = e.EmployeeId

### (Stretch)  Displays CategoryName and a new column called Count that shows how many products are in each category. Shows 9 records.

SELECT c.CategoryName, count(*)
FROM [Categories] as c
JOIN [Products] as p on c.CategoryId = p.CategoryId
GROUP BY c.CategoryName

### (Stretch) Display OrderID and a  column called ItemCount that shows the total number of products placed on the order. Shows 196 records. 

SELECT o.OrderId, count(*) as "ItemCount"
FROM OrderDetails as o
GROUP BY o.OrderId