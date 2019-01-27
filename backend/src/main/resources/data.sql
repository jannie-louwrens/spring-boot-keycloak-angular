INSERT INTO PRODUCT_CATALOG (ID, NAME) VALUES ('a70a0447-9a7d-4b64-9890-b5616c1f309c', 'Bakery');
INSERT INTO PRODUCT_CATALOG (ID, NAME) VALUES ('75c36466-aeb2-445f-b3f0-be8b25f30db3', 'Dairy');
INSERT INTO PRODUCT_CATALOG (ID, NAME) VALUES ('94a0e5bb-373d-4288-8832-768b4b5319cb', 'Butchery');
INSERT INTO PRODUCT_CATALOG (ID, NAME) VALUES ('99edf5d9-7dea-4e94-87a4-43f869aa3c38', 'Fruit & Vegetables');
INSERT INTO PRODUCT_CATALOG (ID, NAME) VALUES ('b678d1e6-488c-45d5-a113-0077b60aa67b', 'Household');

INSERT INTO PRODUCT (ID, NAME, DESCRIPTION, EFFECTIVE_DATE, UNIT_PRICE, PRODUCT_CATALOG_ID) 
VALUES ('0013b1b6-329b-4b12-bfd7-066cea338343', 'Ciabatta Rolls', 'These sandwich rolls are at once incredibly flavorful and exceedingly light.', {ts '2018-12-21'}, 4.25, 'a70a0447-9a7d-4b64-9890-b5616c1f309c');
INSERT INTO PRODUCT (ID, NAME, DESCRIPTION, EFFECTIVE_DATE, UNIT_PRICE, PRODUCT_CATALOG_ID) 
VALUES ('0dac2a17-1af2-4a42-9449-2012d9559bc3', 'Pumpkin Pie', 'A secret blend of traditional spices and combine them with sweet and spicy pumpkin custard.', {ts '2018-12-21'}, 45.99, 'a70a0447-9a7d-4b64-9890-b5616c1f309c');
INSERT INTO PRODUCT (ID, NAME, DESCRIPTION, EFFECTIVE_DATE, UNIT_PRICE, PRODUCT_CATALOG_ID) 
VALUES ('20d25a1b-b804-4aea-8154-3d99b90c30f7', 'Milk', 'Refreshing and delicious, milk is ready for your crunchy cereal and morning coffee.', {ts '2018-12-21'}, 24.50, '75c36466-aeb2-445f-b3f0-be8b25f30db3');
INSERT INTO PRODUCT (ID, NAME, DESCRIPTION, EFFECTIVE_DATE, UNIT_PRICE, PRODUCT_CATALOG_ID) 
VALUES ('21ea1d67-bd16-4d80-acf3-3e7857f1c190', 'Ground Beef', 'Raised without antibiotics and full of flavor, this beef is the base of big, juicy burgers, savory meat loaf and rich Bolognese sauce.', {ts '2018-12-21'}, 100.50, '94a0e5bb-373d-4288-8832-768b4b5319cb');
INSERT INTO PRODUCT (ID, NAME, DESCRIPTION, EFFECTIVE_DATE, UNIT_PRICE, PRODUCT_CATALOG_ID) 
VALUES ('11928edc-31da-4686-8ff8-139c9af8f19a', 'Loin Chops', 'Flown in from the sheep-rich plains of Australia, these flavorful, juicy chops are ready to be barbecue.', {ts '2018-12-21'}, 76.50, '94a0e5bb-373d-4288-8832-768b4b5319cb');
INSERT INTO PRODUCT (ID, NAME, DESCRIPTION, EFFECTIVE_DATE, UNIT_PRICE, PRODUCT_CATALOG_ID) 
VALUES ('579718d9-5426-4dd4-a54b-b40c02b74097', 'Brocolli', 'A hearty and tasty vegetable which is rich in dozens of nutrients.', {ts '2018-12-21'}, 11.25, '99edf5d9-7dea-4e94-87a4-43f869aa3c38');
INSERT INTO PRODUCT (ID, NAME, DESCRIPTION, EFFECTIVE_DATE, UNIT_PRICE, PRODUCT_CATALOG_ID) 
VALUES ('622e1cf8-01f9-460b-9620-cebb1d406137', 'Water melon', 'All the sweetness, crunch, and knockout juiciness of the classic summertime melon.', {ts '2018-12-21'}, 89.90, '99edf5d9-7dea-4e94-87a4-43f869aa3c38');
INSERT INTO PRODUCT (ID, NAME, DESCRIPTION, EFFECTIVE_DATE, UNIT_PRICE, PRODUCT_CATALOG_ID) 
VALUES ('04dd8d6b-eb2a-43ad-86f5-02857e6632d8', 'Potato', 'Starchy with low moisture content, perfect for baked potatoes or french fries.', {ts '2018-12-21'}, 29.99, '99edf5d9-7dea-4e94-87a4-43f869aa3c38');

INSERT INTO ORDER_ITEM (ID, CUSTOMER_ID, PRODUCT, PRODUCT_CATALOG, ORDER_DATE, QUANTITY, UNIT_PRICE) 
VALUES ('22551188-6e15-44c1-9f07-3ad5a549ff77', 'spacehunter', 'Ciabatta Rolls', 'Bakery', {ts '2018-12-21'}, 6, 4.25);
INSERT INTO ORDER_ITEM (ID, CUSTOMER_ID, PRODUCT, PRODUCT_CATALOG, ORDER_DATE, QUANTITY, UNIT_PRICE) 
VALUES ('6a487924-c277-460f-b107-0fd233590981', 'spacehunter', 'Ground Beef', 'Butchery', {ts '2018-12-21'}, 1, 100.50);
INSERT INTO ORDER_ITEM (ID, CUSTOMER_ID, PRODUCT, PRODUCT_CATALOG, ORDER_DATE, QUANTITY, UNIT_PRICE) 
VALUES ('8e3c954e-6118-4bae-b708-e9c8b1e9c0c6', 'mythbuster', 'Loin Chops', 'Butchery', {ts '2018-12-21'}, 2, 76.50);
INSERT INTO ORDER_ITEM (ID, CUSTOMER_ID, PRODUCT, PRODUCT_CATALOG, ORDER_DATE, QUANTITY, UNIT_PRICE) 
VALUES ('146d94bc-0556-4fdf-8bcc-6f61499f87bf', 'grilldad', 'Milk', 'Dairy', {ts '2018-12-21'}, 2, 24.50);
INSERT INTO ORDER_ITEM (ID, CUSTOMER_ID, PRODUCT, PRODUCT_CATALOG, ORDER_DATE, QUANTITY, UNIT_PRICE) 
VALUES ('8444c41c-c12e-490e-a9e1-91fc76610ae3', 'grilldad', 'Ground Beef', 'Butchery', {ts '2018-12-21'}, 1, 100.50);
INSERT INTO ORDER_ITEM (ID, CUSTOMER_ID, PRODUCT, PRODUCT_CATALOG, ORDER_DATE, QUANTITY, UNIT_PRICE) 
VALUES ('55c1aced-1b1b-4bcc-82fe-7812bf29c08a', 'grilldad', 'Potato', 'Fruit & Vegetables', {ts '2018-12-21'}, 1, 29.99);
