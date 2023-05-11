# Hadasim Exam

## Exercise 1
The program offers a menu with two tower options: rectangular and triangular, the user types height and width and the program performs calculations and print on the selected tower type according to the input.

Install [Python](https://www.python.org/downloads/).

Run the program:
```bash
cd ex1__twitter_tower/
python twitter_tower.py
```

## Exercise 2
### Part A
COVID system management. The system manages personal details and corona data for each person.

Install [Node.js](https://nodejs.dev/en/download/) .

Create mongo database (can use [mongoDB](https://account.mongodb.com/account/login?n=/v2/5fcc1471817dde0f052fa9f7&nextHash=#clusters)).  
  Create `.env` file in `server` directory with the following environment variables:
| Name | Required |Default Value |
|--|--|--|
| PORT | False | 3001 |
| DB_URL| True | - - - |


Example:
```
PORT = 3001
DB_URL = 'mongodb+srv://DB_NAME:PASS@hadasim.xxx.mongodb.net/'
```
Run the program:
```bash
cd ex2__covid_management_system/server/
npm i
npm start
```

### Part B

[Mission 1](https://github.com/feigi434/hadasim/blob/main/ex2__covid_management_system/part%202_1.pdf)  
  [Mission 2](https://github.com/feigi434/hadasim/blob/main/ex2__covid_management_system/%E2%80%8F%E2%80%8Fpart%202_2.pdf)